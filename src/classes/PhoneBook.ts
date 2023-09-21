// Import necessary modules from Node.js and other files
import DriverStorage from "../drivers/DriverStorage";
import Person from "./Person";

// Define the PhoneBook class
export class PhoneBook {
  private storageDriver: DriverStorage;

  // Constructor for the PhoneBook class
  constructor(argStorageDriver: DriverStorage) {
    // Create a new DriverStorage instance for managing data storage
    this.storageDriver = argStorageDriver;
  }

  // Method to add a new person to the phone book
  public add(argPerson: Person): void {
    this.storageDriver.driver.add(argPerson);
  }
}
