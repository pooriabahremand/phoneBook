// Importing required modules
import { readFileSync } from "fs";
import path from "path";
import Person from "../Person";
import { XMLParser, X2jOptions } from "fast-xml-parser";

export default class ReadXml {
  // Declaring private properties people, filePath, and registery
  public filePath: string;

  // Constructor for the XmlDriver class
  constructor() {
    this.filePath = path.join("storage", "phoneBook.xml");
  }

  public readPeople(): Person[] {
    // Defining options for the XMLParser
    const options = {
      ignoreNameSpace: true,
      ignoreRootElement: true,
    } as unknown as X2jOptions;
    // Creating a new instance of XMLParser with options as argument and assigning it to parser
    const parser = new XMLParser(options);
    // Reading the contents of this.filePath and assigning it to content
    const content = readFileSync(this.filePath);
    // Checking if content has a length greater than 0
    if (content.length > 0) {
      // If content has a length greater than 0, parsing it using parser.parse and assigning the result to jsonObj
      const jsonObj = parser.parse(content);
      // Getting the values of jsonObj as an array of Person objects and assigning it to contacts
      const contacts: Person[] = Object.values(jsonObj);
      // Assigning contacts to this.people
      const neeContacts: Person[] = contacts.map((contact) => {
        contact.Number = "0" + contact.Number;
        return { ...contact };
      });
      return neeContacts;
    } else {
      // If content does not have a length greater than 0, assigning an empty array to this.people
      return [];
    }
  }
}
