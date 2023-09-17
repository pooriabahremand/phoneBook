// Importing the writeFileSync and readFileSync functions from the "fs" module
import { writeFileSync } from "fs";
import path from "path";
// Importing the Person class from the "./../classes/Person" module
import Person from "./../classes/Person";
// Importing the papa module
import papa from "papaparse";

import { DriverInterface } from "./DriverStorage";

// Exporting the CsvDriver class as the default export
export default class CsvDriver implements DriverInterface {
  // Declaring private properties people, filePath
  public people: Person[];
  public filePath: string;

  // Constructor for the CsvDriver class
  constructor(argPeople: Person[]) {
    this.filePath = path.join("storage", "phoneBook.csv");

    this.people = argPeople;
  }

  // Public method add that takes a Person object as argument and returns void
  public add(argPerson: Person): void {
    // Pushing argPerson to this.people
    this.people.push(argPerson);
    // Unparsing this.people using papa.unparse and assigning the result to content
    const content = papa.unparse(this.people);
    // Writing content to this.filePath using writeFileSync
    writeFileSync(this.filePath, content);
  }

  public convert(argPeople: Person[]): void {
    // Unparsing this.people using papa.unparse and assigning the result to content
    const content = papa.unparse(argPeople);
    // Writing content to this.filePath using writeFileSync
    writeFileSync(this.filePath, content);
  }
}
