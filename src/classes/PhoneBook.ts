import { existsSync, writeFileSync, mkdirSync } from "fs";
import DriverStorage from "../drivers/DriverStorage";
import Person from "./Person";

import formats from "../utils/formats";

export class PhoneBook {
  private format: string;
  private driverStorage: DriverStorage;

  constructor(formatArg: string) {
    this.format = formatArg;
    if (!existsSync("./storage")) {
      mkdirSync("./storage");
    }

    for (const format of formats) {
      const filePath = `./storage/phoneBook.${format}`;
      if (!existsSync(filePath)) {
        writeFileSync(filePath, "");
      }
    }

    this.driverStorage = new DriverStorage(this.format);
  }

  public add(argPerson: Person): void {
    this.driverStorage.driver.validatePerson(argPerson);
    this.driverStorage.driver.add(argPerson);
  }
}
