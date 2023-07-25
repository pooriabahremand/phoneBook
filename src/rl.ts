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
    this.getFullName();
  }

  private getFullName() {
    this.rl.question("What is your full name? ", (fullName) => {
      if (!fullName.trim()) {
        console.log("Invalid input. Please try again.");
        this.getFullName();
      } else {
        this.person.fullName = fullName;
        this.getPhoneNumber();
      }
    });
  }

  private getPhoneNumber() {
    this.rl.question("What is your phone number? ", async (number) => {
      if (!number.trim()) {
        console.log("Invalid input. Please try again.");
        this.getPhoneNumber();
      } else {
        this.person.Number = number;
        await handleFile(this.person);
        this.rl.close();
        this.restart();
      }
    });
  }

  private restart() {
    this.rl = readline.createInterface(process.stdin, process.stdout);
    this.run();
  }
}
