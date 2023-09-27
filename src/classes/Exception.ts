// Import the Person class
import type Person from './Person'

// Define an object to store error messages
const messages: Record<number, string> = {
  0: 'Invalid input, make sure you answered all questions',
  1: 'Invalid input, this phone number belongs to another person',
  2: 'invalid input, phone number most start with 0'
}

// Define the ValidationError class that extends the Exception class
export class ValidationError extends Error {
  public cause: Person
  public name: string = 'ValidationError'

  // Constructor for the ValidationError class
  constructor (index: number, cause: Person) {
    // Call the constructor of the Exception class with an error message from the messages object
    super(messages[index])

    // Store the Person object that caused the validation error
    this.cause = cause

    // Ensure the prototype is set correctly (necessary when extending built-in JavaScript classes)
    Object.setPrototypeOf(this, ValidationError.prototype)
  }
}

// Define the InputError class that extends the Exception class
export class InputError extends Error {
  public name: string = 'InputError'

  // Constructor for the InputError class
  constructor (index: number) {
    // Call the constructor of the Exception class with an error message from the messages object
    super(messages[index])

    // Ensure the prototype is set correctly (necessary when extending built-in JavaScript classes)
    Object.setPrototypeOf(this, InputError.prototype)
  }
}
