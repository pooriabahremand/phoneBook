// Importing required modules
import { existsSync, writeFileSync, mkdirSync } from "fs";
import DriverStorage from "../drivers/DriverStorage";
import Person from "./Person";
import ValidatePerson from "./validation/validatePerson";
import formats from "../utils/formats";

// Defining the PhoneBook class
export class PhoneBook {
  private people: Person[] = [];
  private filePath: string;
  private format: string;
  private registery = [] as Person[];
  private driverStorage: DriverStorage;

  // Constructor for the PhoneBook class
  constructor(formatArg: string) {
    this.format = formatArg;
    this.filePath = `./storage/phoneBook.${this.format}`;

    // Creating the `storage directory if it doesn't `exist
    if (!existsSync("./storage")) {
      mkdirSync("./storage");
    }

    // Checking if files `for each format exist and r`eading data from them
    for (const format of formats) {
      const filePath = `./storage/phoneBook.${format}`;
      if (!existsSync(filePath)) {
        writeFileSync(filePath, "");
      }
    }

    this.driverStorage = new DriverStorage(this.format, this.registery);
  }

  // Method to add a person to the phone book
  public add(argPerson: Person): void {
    // Validating the person before adding them to the phone book
    new ValidatePerson(this.registery, argPerson).validation();
    this.driverStorage.driver.validatePerson(argPerson);
    this.driverStorage.driver.add(argPerson);
  }
}
