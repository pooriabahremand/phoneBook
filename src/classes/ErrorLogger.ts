// Import necessary classes
import { ValidationError, InputError } from "./Exception";

// Define the ErrorLogger class
export default class ErrorLogger {
  private error: ValidationError | InputError;

  // Constructor for the ErrorLogger class
  constructor(argError: Error) {
    // Initialize the error property with the provided error
    this.error = argError;

    // Check the type of the error and log appropriate messages
    if (this.error instanceof ValidationError) {
      // Log the name of the error
      console.error((this.error as ValidationError).name);

      // Log the error message
      console.error(`Error message : ${(this.error as ValidationError).message}`);

      // Log a custom message for validation errors
      console.error("contact with the same phone number ");

      // Log the Person object that caused the validation error
      console.error((this.error as ValidationError).cause);
    } else if (this.error instanceof InputError) {
      // Log the name of the error
      console.error((this.error as InputError).name);

      // Log the error message
      console.error(`Error message : ${(this.error as InputError).message}`);
    } else {
      // If the error is not a ValidationError or InputError, log the entire error object
      console.log(this.error);
    }
  }
}
