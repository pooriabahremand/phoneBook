// Importing the readFileSync, existsSync, and writeFileSync functions from the "fs" module
import { readFileSync, existsSync, writeFileSync } from "fs";
// Importing the Person class from the "./Person" module
import Person from "./Person";

// Exporting the ReadRegistery class as the default export
export default class ReadRegistery {
  // Declaring a public property registery of type Person[]
  public registery: Person[];

  // Constructor for the ReadRegistery class
  constructor() {
    // Checking if the "./storage/registery.json" file exists, if not, creating it with an empty string as content
    if (!existsSync("./storage/registery.json")) {
      writeFileSync("./storage/registery.json", "");
    }
    // Reading the contents of the "./storage/registery.json" file and assigning it to the population variable
    const population = readFileSync("./storage/registery.json", "utf-8");
    // Checking if population has a truthy value
    if (population) {
      // If population has a truthy value, parsing it as JSON and assigning it to this.registery
      this.registery = JSON.parse(population);
    } else {
      // If population does not have a truthy value, assigning an empty array to this.registery
      this.registery = [];
    }
  }
}
