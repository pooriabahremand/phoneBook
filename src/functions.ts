import { readFileSync, writeFileSync, existsSync } from "fs";

import { Person, ParsedContent } from "./interfaces";

export const handleSimilarity = (
  parsedContent: ParsedContent,
  person: Person
) => {
  const numberSimilarity = Object.values(parsedContent).filter(
    (numberValue) => numberValue.Number === person.Number
  );
  return { numberSimilarity };
};

export const handleFile = (person: Person) => {
  const filePath = "./phonebook.json";
  if (!existsSync(filePath)) {
    writeFileSync(filePath, "");
  }
  try {
    const content = readFileSync(filePath, "utf-8");
    if (content) {
      const parsedContent: ParsedContent = JSON.parse(content);
      const { numberSimilarity } = handleSimilarity(parsedContent, person);

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
        writeFileSync(filePath, newObject);
        console.log("contact has been created");
      }
    } else {
      const newObject = JSON.stringify({ 0: person });
      writeFileSync(filePath, newObject);
      console.log("contact has been created");
    }
  } catch (error) {
    console.log(error);
  }
};
