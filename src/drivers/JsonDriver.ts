// Import necessary modules from Node.js and other files
import { writeFileSync } from "fs";
import path from "path";
import Person from "./../classes/Person";
import { DriverInterface } from "./DriverStorage";

// Define the JsonDriver class that implements the DriverInterface
export default class JsonDriver implements DriverInterface {
  // Declare properties for storing people data and file path
  public people: Person[];
  public filePath: string;

  // Constructor for the JsonDriver class
  constructor(argPeople: Person[]) {
    // Set the file path for the JSON file
    this.filePath = path.join("storage", "phoneBook.json");

    // Initialize the people property with the provided data
    this.people = argPeople;
  }

  // Method to add a new person to the people data and update the JSON file
  public add(argPerson: Person) {
    // Add the new person to the people data
    this.people.push(argPerson);

    // Convert the updated people data to JSON format and write it to the file
    writeFileSync(this.filePath, JSON.stringify(this.people));
  }

  // Method to convert an array of Person objects to JSON format and write it to the file
  public convert(argPeople: Person[]) {
    // Convert the provided people data to JSON format and write it to the file
    writeFileSync(this.filePath, JSON.stringify(argPeople));
  }
}
