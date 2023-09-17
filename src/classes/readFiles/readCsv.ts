import path from "path";
import { readFileSync } from "fs";
import Person from "../Person";
import papa from "papaparse";

interface PapaType {
  data: Person[];
}

export default class ReadCsv {
  private filePath: string;
  constructor() {
    this.filePath = path.join("storage", "phoneBook.csv");
  }
  public readPeople(): Person[] {
    // Reading the contents of this.filePath and assigning it to the content variable
    const content = readFileSync(this.filePath, "utf-8");
    // Checking if content has a truthy value
    if (content) {
      // If content has a truthy value, parsing it using papa.parse with header set to true and assigning the result to result
      const result: PapaType = papa.parse(content, { header: true });
      // Assigning result.data to this.people
      return result.data;
    } else {
      // If content does not have a truthy value, assigning an empty array to this.people
      return [];
    }
  }
}
