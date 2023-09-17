// Importing required modules
import { writeFileSync } from "fs";
import path from "path";
import Person from "./../classes/Person";
import { XMLBuilder } from "fast-xml-parser";
import { DriverInterface } from "./DriverStorage";

// Exporting the XmlDriver class as the default export
export default class XmlDriver implements DriverInterface {
  // Declaring private properties people, filePath, and registery
  public people: Person[];
  public filePath: string;

  // Constructor for the XmlDriver class
  constructor(argPeople: Person[]) {
    this.filePath = path.join("storage", "phoneBook.xml");
    this.people = argPeople;
  }

  // Public method add that takes a Person object as argument and returns void
  public add(argPerson: Person) {
    // Pushing argPerson to this.people
    this.people.push(argPerson);
    // Creating a new instance of XMLBuilder with oneListGroup set to true and assigning it to builder
    const builder = new XMLBuilder({ oneListGroup: true });
    // Building an XML string from this.people using builder.build and assigning it to result
    const result = builder.build(this.people);
    // Writing result to this.filePath using writeFileSync
    writeFileSync(this.filePath, result);
  }

  public convert(argPeople: Person[]): void {
    // Creating a new instance of XMLBuilder with oneListGroup set to true and assigning it to builder
    const builder = new XMLBuilder({ oneListGroup: true });
    // Building an XML string from this.people using builder.build and assigning it to result
    const result = builder.build(argPeople);
    // Writing result to this.filePath using writeFileSync
    writeFileSync(this.filePath, result);
  }
}
