import { writeFileSync, readFileSync} from "fs";
import Person from "./../classes/Person";
import ValidatePerson from "../classes/validation/validatePerson";
import ReadRegistery from "../classes/ReadRegistery";

export default class JsonDriver {
  private people: Person[];
  private filePath: string = "./storage/phonebook.json";
  private registery: Person[];

  constructor() {
    this.registery = new ReadRegistery().registery;

    const content = readFileSync(this.filePath, "utf-8");
    if (content) {
      this.people = JSON.parse(content);
    } else {
      this.people = [];
    }
  }

  validatePerson(argPerson: Person) {
    new ValidatePerson(this.registery, argPerson).validation();
  }

  add(argPerson: Person) {
    this.people.push(argPerson);
    writeFileSync(this.filePath, JSON.stringify(this.people));
    this.registery.push(argPerson);
    writeFileSync("./storage/registery.json", JSON.stringify(this.registery));
  }
}
