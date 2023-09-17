// Importing required modules
import Person from "./../classes/Person";
import path from "path";
import reader from "xlsx";
import XLSX from "xlsx";
import ValidatePerson from "../classes/validation/validatePerson";
import { DriverInterface } from "./DriverStorage";

// Exporting the XlsxDriver class as the default export
export default class XlsxDriver implements DriverInterface {
  // Declaring private properties people, filePath, and registery
  public people: Person[];
  public filePath: string;

  // Constructor for the XlsxDriver class
  constructor(argPeople: Person[]) {
    this.filePath = path.join("storage", "phoneBook.xlsx");
    // Initializing an empty array for data
    this.people = argPeople;
  }

  // Public method add that takes a Person object as argument and returns void
  public add(argPerson: Person) {
    // Pushing argPerson to this.people
    this.people.push(argPerson);
    // Creating a new workbook using XLSX.utils.book_new and assigning it to workbook
    const workbook = XLSX.utils.book_new();
    // Converting this.people to a sheet using XLSX.utils.json_to_sheet and assigning it to worksheet
    const worksheet = XLSX.utils.json_to_sheet(this.people);
    // Appending worksheet to workbook with the name "Sheet1" using XLSX.utils.book_append_sheet
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    // Writing workbook to this.filePath using XLSX.writeFile
    XLSX.writeFile(workbook, this.filePath);
  }

  public convert(argPeople: Person[]): void {
    // Creating a new workbook using XLSX.utils.book_new and assigning it to workbook
    const workbook = XLSX.utils.book_new();
    // Converting this.people to a sheet using XLSX.utils.json_to_sheet and assigning it to worksheet
    const worksheet = XLSX.utils.json_to_sheet(argPeople);
    // Appending worksheet to workbook with the name "Sheet1" using XLSX.utils.book_append_sheet
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    // Writing workbook to this.filePath using XLSX.writeFile
    XLSX.writeFile(workbook, this.filePath);
  }
}
