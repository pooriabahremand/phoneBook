import * as readline from "readline";
import { PhoneBook } from "./PhoneBook";
import DriverStorage, { ValidTypes } from "../drivers/DriverStorage";
import Person from "./Person";
import DirectoryFileValidator from "./validation/directoryFileValidator";

export default class BuilderCtor {
  // Declaring private properties readLine, phoneBook, format, storageDriver, duty, directoryCheck and people
  public readLine: readline.Interface;
  public storageDriver: DriverStorage;
  public phoneBook: PhoneBook;
  public format: string;
  public people: Person[];
  public directoryCheck: DirectoryFileValidator;
  constructor(argDirectoryCheck: DirectoryFileValidator) {
    // Assigning the value of process.argv[2] to this.format
    this.format = process.argv[2];
    // making a new instance of DriverStorage class
    this.storageDriver = new DriverStorage(this.format as ValidTypes);
    // Creating a new instance of PhoneBook with this.format as argument and assigning it to this.phoneBook
    this.phoneBook = new PhoneBook(this.storageDriver);
    // Creating a new readline interface and assigning it to this.readLine
    this.readLine = readline.createInterface(process.stdin, process.stdout);
    //assigning DirectoryCehck to the appropirate value
    this.directoryCheck = argDirectoryCheck;
    //checking for the existence of filePath
    this.directoryCheck.validator(this.format);
    //making an array of people full of person objects
    this.people = this.storageDriver.driver.read();
  }
}
