// Import necessary modules from Node.js and other files
import { writeFileSync } from "fs";
import { promises as fs } from "fs";
import path from "path";
import type Person from "./../classes/Person";
import papa from "papaparse";
import { type DriverInterface } from "./storageDriver";

// Define an interface for the result of parsing CSV data
interface PapaType {
  data: Person[];
}

// Define the CsvDriver class that implements the DriverInterface
export default class CsvDriver implements DriverInterface {
  // Declare properties for storing people data and file path
  public people: Person[] = [];
  public filePath: string;
  private isChange: boolean = false;
  private content: string = "";

  // Constructor for the CsvDriver class
  constructor() {
    // Set the file path for the CSV file
    this.filePath = path.join("storage", "phoneBook.csv");

    // make a setinterval for adding contacts to the storage each 8 seconds
    setInterval(() => {
      if (this.isChange) {
        // Write the updated CSV data to the file
        writeFileSync(this.filePath, this.content);
        // changing the value of ischange to the false
        this.isChange = false;
      }
    }, 8000);
  }

  // Method to read people data from a CSV file and return it as an array of Person objects
  public read(): Promise<Person[]> {
    // Read the contents of the CSV file
    return fs.readFile(this.filePath, "utf-8").then((content) => {
      // If the file was read successfully, parse the contents as CSV and return it
      if (content !== "") {
        // Parse the CSV data with headers
        const result: PapaType = papa.parse(content, { header: true });

        // Return the parsed data as an array of Person objects
        this.people = result.data;
        return result.data;
      } else {
        // If the file could not be read, return an empty array
        return [];
      }
    });
  }

  // Method to add a new person to the people data and update the CSV file
  public add(argPerson: Person): Promise<void> {
    return new Promise((resolve) => {
      // Add the new person to the people data
      this.people.push(argPerson);

      // Convert the updated people data to CSV format
      this.content = papa.unparse(this.people);

      // changing the value of ischange to true
      this.isChange = true;
      resolve;
    });
  }

  // Method to convert an array of Person objects to CSV format and write it to the file
  public import(argPeople: Person[]): Promise<void> {
    return new Promise((resolve) => {
      // Convert the provided people data to CSV format
      const content = papa.unparse(argPeople);

      // Write the converted CSV data to the file
      fs.writeFile(this.filePath, content);
      resolve;
    });
  }
}
