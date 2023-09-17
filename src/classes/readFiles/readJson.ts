import path from "path";
import { readFileSync } from "fs";
import Person from "../Person";

export default class ReadJson {
  public filePath: string;

  // Constructor for the JsonDriver class
  constructor() {
    this.filePath = path.join("storage", "phoneBook.json");
  }

  public readPeople(): Person[] {
    // Reading the contents of this.filePath and assigning it to the content variable
    const content = readFileSync(this.filePath, "utf-8");
    // Checking if content has a truthy value
    if (content) {
      // If content has a truthy value, parsing it as JSON and assigning it to this.people
      return JSON.parse(content);
    } else {
      // If content does not have a truthy value, assigning an empty array to this.people
      return [];
    }
  }
}
