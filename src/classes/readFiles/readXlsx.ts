// Import necessary modules and classes
import Person from "../Person";
import path from "path";
import reader from "xlsx";

// Define the ReadXlsx class
export default class ReadXlsx {
  public filePath: string;

  // Constructor for the ReadXlsx class
  constructor() {
    // Set the file path for the XLSX file
    this.filePath = path.join("storage", "phoneBook.xlsx");
  }

  // Method to read people data from an XLSX file and return it as an array of Person objects
  public readPeople(): Person[] {
    // Initialize an empty array to store the people data
    let data: Person[] = [];

    // Read the contents of the XLSX file
    const file = reader.readFile(this.filePath);

    // If the file was read successfully
    if (file) {
      // Get the names of the sheets in the file
      const sheets = file.SheetNames;

      // For each sheet in the file
      for (let i = 0; i < sheets.length; i++) {
        // Convert the sheet to JSON format
        const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);

        // For each item in the converted data, add it as a Person object to the data array
        temp.forEach((res) => {
          data.push(res as Person);
        });
      }

      // Return the array of Person objects
      return data;
    } else {
      // If the file could not be read, return an empty array
      return [];
    }
  }
}
