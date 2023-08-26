import { writeFileSync, readFileSync } from "fs";
import Person from "./../classes/Person";
import papa from "papaparse";
import ValidatePerson from "../classes/validation/validatePerson";
import ReadRegistery from "../classes/ReadRegistery";
import DriverStorage from "./DriverStorage";
interface PapaType {
  data: Person[];
}

export default class CsvDriver {
  private people: Person[];
  private filePath: string = "./storage/phonebook.csv";
  private registery: Person[];

  constructor() {
    this.registery = new ReadRegistery().registery;
    const content = readFileSync(this.filePath, "utf-8");
    if (content) {
      const result: PapaType = papa.parse(content, { header: true });
      this.people = result.data;
    } else {
      this.people = [];
    }
  }

  validatePerson(argPerson: Person): void {
    new ValidatePerson(this.registery, argPerson).validation();
  }

  add(argPerson: Person): void {
    this.people.push(argPerson);
    const content = papa.unparse(this.people);
    writeFileSync(this.filePath, content);
    this.registery.push(argPerson);
    writeFileSync("./storage/registery.json", JSON.stringify(this.registery));
  }
}
