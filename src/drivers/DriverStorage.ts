// Import necessary modules and classes
import JsonDriver from "./JsonDriver";
import CsvDriver from "./CsvDriver";
import XmlDriver from "./XmlDriver";
import XlsxDriver from "./XlsxDriver";
import Person from "../classes/Person";
import ReadCsv from "../classes/readFiles/readCsv";
import ValidatePerson from "../classes/validation/validatePerson";
import ReadJson from "../classes/readFiles/readJson";
import ReadXml from "../classes/readFiles/readXml";
import ReadXlsx from "../classes/readFiles/readXlsx";

// Define the DriverInterface
export interface DriverInterface {
  people: Person[];
  filePath: string;
  add(argPerson: Person): void;
  convert(argPeople: Person[]): void;
}

// Define the DriverStorage class
export default class DriverStorage {
  private format: string | string[];
  public driver: DriverInterface;
  public people: Person[];

  // Constructor for the DriverStorage class
  constructor(argFormat: string | string[]) {
    this.format = argFormat;

    // If format is an array, create an empty people array and a driver based on the second format
    if (typeof this.format !== "string") {
      this.people = [];
      switch (this.format[1]) {
        case "json":
          this.driver = new JsonDriver(this.people);
          break;
        case "csv":
          this.driver = new CsvDriver(this.people);
          break;
        case "xml":
          this.driver = new XmlDriver(this.people);
          break;
        default:
          this.driver = new XlsxDriver(this.people);
          break;
      }
    } else {
      // If format is a string, read people data from a file of that format and create a driver based on the format
      switch (this.format) {
        case "json":
          this.people = new ReadJson().readPeople();
          this.driver = new JsonDriver(this.people);
          break;
        case "csv":
          this.people = new ReadCsv().readPeople();
          this.driver = new CsvDriver(this.people);
          break;
        case "xml":
          this.people = new ReadXml().readPeople();
          this.driver = new XmlDriver(this.people);
          break;
        default:
          this.people = new ReadXlsx().readPeople();
          this.driver = new XlsxDriver(this.people);
          break;
      }
    }
  }

  // Method to add a person to the people data and update the file
  public add(argPerson: Person) {
    // Validate the person data before adding it
    new ValidatePerson(this.people, argPerson).validation();

    // Add the person to the people data and update the file
    this.driver.add(argPerson);
  }

  // Method to convert an array of Person objects to the appropriate format and write it to the file
  public convert(argPeople: Person[]) {
    // Convert the people data and update the file
    this.driver.convert(argPeople);
  }
}
