// Import necessary modules from Node.js and other files
import { writeFileSync, readFile } from "fs";
import { promises as fs } from "fs";
import path from "path";
import type Person from "./../classes/Person";
import { type DriverInterface } from "./storageDriver";

// Define the JsonDriver class that implements the DriverInterface
export default class JsonDriver implements DriverInterface {
  // Declare properties for storing people data , file path and isChange variable
  public people: Person[];
  public filePath: string;
  private isChange: boolean;

  // Constructor for the JsonDriver class
  constructor() {
    // Set the file path for the JSON file
    this.filePath = path.join("storage", "phoneBook.json");

    // Initialize the people property with the provided data
    this.people = [];

    // initialize the value of ischange to false
    this.isChange = false;

    // make a setinterval for adding contacts to the storage each 8 seconds
    setInterval(() => {
      if (this.isChange) {
        // Convert the updated people data to JSON format and write it to the file
        writeFileSync(this.filePath, JSON.stringify(this.people));
        // changing the value of ischange to the false
        this.isChange = false;
      }
    }, 8000);
  }

  // Method to read people data from a JSON file and return it as an array of Person objects
  public read(): Promise<Person[]> {
    // Read the contents of the JSON file
    return fs.readFile(this.filePath, "utf-8").then((content: string) => {
      // If the file was read successfully, parse the contents as JSON and return it
      if (content !== "") {
        this.people = JSON.parse(content);
        return JSON.parse(content);
      } else {
        // If the file could not be read, return an empty array
        return [];
      }
    });
  }

  // Method to add a new person to the people data and update the JSON file
  public add(argPerson: Person): Promise<void> {
    // Add the new person to the people data
    return new Promise((resolve) => {
      this.people.push(argPerson);
      // change the value of ischange to true
      this.isChange = true;
      resolve();
    });
  }

  // Method to convert an array of Person objects to JSON format and write it to the file
  public import(argPeople: Person[]): Promise<void> {
    return new Promise((resolve) => {
      // Convert the provided people data to JSON format and write it to the file
      fs.writeFile(this.filePath, JSON.stringify(argPeople));
      resolve();
    });
  }
}
