// Importing required modules
import { writeFileSync, readFileSync } from "fs";
import Person from "./../classes/Person";
import ValidatePerson from "../classes/validation/validatePerson";
import ReadRegistery from "../classes/ReadRegistery";

// Exporting the JsonDriver class as the default export
export default class JsonDriver {
  // Declaring private properties people, filePath, and registery
  private people: Person[];
  private filePath: string = "./storage/phonebook.json";
  private registery: Person[];

  // Constructor for the JsonDriver class
  constructor() {
    // Initializing this.registery with the value of new ReadRegistery().registery
    this.registery = new ReadRegistery().registery;
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

  // Public method validatePerson that takes a Person object as argument and returns void
  public validatePerson(argPerson: Person) {
    // Creating a new instance of ValidatePerson with this.registery and argPerson as arguments and calling its validation method
    new ValidatePerson(this.registery, argPerson).validation();
  }

  // Public method add that takes a Person object as argument and returns void
  public add(argPerson: Person) {
    // Pushing argPerson to this.people
    this.people.push(argPerson);
    // Writing this.people as a JSON string to this.filePath using writeFileSync
    writeFileSync(this.filePath, JSON.stringify(this.people));
    // Pushing argPerson to this.registery
    this.registery.push(argPerson);
    // Writing this.registery as a JSON string to "./storage/registery.json" using writeFileSync
    writeFileSync("./storage/registery.json", JSON.stringify(this.registery));
  }
}
