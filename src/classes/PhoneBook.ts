// Importing required modules from the "fs" library
import { existsSync, writeFileSync, mkdirSync } from "fs";
import path from "path";
// Importing the DriverStorage class from the "../drivers/DriverStorage" module
import DriverStorage from "../drivers/DriverStorage";
// Importing the Person class from the "./Person" module
import Person from "./Person";
// Importing the formats object from the "../utils/formats" module
import formats from "../utils/formats";

// Exporting the PhoneBook class
export class PhoneBook {
  private format: string;
  private storageDriver: DriverStorage;

  // Constructor for the PhoneBook class
  constructor(formatArg: string) {
    this.format = formatArg;
    // Checking if the "./storage" directory exists, if not, creating it
    if (!existsSync("./storage")) {
      mkdirSync("./storage");
    }

    // Looping through the formats array
    for (const format of formats) {
      // Creating a file path for each format in the storage directory
      const filePath = path.join("storage", `phoneBook.${format}`);
      // Checking if the file exists, if not, creating it with an empty string as content
      if (!existsSync(filePath)) {
        writeFileSync(filePath, "");
      }
    }

    // Creating a new instance of DriverStorage with this.format as argument and assigning it to this.driverStorage
    this.storageDriver = new DriverStorage(this.format);
  }

  // Public method add that takes a Person object as argument and returns void
  public add(argPerson: Person): void {
    this.storageDriver.add(argPerson);
  }
}
