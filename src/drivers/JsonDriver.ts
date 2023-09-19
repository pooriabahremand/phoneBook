// Import necessary modules from Node.js and other files
import { writeFileSync, readFileSync } from "fs";
import path from "path";
import Person from "./../classes/Person";
import { DriverInterface } from "./DriverStorage";

// Define the JsonDriver class that implements the DriverInterface
export default class JsonDriver implements DriverInterface {
  // Declare properties for storing people data and file path
  public people: Person[];
  public filePath: string;

  // Constructor for the JsonDriver class
  constructor() {
    // Set the file path for the JSON file
    this.filePath = path.join("storage", "phoneBook.json");

    // Initialize the people property with the provided data
    this.people = [];
  }
  // Method to read people data from a JSON file and return it as an array of Person objects
  public read(): Person[] {
    // Read the contents of the JSON file
    const content = readFileSync(this.filePath, "utf-8");

    // If the file was read successfully, parse the contents as JSON and return it
    if (content) {
      this.people = JSON.parse(content);
      return JSON.parse(content);
    } else {
      // If the file could not be read, return an empty array
      return [];
    }
  }

  // Method to add a new person to the people data and update the JSON file
  public add(argPerson: Person) {
    // Add the new person to the people data
    this.people.push(argPerson);

    // Convert the updated people data to JSON format and write it to the file
    writeFileSync(this.filePath, JSON.stringify(this.people));
  }

  // Method to convert an array of Person objects to JSON format and write it to the file
  public import(argPeople: Person[]) {
    // Convert the provided people data to JSON format and write it to the file
    writeFileSync(this.filePath, JSON.stringify(argPeople));
  }
}
