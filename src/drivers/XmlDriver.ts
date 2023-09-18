// Import necessary modules and classes
import { writeFileSync } from "fs";
import path from "path";
import Person from "./../classes/Person";
import { XMLBuilder } from "fast-xml-parser";
import { DriverInterface } from "./DriverStorage";

// Define the XmlDriver class that implements the DriverInterface
export default class XmlDriver implements DriverInterface {
  // Declare properties for storing people data and file path
  public people: Person[];
  public filePath: string;

  // Constructor for the XmlDriver class
  constructor(argPeople: Person[]) {
    // Set the file path for the XML file
    this.filePath = path.join("storage", "phoneBook.xml");

    // Initialize the people property with the provided data
    this.people = argPeople;
  }

  // Method to add a new person to the people data and update the XML file
  public add(argPerson: Person) {
    // Add the new person to the people data
    this.people.push(argPerson);

    // Create a new XMLBuilder instance with oneListGroup set to true
    const builder = new XMLBuilder({ oneListGroup: true });

    // Convert the updated people data to an XML string
    const result = builder.build(this.people);

    // Write the updated XML data to the file
    writeFileSync(this.filePath, result);
  }

  // Method to convert an array of Person objects to XML format and write it to the file
  public convert(argPeople: Person[]) {
    // Create a new XMLBuilder instance with oneListGroup set to true
    const builder = new XMLBuilder({ oneListGroup: true });

    // Convert the provided people data to an XML string
    const result = builder.build(argPeople);

    // Write the converted XML data to the file
    writeFileSync(this.filePath, result);
  }
}
