import { Person, ParsedContent } from "./interfaces";

export declare const handleFile: (person: Person) => Promise<void>;

export declare const handleSimilarity: (
  parsedContent: ParsedContent,
  person: Person
) => { numberSimilarity: Person[] };
