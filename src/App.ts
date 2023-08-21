// Importing required modules
import * as readline from "readline";
import Person from "./classes/Person";
import { PhoneBook } from "./classes/PhoneBook";

import { ValidationError, InputError } from "./classes/Exception";

// Defining the App class
export class App {
  private rl: readline.Interface;
  private phoneBook: PhoneBook;
  private format: string;

  // Constructor for the App class
  constructor() {
    // Defining an error message to be displayed if the command line arguments are invalid
    const errorMsg =
      "the command that you wrote is invalid , you can choose between json , csv , xml and xlsx";

    // Checking if there are too many command line arguments
    if (process.argv.length > 3) {
      console.error(errorMsg);
      process.exit(1);
    } else {
      // Checking if a format was specified in the command line arguments
      if (process.argv.length === 2) {
        this.format = "json";
      } else {
        this.format = process.argv[2].toLowerCase();
      }

      // Checking if the specified format is valid
      if (
        this.format === "json" ||
        this.format === "csv" ||
        this.format === "xml" ||
        this.format === "xlsx"
      ) {
        // Creating a new instance of the PhoneBook class with the specified format
        this.phoneBook = new PhoneBook(this.format);
        // Creating a new instance of the readline interface
        this.rl = readline.createInterface(process.stdin, process.stdout);
      } else {
        console.error(errorMsg);
        process.exit(1);
      }
    }
  }

  // Method to run the app
  public async run() {
    // Getting user input for the full name and phone number
    let tempFullName = await this.getInput("what is your full name?");
    let tempPhoneNumebr = await this.getInput("what is your phone number?");

    // Creating a new instance of the Person class with the user input
    let tempPerson = new Person(tempFullName, tempPhoneNumebr, this.format);

    try {
      // Adding the person to the phone book
      this.phoneBook.add(tempPerson);
      console.log("the contact has been successfully added to phone book");
    } catch (error) {
      // Handling any errors that may occur
      if (error instanceof ValidationError) {
        console.error((error as ValidationError).name);
        console.error(`Error message : ${(error as ValidationError).message}`);
        console.error("contact with the same phone number ");
        console.error((error as ValidationError).cause);
      } else if (error instanceof InputError) {
        console.error((error as InputError).name);
        console.error(`Error message : ${(error as InputError).message}`);
      } else {
        console.log(error);
      }
    }

    // Restarting the app
    this.restart();
  }

  // Method to get user input using readline
  private getInput(message: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(message, (input) => {
        resolve(input);
      });
    });
  }

  // Method to restart the app
  private restart() {
    this.run();
  }
}
