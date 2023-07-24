// functions.ts
import { readFile, writeFile } from "fs";
import { promisify } from "util";
import { Person, ParsedContent } from "./interfaces";
import {person} from './main'

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

export const handleSimilarity = (parsedContent: ParsedContent) => {
  const numberSimilarity = Object.values(parsedContent).filter(
    (numberValue) => numberValue.Number === person.Number
  );
  return { numberSimilarity };
};

export const handleFile = async (person: Person) => {
  try {
    const content = await readFileAsync("phonebook.json", "utf-8");
    if (content) {
      const parsedContent: ParsedContent = JSON.parse(content);
      const { numberSimilarity } = handleSimilarity(parsedContent);

      if (numberSimilarity.length > 0) {
        console.log(
          `you saved this phone number before !! this is the contact with the similarity `
        );
        console.log(numberSimilarity);
      } else {
        const newObject = JSON.stringify({
          ...parsedContent,
          [Object.keys(parsedContent).length]: person,
        });
        await writeFileAsync("phonebook.json", newObject);
      }
    } else {
      const newObject = JSON.stringify({ 0: person });
      await writeFileAsync("phonebook.json", newObject);
    }
  } catch (error) {
    console.log(error);
  }
};
