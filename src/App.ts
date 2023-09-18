// Importing required modules
import * as readline from "readline";
import Person from "./classes/Person";
import { PhoneBook } from "./classes/PhoneBook";
import ValidateArgument from "./classes/validation/ValidataArgument";
import ErrorLogger from "./classes/ErrorLogger";
import DriverStorage from "./drivers/DriverStorage";
import CommandLineParser from "./classes/CommandLineParser";
import ConvertValidation from "./classes/validation/ConvertValidation";
import FileProcessor from "./classes/readFiles/fileProcessors";

// Exporting the App class
export class App {
  // Declaring private properties readLine, phoneBook, format, storageDriver, duty and people
  private readLine!: readline.Interface;
  private storageDriver!: DriverStorage;
  private phoneBook!: PhoneBook;
  private format: string | string[];
  private duty: string;
  private people: Person[][];

  // Constructor for the App class
  constructor() {
    // Creating a new instance of ValidateArgument
    new ValidateArgument();
    // deciding on the goal of the whole application which can be build a phone book or convert different types of phone book to each other
    this.duty = new CommandLineParser().cmdParser();
    // checking the value of the duty , if it is equal to builder ...
    if (this.duty === "builder") {
      // Assigning the value of process.argv[2] to this.format
      this.format = process.argv[2];
      // Creating a new instance of PhoneBook with this.format as argument and assigning it to this.phoneBook
      this.phoneBook = new PhoneBook(this.format);
      // Creating a new readline interface and assigning it to this.readLine
      this.readLine = readline.createInterface(process.stdin, process.stdout);
      this.people = [];
      // if it is not equal to builder
    } else {
      // assigning the format of 2 cmd arguments to an array of formats
      this.format = [process.argv[2], process.argv[3]];
      // making a new instance of DriverStorage class an passing format to it's ctor
      this.storageDriver = new DriverStorage(this.format);
      // making an array of people that is combined of people in 2 formats
      this.people = new FileProcessor(this.format).processFiles();
      // validate the people
      new ConvertValidation(this.people).validation();
    }
  }

  // Public async method run that returns void
  public async run() {
    //checking for the equality of duty with builder , it true
    if (this.duty === "builder") {
      // Getting user input for full name and phone number using the getInput method and assigning them to tempFullName and tempPhoneNumebr respectively
      let tempFullName = await this.getInput("what is your full name?");
      let tempPhoneNumebr = await this.getInput("what is your phone number?");

      // Creating a new instance of Person with tempFullName, tempPhoneNumebr, and this.format as arguments and assigning it to tempPerson
      let tempPerson = new Person(tempFullName, tempPhoneNumebr, this.format);
      // start to add the contact to the phonebook inside of a try catch block to catch and handle errors
      try {
        // Adding tempPerson to this.phoneBook using the add method
        this.phoneBook.add(tempPerson);
        console.log("the contact has been successfully added to phone book");
      } catch (error) {
        new ErrorLogger(error as Error);
      }

      // Restarting the app by calling the restart method
      this.restart();
      // if the value of duty is not equal to builder ...
    } else {
      //trying to convert people of first format combined with people people of second format to the destination with the help of calling convert method on storageDriver inside of try catch to handle and catch errors
      try {
        this.storageDriver.convert([...this.people[0], ...this.people[1]]);
        console.log("the convertion has been successfuly completed");
      } catch (error) {
        new ErrorLogger(error as Error);
      }
    }
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
