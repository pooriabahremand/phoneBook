// Importing required modules
import { writeFileSync, readFileSync } from "fs";
import Person from "./../classes/Person";
import ValidatePerson from "../classes/validation/validatePerson";
import { DriverInterface } from "./DriverStorage";

// Exporting the JsonDriver class as the default export
export default class JsonDriver implements DriverInterface {
  // Declaring private properties people, filePath, and registery
  private people: Person[];
  private filePath: string = "./storage/phonebook.json";

  // Constructor for the JsonDriver class
  constructor() {
    // Reading the contents of this.filePath and assigning it to the content variable
    const content = readFileSync(this.filePath, "utf-8");
    // Checking if content has a truthy value
    if (content) {
      // If content has a truthy value, parsing it as JSON and assigning it to this.people
      this.people = JSON.parse(content);
    } else {
      // If content does not have a truthy value, assigning an empty array to this.people
      this.people = [];
    }
  }

  // Public method add that takes a Person object as argument and returns void
  public add(argPerson: Person) {
    // Creating a new instance of ValidatePerson with this.registery and argPerson as arguments and calling its validation method
    new ValidatePerson(this.people, argPerson).validation();
    // Pushing argPerson to this.people
    this.people.push(argPerson);
    // Writing this.people as a JSON string to this.filePath using writeFileSync
    writeFileSync(this.filePath, JSON.stringify(this.people));
  }
}
