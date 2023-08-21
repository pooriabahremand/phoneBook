import Person from "./Person";

// Defining an object to store error messages
const messages: { [key: number]: string } = {
  0: "Invalid input, make sure you answered all questions",
  1: "Invalid input, this phone number belongs to another person",
  2: "invalid input, phone number most start with 0",
};

// Defining the Exception class
export default class Exception extends Error {
  // Constructor for the Exception class
  constructor(message: string) {
    // Calling the super constructor with the appropriate error message
    super(message);
  }
}

export class ValidationError extends Exception {
  public cause: Person;
  public name: string = "ValidationError";
  constructor(index: number, cause: Person) {
    super(messages[index]);
    this.cause = cause;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class InputError extends Exception {
  public name: string = "InputError";
  constructor(index: number) {
    super(messages[index]);
    Object.setPrototypeOf(this, InputError.prototype);
  }
}
