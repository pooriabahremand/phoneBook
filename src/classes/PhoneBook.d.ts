// Import the Person class
import { Person } from "./Person";
//Declare the PhoneBook class
export declare class PhoneBook {
  //Declare private properties for the ppl array and filepath string
  private ppl: Person[];
  private filePath: string;
  //Declare the constructor
  constructor();
  // Declare an add method that return a boolean
  add(argPerson: Person): boolean;
  // Declare a private property that return a boolean
  private validatePerson: boolean;
}
