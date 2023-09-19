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
  constructor(formatArg: string, argStorageDriver: DriverStorage) {
    // Set the format for the phone book
    this.format = formatArg;

    // Ensure the storage directory exists
    if (!existsSync("./storage")) {
      mkdirSync("./storage");
    }

    // Ensure a file exists for each format in the storage directory

    const filePath = path.join("storage", `phoneBook.${this.format}`);
    if (!existsSync(filePath)) {
      writeFileSync(filePath, "");
    }

    // Create a new DriverStorage instance for managing data storage
    this.storageDriver = argStorageDriver;
  }

  // Method to add a new person to the phone book
  public add(argPerson: Person): void {
    this.storageDriver.driver.add(argPerson);
  }
}
