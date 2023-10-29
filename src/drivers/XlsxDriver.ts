import type Person from './../classes/Person'
import path from 'path'
import XLSX from 'xlsx'
import reader from 'xlsx'
import { type DriverInterface } from './storageDriver'
import fs from 'fs/promises'

export default class XlsxDriver implements DriverInterface {
  public people: Person[] = []
  public filePath: string
  private content: XLSX.WorkBook = XLSX.utils.book_new()
  private isChange: boolean = false

  constructor () {
    this.filePath = path.join('storage', 'phoneBook.xlsx')

    setInterval(() => {
      if (this.isChange) {
        const buffer = XLSX.write(this.content, { type: 'buffer' })
        fs.writeFile(this.filePath, buffer).then(() => {
          this.isChange = false
        })
      }
    }, 8000)
  }

  public read (): Promise<Person[]> {
    return fs.readFile(this.filePath).then((fileBuffer) => {
      const data: Person[] = []
      const file = reader.read(fileBuffer, { type: 'buffer' })
      const sheets = file.SheetNames

      for (let i = 0; i < sheets.length; i++) {
        const temp = reader.utils.sheet_to_json(
          file.Sheets[file.SheetNames[i]]
        )

        temp.forEach((res) => {
          data.push(res as Person)
        })
      }
      this.people = data
      return data
    })
  }

  public add (argPerson: Person): Promise<void> {
    return new Promise((resolve) => {
      this.people.push(argPerson)
      const workbook = XLSX.utils.book_new()
      const worksheet = XLSX.utils.json_to_sheet(this.people)
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
      this.content = workbook
      this.isChange = true
      resolve()
    })
  }

  public import (argPeople: Person[]): Promise<void> {
    return new Promise((resolve) => {
      const workbook = XLSX.utils.book_new()
      const worksheet = XLSX.utils.json_to_sheet(argPeople)
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
      const buffer = XLSX.write(workbook, { type: 'buffer' })
      fs.writeFile(this.filePath, buffer).then(() => {
        resolve()
      })
    })
  }
}
