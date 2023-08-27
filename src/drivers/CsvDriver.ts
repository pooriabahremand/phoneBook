// Importing the writeFileSync and readFileSync functions from the "fs" module
import { writeFileSync, readFileSync } from "fs";
// Importing the Person class from the "./../classes/Person" module
import Person from "./../classes/Person";
// Importing the papa module
import papa from "papaparse";
// Importing the ValidatePerson class from the "../classes/validation/validatePerson" module
import ValidatePerson from "../classes/validation/validatePerson";
// Importing the ReadRegistery class from the "../classes/ReadRegistery" module
import ReadRegistery from "../classes/ReadRegistery";

// Defining an interface for the type of data returned by papa.parse
interface PapaType {
  data: Person[];
}

// Exporting the CsvDriver class as the default export
export default class CsvDriver {
  // Declaring private properties people, filePath, and registery
  private people: Person[];
  private filePath: string = "./storage/phonebook.csv";
  private registery: Person[];

  // Constructor for the CsvDriver class
  constructor() {
    // Assigning the value of new ReadRegistery().registery to this.registery
    this.registery = new ReadRegistery().registery;
    // Reading the contents of this.filePath and assigning it to the content variable
    const content = readFileSync(this.filePath, "utf-8");
    // Checking if content has a truthy value
    if (content) {
      // If content has a truthy value, parsing it using papa.parse with header set to true and assigning the result to result
      const result: PapaType = papa.parse(content, { header: true });
      // Assigning result.data to this.people
      this.people = result.data;
    } else {
      // If content does not have a truthy value, assigning an empty array to this.people
      this.people = [];
    }
  }

  // Public method validatePerson that takes a Person object as argument and returns void
  public validatePerson(argPerson: Person): void {
    // Creating a new instance of ValidatePerson with this.registery and argPerson as arguments and calling its validation method
    new ValidatePerson(this.registery, argPerson).validation();
  }

  // Public method add that takes a Person object as argument and returns void
  public add(argPerson: Person): void {
    // Pushing argPerson to this.people
    this.people.push(argPerson);
    // Unparsing this.people using papa.unparse and assigning the result to content
    const content = papa.unparse(this.people);
    // Writing content to this.filePath using writeFileSync
    writeFileSync(this.filePath, content);
    // Pushing argPerson to this.registery
    this.registery.push(argPerson);
    // Writing this.registery as a JSON string to "./storage/registery.json" using writeFileSync
    writeFileSync("./storage/registery.json", JSON.stringify(this.registery));
  }
}
