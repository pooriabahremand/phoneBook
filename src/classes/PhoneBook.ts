// Import necessary modules from Node.js and other files
import { existsSync, writeFileSync, mkdirSync } from "fs";
import path from "path";
import DriverStorage from "../drivers/DriverStorage";
import Person from "./Person";
import formats from "../utils/formats";

// Define the PhoneBook class
export class PhoneBook {
  private format: string;
  private storageDriver: DriverStorage;

  // Constructor for the PhoneBook class
  constructor(formatArg: string) {
    // Set the format for the phone book
    this.format = formatArg;

    // Ensure the storage directory exists
    if (!existsSync("./storage")) {
      mkdirSync("./storage");
    }

    // Ensure a file exists for each format in the storage directory
    for (const format of formats) {
      const filePath = path.join("storage", `phoneBook.${format}`);
      if (!existsSync(filePath)) {
        writeFileSync(filePath, "");
      }
    }

    // Create a new DriverStorage instance for managing data storage
    this.storageDriver = new DriverStorage(this.format);
  }

  // Method to add a new person to the phone book
  public add(argPerson: Person): void {
    this.storageDriver.add(argPerson);
  }
}
