// Import necessary classes
import { ValidationError, InputError } from './Exception'

// Define the ErrorLogger class
export default class ErrorLogger {
  public ErrorHandler (argError: Error): void {
    // Check the type of the error and log appropriate messages
    if (argError instanceof ValidationError) {
      // Log the name of the error
      console.error((argError).name)

      // Log the error message
      console.error(`Error message : ${(argError).message}`)

      // Log a custom message for validation errors
      console.error('contact with the same phone number ')

      // Log the Person object that caused the validation error
      console.error((argError).cause)
    } else if (argError instanceof InputError) {
      // Log the name of the error
      console.error((argError).name)

      // Log the error message
      console.error(`Error message : ${(argError).message}`)
    } else {
      // If the error is not a ValidationError or InputError, log the entire error object
      console.log(argError)
    }
  }
}
