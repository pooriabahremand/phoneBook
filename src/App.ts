// Import the readline module and the Person and PhoneBook classes
import * as readline from "readline";
import  Person  from "./classes/Person";
import { PhoneBook } from "./classes/PhoneBook";
// import AddToPhoneBook from "./types";

// Define the App class
export class App {
  // Declare private properties for the readline interface and the phone book and an object to store the result of adding the contact
  private rl: readline.Interface;
  private phoneBook: PhoneBook;

  // Define the constructor
  constructor() {
    // Create a new readline interface and a new phone book
    this.rl = readline.createInterface(process.stdin, process.stdout);
    this.phoneBook = new PhoneBook();
  }

  // Define the run method
  public async run() {
    // Prompt the user for their full name and phone number
    let tempFullName = await this.getInput("what is your full name?");
    let tempPhoneNumebr = await this.getInput("what is your phone number?");

    // Create a new Person object with the entered information
    let tempPerson = new Person(tempFullName, tempPhoneNumebr);

    // Attempt to add the new contact to the phone book & Display a success or error message based on whether the contact was added successfully
    console.log(this.phoneBook.add(tempPerson));

    // Restart the application
    this.restart();
  }
  // Define a private method for prompting the user for their full name and phone number
  private getInput(message: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(message, (input) => {
        resolve(input);
      });
    });
  }

  // Define a private method for restarting the application
  private restart() {
    this.run();
  }
}
