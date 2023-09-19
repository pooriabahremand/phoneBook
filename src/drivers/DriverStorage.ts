// Import necessary modules and classes
import JsonDriver from "./JsonDriver";
import CsvDriver from "./CsvDriver";
import XmlDriver from "./XmlDriver";
import XlsxDriver from "./XlsxDriver";
import Person from "../classes/Person";

// Define the DriverInterface
export interface DriverInterface {
  people: Person[];
  filePath: string;
  read(): Person[];
  add(argPerson: Person): void;
  import(argPeople: Person[]): void;
}

// Define the DriverStorage class
export default class DriverStorage {
  private format: string | string[];
  public driver: DriverInterface;

  // Constructor for the DriverStorage class
  constructor(argFormat: string) {
    this.format = argFormat;

    switch (this.format) {
      case "json":
        this.driver = new JsonDriver();
        break;
      case "csv":
        this.driver = new CsvDriver();
        break;
      case "xml":
        this.driver = new XmlDriver();
        break;
      default:
        this.driver = new XlsxDriver();
        break;
    }
  }
}
