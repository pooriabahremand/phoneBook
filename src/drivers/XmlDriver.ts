// Importing required modules
import { writeFileSync, readFileSync } from "fs";
import Person from "./../classes/Person";
import { XMLParser, X2jOptions, XMLBuilder } from "fast-xml-parser";
import ValidatePerson from "../classes/validation/validatePerson";
import { DriverInterface } from "./DriverStorage";

// Exporting the XmlDriver class as the default export
export default class XmlDriver implements DriverInterface {
  // Declaring private properties people, filePath, and registery
  public people: Person[];
  public filePath: string = "./storage/phonebook.xml";

  // Constructor for the XmlDriver class
  constructor() {
    // Defining options for the XMLParser
    const options = {
      ignoreNameSpace: true,
      ignoreRootElement: true,
    } as X2jOptions;
    // Creating a new instance of XMLParser with options as argument and assigning it to parser
    const parser = new XMLParser(options);
    // Reading the contents of this.filePath and assigning it to content
    const content = readFileSync(this.filePath);
    // Checking if content has a length greater than 0
    if (content.length > 0) {
      // If content has a length greater than 0, parsing it using parser.parse and assigning the result to jsonObj
      const jsonObj = parser.parse(content);
      // Getting the values of jsonObj as an array of Person objects and assigning it to contacts
      const contacts: Person[] = Object.values(jsonObj);
      // Assigning contacts to this.people
      this.people = contacts;
    } else {
      // If content does not have a length greater than 0, assigning an empty array to this.people
      this.people = [];
    }
  }

  // Public method add that takes a Person object as argument and returns void
  public add(argPerson: Person | Person[]) {
    if (argPerson instanceof Person) {
      // Creating a new instance of ValidatePerson with this.people and argPerson as arguments and calling its validation method
      new ValidatePerson(this.people, argPerson).validation();
      // Pushing argPerson to this.people
      this.people.push(argPerson);
      // Creating a new instance of XMLBuilder with oneListGroup set to true and assigning it to builder
      const builder = new XMLBuilder({ oneListGroup: true });
      // Building an XML string from this.people using builder.build and assigning it to result
      const result = builder.build(this.people);
      // Writing result to this.filePath using writeFileSync
      writeFileSync(this.filePath, result);
    } else {
      const builder = new XMLBuilder({ oneListGroup: true });
      const result = builder.build(argPerson);
      writeFileSync(this.filePath, result);
    }
  }
}
