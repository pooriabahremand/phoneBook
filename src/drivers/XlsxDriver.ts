import { writeFileSync } from "fs";
import Person from "./../classes/Person";
import reader from "xlsx";
import XLSX from "xlsx";
import ValidatePerson from "../classes/validation/validatePerson";
import ReadRegistery from "../classes/ReadRegistery";
export default class XlsxDriver {
  private people: Person[];
  private filePath: string = "./storage/phonebook.xlsx";
  private registery: Person[];

  constructor() {
    this.registery = new ReadRegistery().registery;
    let data: Person[] = [];
    const file = reader.readFile(this.filePath);
    const sheets = file.SheetNames;
    if (file) {
      for (let i = 0; i < sheets.length; i++) {
        const temp = reader.utils.sheet_to_json(
          file.Sheets[file.SheetNames[i]]
        );
        temp.forEach((res) => {
          data.push(res as Person);
        });
      }
      this.people = data;
    } else {
      this.people = [];
    }
  }

  validatePerson(argPerson: Person) {
    new ValidatePerson(this.registery, argPerson).validation();
  }

  add(argPerson: Person) {
    this.people.push(argPerson);
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(this.people);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, this.filePath);
    this.registery.push(argPerson);
    writeFileSync("./storage/registery.json", JSON.stringify(this.registery));
  }
}
