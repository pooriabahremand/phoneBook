// import { MongoClient } from 'mongodb'
import { exec, spawn } from 'child_process'
import { type DriverInterface } from './storageDriver'
import type Person from '../classes/Person'
import { MongoClient, type Db } from 'mongodb'

export default class MongoDriver implements DriverInterface {
  public people: Person[] = []
  public readonly filePath: string = 'mongodb://localhost:27017'
  constructor () {
    const mongodProcess = spawn('mongod')
    exec('mongod', (error, stdout) => {
      if ((error as Error) !== null) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.error(`exec error: ${error}`)
      }
      console.log('the server has been created')
    })

    setTimeout(() => {
      mongodProcess.kill()
      console.log('the server has been terminated')
    }, 8000)
  }

  public read (): Person[] {
    this.people = [{ fullName: 'ali', Number: '0912', format: 'json' }]
    void MongoClient.connect(this.filePath, function (error: Error, db: Db): void {
      if (error instanceof Error) {
        console.error(error)
      }
    })
    return [{ fullName: 'ali', Number: '0912', format: 'json' }]
  }

  public add (argPerson: Person): void {

  }

  public import (argPeople: Person[]): void {

  }
}
