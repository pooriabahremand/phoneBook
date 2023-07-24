import * as readline from "readline";
import { Person } from "./interfaces";
import { handleFile } from "./functions";

export class App {
  private rl: readline.Interface;
  private person: Person;

  constructor() {
    this.rl = readline.createInterface(process.stdin, process.stdout);
    this.person = {
      fullName: "",
      Number: "",
    };
  }

  public async run() {
    this.rl.question("what is your full name ? ", async (fullName) => {
      this.person.fullName = fullName;
      this.rl.question("what is your phone number ? ", async (number) => {
        this.person.Number = number;
        await handleFile(this.person);
        this.rl.close();
        this.restart();
      });
    });
  }

  private restart() {
    this.rl = readline.createInterface(process.stdin, process.stdout);
    this.run();
  }
}
