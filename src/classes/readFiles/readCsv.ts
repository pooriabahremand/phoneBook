// Import necessary modules and classes
import path from "path";
import { readFileSync } from "fs";
import Person from "../Person";
import papa from "papaparse";

// Define an interface for the result of parsing CSV data
interface PapaType {
  data: Person[];
}

// Define the ReadCsv class
export default class ReadCsv {
  private filePath: string;

  // Constructor for the ReadCsv class
  constructor() {
    // Set the file path for the CSV file
    this.filePath = path.join("storage", "phoneBook.csv");
  }

  // Method to read people data from a CSV file and return it as an array of Person objects
  public readPeople(): Person[] {
    // Read the contents of the CSV file
    const content = readFileSync(this.filePath, "utf-8");

    // If the file was read successfully, parse the contents as CSV and return it
    if (content) {
      // Parse the CSV data with headers
      const result: PapaType = papa.parse(content, { header: true });

      // Return the parsed data as an array of Person objects
      return result.data;
    } else {
      // If the file could not be read, return an empty array
      return [];
    }
  }
}
