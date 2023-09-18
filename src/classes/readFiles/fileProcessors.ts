// Import necessary modules from Node.js and other files
import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
import Person from "../Person";
import ReadCsv from "./readCsv";
import ReadJson from "./readJson";
import ReadXml from "./readXml";
import ReadXlsx from "./readXlsx";

// Define the FileProcessor class
export default class FileProcessor {
  format: string[];
  filePath1: string;
  filePath2: string;

  // Constructor for the FileProcessor class
  constructor(argFormat: string[]) {
    this.format = argFormat; // Set the format for the files
    // Set the file paths for the phone book files
    this.filePath1 = path.join("storage", `phoneBook.${this.format[0]}`);
    this.filePath2 = path.join("storage", `phoneBook.${this.format[1]}`);
  }

  // Method to check if the files exist, and if not, create them
  private existanceChecker() {
    // If the storage directory doesn't exist, create it
    if (!existsSync("storage")) {
      mkdirSync("storage");
    }
    // If the first file doesn't exist, create it
    if (!existsSync(this.filePath1)) {
      writeFileSync(this.filePath1, "");
    }
    // If the second file doesn't exist, create it
    if (!existsSync(this.filePath2)) {
      writeFileSync(this.filePath2, "");
    }
  }

  // Method to process the files based on their format
  public processFiles() {
    let people: Person[][] = []; // Array to store the people data

    this.existanceChecker(); // Check if the files exist

    // For each format in the formats array, read the people data from the file of that format
    this.format.forEach((format) => {
      switch (format) {
        case "json":
          people.push(new ReadJson().readPeople());
          break;
        case "csv":
          people.push(new ReadCsv().readPeople());
          break;
        case "xml":
          people.push(new ReadXml().readPeople());
          break;
        case "xlsx":
          people.push(new ReadXlsx().readPeople());
          break;
        default:
          console.log(`Unsupported format: ${format}`); // Log an error message for unsupported formats
      }
    });
    return people; // Return the array of people data
  }
}
