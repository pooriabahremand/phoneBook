/// <reference types="node" />
import * as readline from "readline";
import { PhoneBook } from "./PhoneBook";
import DriverStorage from "../drivers/DriverStorage";
import Person from "./Person";
import DirectoryFileValidator from "./validation/directoryFileValidator";
export default class BuilderCtor {
    readLine: readline.Interface;
    storageDriver: DriverStorage;
    phoneBook: PhoneBook;
    format: string;
    people: Person[];
    directoryCheck: DirectoryFileValidator;
    constructor(argDirectoryCheck: DirectoryFileValidator);
}
