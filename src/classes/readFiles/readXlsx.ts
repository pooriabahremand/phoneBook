import Person from "../Person";
import path from "path";
import reader from "xlsx";

export default class ReadXlsx {
  public filePath: string;

  // Constructor for the XlsxDriver class
  constructor() {
    this.filePath = path.join("storage", "phoneBook.xlsx");
  }

  public readPeople(): Person[] {
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
      // returning data
      return data;
    } else {
      // If file does not have a truthy value, returning an empty array
      return [];
    }
  }
}
