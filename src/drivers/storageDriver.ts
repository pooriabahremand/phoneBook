// Import necessary modules and classes
import JsonDriver from "./JsonDriver";
import CsvDriver from "./CsvDriver";
import XmlDriver from "./XmlDriver";
import XlsxDriver from "./XlsxDriver";
import type Person from "../classes/Person";
import SqliteDriver from "./SqliteDriver";
import MongoDriver from "./MongoDriver";
import { MongoClient } from "mongodb";

// Define the DriverInterface
export interface DriverInterface {
  people: Person[];
  filePath: string;
  read: () => Promise<Person[]>;
  add: (argPerson: Person) => Promise<void>;
  import: (argPeople: Person[]) => Promise<void>;
}

export interface AsyncDriverInterface {
  people: Person[];
  filePath: string;
  connect: () => Promise<void>;
  read: () => Promise<Person[]>;
  add: (argPerson: Person) => Promise<void>;
  import: (argPeople: Person[]) => Promise<void>;
}

export type ValidTypes = "json" | "csv" | "xml" | "xlsx" | "sqlite" | "mongodb";
export type Driver = DriverInterface | AsyncDriverInterface;

// Define the DriverStorage class
export default class DriverStorage {
  private readonly format: ValidTypes;
  public driver: DriverInterface | AsyncDriverInterface;

  // Constructor for the DriverStorage class
  constructor(argFormat: ValidTypes) {
    this.format = argFormat;

    const drivers: Record<ValidTypes, new () => Driver> = {
      json: JsonDriver,
      csv: CsvDriver,
      xml: XmlDriver,
      xlsx: XlsxDriver,
      sqlite: SqliteDriver,
      mongodb: MongoDriver,
    };

    this.driver = new drivers[this.format]();
  }
}
