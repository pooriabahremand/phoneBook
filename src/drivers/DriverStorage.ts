import JsonDriver from "./JsonDriver";
import CsvDriver from "./CsvDriver";
import XmlDriver from "./XmlDriver";
import XlsxDriver from "./XlsxDriver";
import Person from "../classes/Person";
import ReadCsv from "../classes/readFiles/readCsv";
import ValidatePerson from "../classes/validation/validatePerson";
import ReadJson from "../classes/readFiles/readJson";
import ReadXml from "../classes/readFiles/readXml";
import ReadXlsx from "../classes/readFiles/readXlsx";
import { type } from "os";

export interface DriverInterface {
  people: Person[];
  filePath: string;
  add(argPerson: Person): void;
  convert(argPeople: Person[]): void;
}

export default class DriverStorage {
  private format: string | string[];
  public driver: DriverInterface;
  public people: Person[];

  constructor(argFormat: string | string[]) {
    this.format = argFormat;
    if (typeof this.format !== "string") {
      this.people = [];
      switch (this.format[1]) {
        case "json":
          // make an instance of json driver

          this.driver = new JsonDriver(this.people);
          break;
        case "csv":
          // make an instance of csv driver

          this.driver = new CsvDriver(this.people);
          break;
        case "xml":
          // make an instance of xml driver

          this.driver = new XmlDriver(this.people);
          break;
        default:
          // make an instance of xlsx driver

          this.driver = new XlsxDriver(this.people);
          break;
      }
    } else {
      switch (this.format) {
        case "json":
          // make an instance of json driver
          this.people = new ReadJson().readPeople();
          this.driver = new JsonDriver(this.people);
          break;
        case "csv":
          // make an instance of csv driver
          this.people = new ReadCsv().readPeople();
          this.driver = new CsvDriver(this.people);
          break;
        case "xml":
          // make an instance of xml driver
          this.people = new ReadXml().readPeople();
          this.driver = new XmlDriver(this.people);
          break;
        default:
          // make an instance of xlsx driver
          this.people = new ReadXlsx().readPeople();
          this.driver = new XlsxDriver(this.people);
          break;
      }
    }
  }

  public add(argPerson: Person | Person[]) {
    if (argPerson instanceof Person) {
      new ValidatePerson(this.people, argPerson).validation();
      this.driver.add(argPerson);
    } else {
      this.driver.convert(argPerson);
    }
  }
}
