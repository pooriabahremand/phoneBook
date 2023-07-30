import { readFileSync, writeFileSync, existsSync } from "fs";
import { Person } from "./interfaces";

const filePath: string = "./phonebook.json";
let phoneBook: Person[] = [];

if (existsSync(filePath)) {
  const content = readFileSync(filePath, "utf-8");
  if (content) {
    phoneBook = JSON.parse(content);
    phoneBook.map((contact) => {
      console.log(contact);
    });
  }
}

export const handleSimilarity = (person: Person) => {
  phoneBook.map((contact) => {
    console.log(contact);
  });
  const numberSimilarity = phoneBook.filter((numberValue) => {
    return person.Number === numberValue.Number;
  });

  return { numberSimilarity };
};

export const handleFile = (person: Person) => {
  try {
    const { numberSimilarity } = handleSimilarity(person);

    if (numberSimilarity.length > 0) {
      console.log(
        `you saved this phone number before !! this is the contact with the similarity `
      );
      console.log(numberSimilarity);
    } else {
      phoneBook = [...phoneBook, person];
      writeFileSync(filePath, JSON.stringify(phoneBook));
      console.log("contact has been created");
      phoneBook.map((contact) => {
        console.log(contact);
      });
    }
  } catch (error) {
    console.log(error);
  }
};
