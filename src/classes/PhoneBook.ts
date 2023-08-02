// Import the fs module and the Person class
import { existsSync, readFileSync, writeFileSync } from "fs";
import { Person } from "./Person";

// Define the PhoneBook class
export class PhoneBook {
  // Declare properties for the array of people and the file path
  ppl: Person[];
  filePath: string = "./phonebook.json";

  // Define the constructor
  constructor() {
    // Check if the phonebook file exists
    if (!existsSync(this.filePath)) {
      // If it doesn't exist, create an empty file and initialize the ppl array to an empty array
      writeFileSync(this.filePath, JSON.stringify([]));
      this.ppl = [];
    } else {
      // If it does exist, read its content and parse it as JSON
      const content = readFileSync(this.filePath, "utf-8");
      // If there is content, initialize the ppl array with it; otherwise, initialize it to an empty array
      if (content) {
        this.ppl = JSON.parse(content);
      } else {
        this.ppl = [];
      }
    }
  }

  // Define the add method, which takes a Person object as an argument and returns a boolean
  public add(argPerson: Person): number {
    // Check if the person is valid using the validatePerson method
    if (this.validatePerson(argPerson) === 2) {
      // If they are valid, add them to the ppl array and write it to the file
      this.ppl.push(argPerson);
      writeFileSync(this.filePath, JSON.stringify(this.ppl));
      // Return true to indicate that the person was added successfully
      return 2;
    } else {
      // If they are not valid, return false to indicate that they were not added
      return this.validatePerson(argPerson);
    }
  }

  // Define a private method for validating a person
  private validatePerson(argPerson: Person): number {
    // Filter the ppl array to find any contacts with the same number as argPerson
    const tempFilteredPpl = this.ppl.filter((contact: Person) => {
      return contact.Number === argPerson.Number;
    });
    const invalidInput = Object.values(argPerson).filter((item) => {
      return item.trim() === "";
    });

    if (invalidInput.length > 0) {
      return 0;
    } else {
      if (tempFilteredPpl.length > 0) {
        return 1;
      } else {
        return 2;
      }
    }
    // If there are any contacts with the same number, return false; otherwise, return true
  }
}
