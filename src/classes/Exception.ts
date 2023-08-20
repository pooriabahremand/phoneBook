// Defining an object to store error messages
const messages: { [key: number]: string } = {
  0: "Invalid input, make sure you answered all questions",
  1: "Invalid input, this phone number belongs to another person",
  2: "invalid input, phone number most start with 0",
};

// Defining the Exception class
export default class Exception extends Error {
  public code: number;

  // Constructor for the Exception class
  constructor(status: number) {
    // Calling the super constructor with the appropriate error message
    super(messages[status]);
    this.code = status;
  }
}
