import { Person } from "./interfaces";

export declare const handleFile: (person: Person) => Promise<void>;

export declare const handleSimilarity: (person: Person) => {
  numberSimilarity: Person[];
};
