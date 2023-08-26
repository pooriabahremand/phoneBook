import { writeFileSync, readFileSync } from "fs";
import Person from "./../classes/Person";
import { XMLParser, X2jOptions, XMLBuilder } from "fast-xml-parser";
import ValidatePerson from "../classes/validation/validatePerson";
import ReadRegistery from "../classes/ReadRegistery";

export default class XmlDriver {
  private people: Person[];
  private filePath: string = "./storage/phonebook.xml";
  private registery: Person[];

  constructor() {
    this.registery = new ReadRegistery().registery;

    const options = {
      ignoreNameSpace: true,
      ignoreRootElement: true,
    } as X2jOptions;
    const parser = new XMLParser(options);
    const content = readFileSync(this.filePath);
    if (content.length > 0) {
      const jsonObj = parser.parse(content);
      const contacts: Person[] = Object.values(jsonObj);
      this.people = contacts;
    } else {
      this.people = [];
    }
  }

  validatePerson(argPerson: Person) {
    new ValidatePerson(this.registery, argPerson).validation();
  }

  add(argPerson: Person) {
    this.people.push(argPerson);
    const builder = new XMLBuilder({ oneListGroup: true });
    const result = builder.build(this.people);
    writeFileSync(this.filePath, result);
    this.registery.push(argPerson);
    writeFileSync("./storage/registery.json", JSON.stringify(this.registery));
  }
}
