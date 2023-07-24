import * as readline from "readline";
import { Person } from "./interfaces";
import { handleFile } from "./functions";

const rl = readline.createInterface(process.stdin, process.stdout);

export const person: Person = {
  fullName: "",
  Number: "",
};

rl.question("what is your full name ? ", (fullName) => {
  person.fullName = fullName;
  rl.question("what is your phone number ? ", (number) => {
    person.Number = number;
    handleFile(person);
    rl.close();
  });
});
