// Import necessary modules from Node.js and other files
import { writeFileSync } from "fs";
import path from "path";
import Person from "./../classes/Person";
import papa from "papaparse";
import { DriverInterface } from "./DriverStorage";

// Define the CsvDriver class that implements the DriverInterface
export default class CsvDriver implements DriverInterface {
  // Declare properties for storing people data and file path
  public people: Person[];
  public filePath: string;

  // Constructor for the CsvDriver class
  constructor(argPeople: Person[]) {
    // Set the file path for the CSV file
    this.filePath = path.join("storage", "phoneBook.csv");

    // Initialize the people property with the provided data
    this.people = argPeople;
  }

  // Method to add a new person to the people data and update the CSV file
  public add(argPerson: Person): void {
    // Add the new person to the people data
    this.people.push(argPerson);

    // Convert the updated people data to CSV format
    const content = papa.unparse(this.people);

    // Write the updated CSV data to the file
    writeFileSync(this.filePath, content);
  }

  // Method to convert an array of Person objects to CSV format and write it to the file
  public convert(argPeople: Person[]): void {
    // Convert the provided people data to CSV format
    const content = papa.unparse(argPeople);

    // Write the converted CSV data to the file
    writeFileSync(this.filePath, content);
  }
}
