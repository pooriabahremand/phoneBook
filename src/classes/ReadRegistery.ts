import { readFileSync, existsSync, writeFileSync } from "fs";
import Person from "./Person";
export default class ReadRegistery {
  public registery: Person[];
  constructor() {
    if (!existsSync("./storage/registery.json")) {
      writeFileSync("./storage/registery.json", "");
    }
    const population = readFileSync("./storage/registery.json", "utf-8");
    if (population) {
      this.registery = JSON.parse(population);
    } else {
      this.registery = [];
    }
  }
}
