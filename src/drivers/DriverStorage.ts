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

export type ValidTypes = "json" | "csv" | "xml" | "xlsx";

// Define the DriverStorage class
export default class DriverStorage {
  private format: ValidTypes;
  public driver: DriverInterface;

  // Constructor for the DriverStorage class
  constructor(argFormat: ValidTypes) {
    this.format = argFormat;

    const drivers: Record<ValidTypes, new () => DriverInterface> = {
      json: JsonDriver,
      csv: CsvDriver,
      xml: XmlDriver,
      xlsx: XlsxDriver,
    };

    this.driver = new drivers[this.format]();
  }
}
