import DriverStorage, { ValidTypes } from "../drivers/DriverStorage";
import Person from "./Person";
import DirectoryFileValidator from "./validation/directoryFileValidator";

export default class ImporterCtor {
  //Declaring private properties for storageDriver, storageDriver2, format, people, and directoryCheck
  public storageDriver: DriverStorage;
  public storageDriver2: DriverStorage;
  public format: string;
  public people: Person[];
  public directoryCheck: DirectoryFileValidator;
  //constructor of class ImporterCtor
  constructor(argDirectoryCheck: DirectoryFileValidator) {
    // Assigning the value of process.argv[3] to this.format
    this.format = process.argv[3];
    // making a new instance of DriverStorage class with origin arg
    this.storageDriver = new DriverStorage(this.format as ValidTypes);
    // making people of origin arg with creating new instance of DriverStorage
    this.storageDriver2 = new DriverStorage(process.argv[2] as ValidTypes);
    //making the people array
    this.people = [];

    this.directoryCheck = argDirectoryCheck;
    //checking for the existence of filePath
    this.directoryCheck.validator(process.argv[2]);
    this.directoryCheck.validator(this.format);
  }
}
