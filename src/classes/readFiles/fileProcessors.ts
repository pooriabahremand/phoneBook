import { existsSync, write, writeFileSync } from "fs";
import path from "path";
import Person from "../Person";
import ReadCsv from "./readCsv";
import ReadJson from "./readJson";
import ReadXml from "./readXml";
import ReadXlsx from "./readXlsx";

export default class FileProcessor {
  format: string[];
  filePath1: string;
  filePath2: string;

  constructor(argFormat: string[]) {
    this.format = argFormat;
    this.filePath1 = path.join("storage", `phoneBook.${this.format[0]}`);
    this.filePath2 = path.join("storage", `phoneBook.${this.format[1]}`);
  }

  private existanceChecker() {
    if (!existsSync(this.filePath1)) {
      writeFileSync(this.filePath1, "");
    }
    if (!existsSync(this.filePath2)) {
      writeFileSync(this.filePath2, "");
    }
  }

  public processFiles() {
    let people: Person[][] = [];
    this.existanceChecker();
    this.format.forEach((format) => {
      switch (format) {
        case "json":
          people.push(new ReadJson().readPeople());
          break;
        case "csv":
          people.push(new ReadCsv().readPeople());
          break;
        case "xml":
          people.push(new ReadXml().readPeople());
          break;
        case "xlsx":
          people.push(new ReadXlsx().readPeople());
          break;
        default:
          console.log(`Unsupported format: ${format}`);
      }
    });
    return people; // returns [originPeople, destinationPeople]
  }
}
