import JsonDriver from "./JsonDriver";
import CsvDriver from "./CsvDriver";
import XmlDriver from "./XmlDriver";
import XlsxDriver from "./XlsxDriver";
import Person from "../classes/Person";
export default class DriverStorage {
  private format: string;
  public driver: DriverInterface;

  constructor(argFormat: string) {
    this.format = argFormat;
    switch (this.format) {
      case "json":
        // make an instance of json driver
        this.driver = new JsonDriver();
        break;
      case "csv":
        // make an instance of csv driver
        this.driver = new CsvDriver();
        break;
      case "xml":
        // make an instance of xml driver
        this.driver = new XmlDriver();
        break;
      default:
        // make an instance of xlsx driver
        this.driver = new XlsxDriver();
        break;
    }
  }
}

export interface DriverInterface {
  people: Person[];
  filePath: string;
  add(argPerson: Person | Person[]): void;
}
