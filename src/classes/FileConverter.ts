// Importing required modules
import { readFileSync, writeFileSync } from "fs";
import papa from "papaparse";
import Person from "./Person";
import { XMLParser, X2jOptions, XMLBuilder } from "fast-xml-parser";
import reader from "xlsx";
import XLSX from "xlsx";

// Defining an interface for the PapaType
interface PapaType {
  data: Person[];
}

// Defining the FileConverter class
export default class FileConverter {
  private filePath: string;

  // Constructor for the FileConverter class
  constructor(filePathArg: string) {
    this.filePath = filePathArg;
  }

  // Method to read JSON data from a file
  readJson(): Person[] {
    const content = readFileSync(this.filePath, "utf-8");
    if (content) {
      return JSON.parse(content);
    } else {
      return [] as Person[];
    }
  }

  // Method to read CSV data from a file
  readCsv(): Person[] {
    const content = readFileSync(this.filePath, "utf-8");
    if (content) {
      const result: PapaType = papa.parse(content, { header: true });
      return result.data;
    } else {
      return [] as Person[];
    }
  }

  // Method to read XML data from a file
  readXml(): Person[] {
    const options = {
      ignoreNameSpace: true,
      ignoreRootElement: true,
    } as X2jOptions;
    const parser = new XMLParser(options);
    const content = readFileSync(this.filePath);
    if (content.length > 0) {
      const jsonObj = parser.parse(content);
      const contacts: Person[] = Object.values(jsonObj);
      return contacts;
    } else {
      return [] as Person[];
    }
  }

  // Method to read XLSX data from a file
  readXlsx(): Person[] {
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
      return data;
    } else {
      return [] as Person[];
    }
  }

  // Method to write CSV data to a file
  writeCsv(argPeople: Person[]) {
    const content = papa.unparse(argPeople);
    writeFileSync(this.filePath, content);
  }

  // Method to write XML data to a file
  writeXml(argPeople: Person[]) {
    const builder = new XMLBuilder({ oneListGroup: true });
    const result = builder.build(argPeople);
    writeFileSync(this.filePath, result);
  }

  // Method to write XLSX data to a file
  writeXlsx(argPeople: Person[]) {
    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.json_to_sheet(argPeople);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, this.filePath);
  }
}
