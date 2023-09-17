// Importing required modules
import Person from "../Person";
import { ValidationError, InputError } from "../Exception";

// Defining the ValidatePerson class
export default class ValidatePerson {
  private people: Person[] = [];
  private filteredPeople: Person[] = [];
  private invalidInput: String[] = [];
  private startsWithZero: boolean = true;

  // Constructor for the ValidatePerson class
  constructor(argPeople: Person[], argPerson: Person) {
    this.people = argPeople;
    // Filtering the people array to find people with the same phone number as argPerson
    this.filteredPeople = this.people.filter((contact: Person) => {
      return contact.Number === argPerson?.Number;
    });

    // Filtering the values of argPerson to find any empty values
    this.invalidInput = Object.values(argPerson).filter((item) => {
      return item.trim() === "";
    });

    // Checking if the phone number of argPerson starts with 0
    this.startsWithZero = argPerson.Number.startsWith("0");
  }

  // Method to validate a person
  public validation(): boolean {
    // Throwing an exception if there are any empty values in argPerson
    if (this.invalidInput.length > 0) {
      throw new InputError(0);
    } else if (this.filteredPeople.length > 0) {
      // Throwing an exception if there is already a person with the same phone number as argPerson
      // console.log(this.filteredPeople[0]);
      throw new ValidationError(1, this.filteredPeople[0]);
    } else if (!this.startsWithZero) {
      // Throwing an exception if the phone number of argPerson doesn't start with 0
      throw new InputError(2);
    } else {
      // Returning true if all validations pass
      return true;
    }
  }
}
