import * as readline from "readline";
let rl = readline.createInterface(process.stdin, process.stdout);

interface Person {
  fullName: string;
  age: string;
}

const person: Person = {
  fullName: "",
  age: "0",
};

rl.question("what is your age?", (age) => {
  person.age = age;
  rl.question("what is your full name ? ", (fullName) => {
    person.fullName = fullName;
    console.log(JSON.stringify(person));
    rl.close();
  });
});
