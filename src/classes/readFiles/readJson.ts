// Import necessary modules from Node.js and other files
import path from "path";
import { readFileSync } from "fs";
import Person from "../Person";

// Define the ReadJson class
export default class ReadJson {
  public filePath: string;

  // Constructor for the ReadJson class
  constructor() {
    // Set the file path for the JSON file
    this.filePath = path.join("storage", "phoneBook.json");
  }

  // Method to read people data from a JSON file and return it as an array of Person objects
  public readPeople(): Person[] {
    // Read the contents of the JSON file
    const content = readFileSync(this.filePath, "utf-8");

    // If the file was read successfully, parse the contents as JSON and return it
    if (content) {
      return JSON.parse(content);
    } else {
      // If the file could not be read, return an empty array
      return [];
    }
  }
}
