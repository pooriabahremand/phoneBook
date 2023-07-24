export interface Person {
  fullName: string;
  Number: string;
}

export interface ParsedContent {
  [key: string]: Person;
}
