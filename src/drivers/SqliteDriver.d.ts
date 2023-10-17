import type Person from '../classes/Person'
import { type DriverInterface } from './storageDriver'

declare class SqliteDriver implements DriverInterface {
  public people: Person[]
  public filePath: string
  public db: any

  constructor ()

  public read (): Person[]

  public add (argPerson: Person): void

  public import (argPeople: Person[]): void
}

export default SqliteDriver
