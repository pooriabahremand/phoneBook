// Importing the readline module
import * as readline from "readline";
// Importing the Person class from the "./classes/Person" module
import Person from "./classes/Person";
// Importing the PhoneBook class from the "./classes/PhoneBook" module
import { PhoneBook } from "./classes/PhoneBook";
// Importing the ValidateArgument class from the "./classes/validation/ValidataArgument" module
import ValidateArgument from "./classes/validation/ValidataArgument";
// Importing the ValidationError and InputError classes from the "./classes/Exception" module
import { ValidationError, InputError } from "./classes/Exception";

// Exporting the App class
export class App {
  // Declaring private properties readLine, phoneBook, and format
  private readLine: readline.Interface;
  private phoneBook: PhoneBook;
  private format: string;
  

  // Constructor for the App class
  constructor() {
    // Creating a new instance of ValidateArgument
    new ValidateArgument();
    // Assigning the value of process.argv[2] to this.format
    this.format = process.argv[2];
    // Creating a new instance of PhoneBook with this.format as argument and assigning it to this.phoneBook
    this.phoneBook = new PhoneBook(this.format);
    // Creating a new readline interface and assigning it to this.readLine
    this.readLine = readline.createInterface(process.stdin, process.stdout);
  }

  // Public async method run that returns void
  public async run() {
    // Getting user input for full name and phone number using the getInput method and assigning them to tempFullName and tempPhoneNumebr respectively
    let tempFullName = await this.getInput("what is your full name?");
    let tempPhoneNumebr = await this.getInput("what is your phone number?");

    // Creating a new instance of Person with tempFullName, tempPhoneNumebr, and this.format as arguments and assigning it to tempPerson
    let tempPerson = new Person(tempFullName, tempPhoneNumebr, this.format);

    try {
      // Adding tempPerson to this.phoneBook using the add method
      this.phoneBook.add(tempPerson);
      console.log("the contact has been successfully added to phone book");
    } catch (error) {
      // Checking if error is an instance of ValidationError or InputError and logging appropriate error messages
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

    // Restarting the app by calling the restart method
    this.restart();
  }

  // Private method getInput that takes a string message as argument and returns a Promise that resolves with a string value
  private getInput(message: string): Promise<string> {
    return new Promise((resolve) => {
      // Using the question method of this.readLine to get user input and resolving the Promise with the input value
      this.readLine.question(message, (input) => {
        resolve(input);
      });
    });
  }

  // Private method restart that returns void
  private restart() {
    // Restarting the app by calling the run method again
    this.run();
  }
}
