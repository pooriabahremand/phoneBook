// Importing required modules
import { writeFileSync } from "fs";
import path from "path";
import Person from "./../classes/Person";
import { DriverInterface } from "./DriverStorage";

// Exporting the JsonDriver class as the default export
export default class JsonDriver implements DriverInterface {
  // Declaring private properties people, filePath, and registery
  public people: Person[];
  public filePath: string;

  // Constructor for the JsonDriver class
  constructor(argPeople: Person[]) {
    this.filePath = path.join("storage", "phoneBook.json");
    this.people = argPeople;
  }

  // Public method add that takes a Person object as argument and returns void
  public add(argPerson: Person) {
    // Pushing argPerson to this.people

    this.people.push(argPerson);
    writeFileSync(this.filePath, JSON.stringify(this.people));
  }

  public convert(argPeople: Person[]) {
    writeFileSync(this.filePath, JSON.stringify(argPeople));
  }
}
