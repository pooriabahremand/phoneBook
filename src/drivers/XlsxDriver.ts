// Importing required modules
import Person from "./../classes/Person";
import reader from "xlsx";
import XLSX from "xlsx";
import ValidatePerson from "../classes/validation/validatePerson";
import { DriverInterface } from "./DriverStorage";

// Exporting the XlsxDriver class as the default export
export default class XlsxDriver implements DriverInterface {
  // Declaring private properties people, filePath, and registery
  public people: Person[];
  public filePath: string = "./storage/phonebook.xlsx";

  // Constructor for the XlsxDriver class
  constructor() {
    // Initializing an empty array for data
    let data: Person[] = [];
    // Reading the contents of this.filePath using reader.readFile and assigning it to file
    const file = reader.readFile(this.filePath);
    // Getting the sheet names of file and assigning them to sheets
    const sheets = file.SheetNames;
    // Checking if file has a truthy value
    if (file) {
      // If file has a truthy value, looping through the sheets array
      for (let i = 0; i < sheets.length; i++) {
        // Converting the current sheet to JSON using reader.utils.sheet_to_json and assigning it to temp
        const temp = reader.utils.sheet_to_json(
          file.Sheets[file.SheetNames[i]]
        );
        // Looping through temp and pushing each element as a Person object to data
        temp.forEach((res) => {
          data.push(res as Person);
        });
      }
      // Assigning data to this.people
      this.people = data;
    } else {
      // If file does not have a truthy value, assigning an empty array to this.people
      this.people = [];
    }
  }

  // Public method add that takes a Person object as argument and returns void
  public add(argPerson: Person | Person[]) {
    if (argPerson instanceof Person) {
      // Creating a new instance of ValidatePerson with this.people and argPerson as arguments and calling its validation method
      new ValidatePerson(this.people, argPerson).validation();
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
    } else {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(argPerson);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, this.filePath);
    }
  }

  public convertToXlsx() {}
}
