// Import the fs module and the Person class
import { existsSync, readFileSync, writeFileSync } from "fs";
import Person from "./Person";
import ValidatePerson from "./validatePerson";

// Define the PhoneBook class
export class PhoneBook {
  // Declare properties for the array of people and the file path
  private people: Person[];
  private filePath: string = "./phonebook.json";
  private messages: { [key: number]: string } = {
    0: "Invalid input, make sure you answered all questions",
    1: "Invalid input, this phone number belongs to another person",
    2: "the contact has been successfully added to phone book",
    3: "an error happend , please try again",
  };

  // Define the constructor
  constructor() {
    // Check if the phonebook file exists
    this.people = [];
    if (!existsSync(this.filePath)) {
      // If it doesn't exist, create an empty file and initialize the ppl array to an empty array
      writeFileSync(this.filePath, JSON.stringify(this.people));
    } else {
      // If it does exist, read its content and parse it as JSON
      const content = readFileSync(this.filePath, "utf-8");
      // If there is content, initialize the ppl array with it; otherwise, initialize it to an empty array
      if (content) {
        this.people = JSON.parse(content);
      }
    }
  }

  // Define the add method, which takes a Person object as an argument and returns a boolean
  public add(argPerson: Person): string {
    // Check if the person is valid using the validatePerson method
    const validatedResult = new ValidatePerson(this.people, argPerson);
    if (validatedResult.validation() === 2) {
      // If they are valid, add them to the ppl array and write it to the file
      try {
        this.people.push(argPerson);
        writeFileSync(this.filePath, JSON.stringify(this.people));
        // Return num 2 to indicate that the person was added successfully
        return this.messages[2];
      } catch (error) {
        return this.messages[3];
      }
    } else {
      // If they are not valid, return false to indicate that they were not added
      return this.messages[validatedResult.validation()];
    }
  }
}

