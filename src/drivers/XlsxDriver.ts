/* eslint-disable import/no-duplicates */
// Import necessary modules and classes
import type Person from './../classes/Person'
import path from 'path'
import XLSX from 'xlsx'
import reader from 'xlsx'
import { type DriverInterface } from './storageDriver'

// Define the XlsxDriver class that implements the DriverInterface
export default class XlsxDriver implements DriverInterface {
  // Declare properties for storing people data and file path
  public people: Person[] = []
  public filePath: string
  private content: XLSX.WorkBook = XLSX.utils.book_new()
  private isChange: boolean = false

  // Constructor for the XlsxDriver class
  constructor () {
    // Set the file path for the XLSX file
    this.filePath = path.join('storage', 'phoneBook.xlsx')

    // make a setinterval for adding contacts to the storage each 8 seconds
    setInterval(() => {
      if (this.isChange) {
        // Write the updated workbook to the file
        XLSX.writeFile(this.content, this.filePath)
        // changing the value of ischange to the false
        this.isChange = false
      }
    }, 8000)
  }

  // Method to read people data from an XLSX file and return it as an array of Person objects
  public read (): Person[] {
    // Initialize an empty array to store the people data
    const data: Person[] = []

    // Read the contents of the XLSX file
    const file = reader.readFile(this.filePath)

    // If the file was read successfully
    // Get the names of the sheets in the file
    const sheets = file.SheetNames

    // For each sheet in the file
    for (let i = 0; i < sheets.length; i++) {
      // Convert the sheet to JSON format
      const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]]
      )

      // For each item in the converted data, add it as a Person object to the data array
      temp.forEach((res) => {
        data.push(res as Person)
      })
    }
    this.people = data
    // Return the array of Person objects
    return data
  }

  // Method to add a new person to the people data and update the XLSX file
  public add (argPerson: Person): void {
    // Add the new person to the people data
    this.people.push(argPerson)

    // Create a new workbook
    const workbook = XLSX.utils.book_new()

    // Convert the updated people data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(this.people)

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    // assigning the value of workbook to the this.content variable
    this.content = workbook

    // changing the value of ischange to true
    this.isChange = true
  }

  // Method to convert an array of Person objects to XLSX format and write it to the file
  public import (argPeople: Person[]): void {
    // Create a new workbook
    const workbook = XLSX.utils.book_new()

    // Convert the provided people data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(argPeople)

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    // Write the converted workbook to the file
    XLSX.writeFile(workbook, this.filePath)
  }
}
