// Import the readline module and the Person and PhoneBook classes
import * as readline from "readline";
import { Person } from "./classes/Person";
import { PhoneBook } from "./classes/PhoneBook";
import AddToPhoneBook from "./types";

// Define the App class
export class App {
  // Declare private properties for the readline interface and the phone book and an object to store the result of adding the contact
  private rl: readline.Interface;
  private phoneBook: PhoneBook;
  private addToPhoneBook: AddToPhoneBook = {
    successful: "the contact has been successfully added to phone book",
    failure: "you had saved this phone number before",
  };

  // Define the constructor
  constructor() {
    // Create a new readline interface and a new phone book
    this.rl = readline.createInterface(process.stdin, process.stdout);
    this.phoneBook = new PhoneBook();
  }

  // Define the run method
  public async run() {
    // Prompt the user for their full name and phone number
    let tempFullName = await this.getFullName();
    let tempPhoneNumebr = await this.getPhoneNumber();

    // Create a new Person object with the entered information
    let tempPerson = new Person(tempFullName, tempPhoneNumebr);
    // Attempt to add the new contact to the phone book
    let status = this.phoneBook.add(tempPerson);

    // Display a success or error message based on whether the contact was added successfully
    if (status) {
      console.log(this.addToPhoneBook.successful);
    } else {
      console.log(this.addToPhoneBook.failure);
    }

    // Restart the application
    this.restart();
  }

  // Define a private method for prompting the user for their full name
  private getFullName(): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question("what is your full name ? ", (fullName) => {
        resolve(fullName);
      });
    });
  }

  // Define a private method for prompting the user for their phone number
  private getPhoneNumber(): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question("what is you phone number ? ", (number) => {
        resolve(number);
        this.rl.close();
      });
    });
  }

  // Define a private method for restarting the application
  private restart() {
    this.rl = readline.createInterface(process.stdin, process.stdout);
    this.run();
  }
}
