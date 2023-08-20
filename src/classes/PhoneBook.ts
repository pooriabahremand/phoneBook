// Importing required modules
import { existsSync, writeFileSync, mkdirSync } from "fs";
import Person from "./Person";
import ValidatePerson from "./validatePerson";
import FileConverter from "./FileConverter";

// Defining the PhoneBook class
export class PhoneBook {
  private people: Person[] = [];
  private filePath: string;
  private format: string;
  private registery = [] as Person[];

  // Constructor for the PhoneBook class
  constructor(formatArg: string) {
    this.format = formatArg;
    this.filePath = `./storage/phoneBook.${this.format}`;

    const formats = ["json", "csv", "xml", "xlsx"];

    // Creating the storage directory if it doesn't exist
    if (!existsSync("./storage")) {
      mkdirSync("./storage");
    }

    // Checking if files for each format exist and reading data from them
    for (const format of formats) {
      const filePath = `./storage/phoneBook.${format}`;

      if (existsSync(filePath)) {
        let data: Person[] = [];
        switch (format) {
          case "json":
            data = new FileConverter(filePath).readJson();
            break;
          case "csv":
            data = new FileConverter(filePath).readCsv();
            break;
          case "xml":
            data = new FileConverter(filePath).readXml();
            data.map((contact) => {
              contact.Number = JSON.stringify(contact.Number);
              contact.Number = "0" + contact.Number;
            });
            break;
          case "xlsx":
            data = new FileConverter(filePath).readXlsx();
            break;
        }

        // Adding the read data to the registry
        this.registery = [...this.registery, ...data];
      } else {
        // Creating an empty file if it doesn't exist
        writeFileSync(filePath, "");
      }
    }

    // Reading data from the file in the specified format
    if (this.registery.length > 1) {
      switch (this.format) {
        case "json":
          this.people = new FileConverter(
            "./storage/phoneBook.json"
          ).readJson();
          break;
        case "csv":
          this.people = new FileConverter("./storage/phoneBook.csv").readCsv();
          break;
        case "xml":
          this.people = new FileConverter("./storage/phoneBook.xml").readXml();
          break;
        case "xlsx":
          this.people = new FileConverter(
            "./storage/phoneBook.xlsx"
          ).readXlsx();
          break;
        default:
          break;
      }
    }
  }

  // Method to add a person to the phone book
  public add(argPerson: Person): void {
    // Validating the person before adding them to the phone book
    new ValidatePerson(this.registery, argPerson).validation();

    // Adding the person to the phone book in the specified format
    switch (this.format) {
      case "json":
        this.people.push(argPerson);
        writeFileSync(this.filePath, JSON.stringify(this.people));
        this.registery.push(argPerson);
        break;
      case "csv":
        this.people.push(argPerson);
        new FileConverter(this.filePath).writeCsv(this.people);
        this.registery.push(argPerson);
        break;
      case "xml":
        this.people.push(argPerson);
        new FileConverter(this.filePath).writeXml(this.people);
        this.registery.push(argPerson);
        break;
      default:
        this.people.push(argPerson);
        new FileConverter(this.filePath).writeXlsx(this.people);
        this.registery.push(argPerson);
        break;
    }
  }
}
