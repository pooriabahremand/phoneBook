import { ValidationError, InputError } from "./Exception";

export default class ErrorLogger {
  private error: ValidationError | InputError;
  constructor(argError: Error) {
    this.error = argError;
    // Checking if error is an instance of ValidationError or InputError and logging appropriate error messages
    if (this.error instanceof ValidationError) {
      console.error((this.error as ValidationError).name);
      console.error(
        `Error message : ${(this.error as ValidationError).message}`
      );
      console.error("contact with the same phone number ");
      console.error((this.error as ValidationError).cause);
    } else if (this.error instanceof InputError) {
      console.error((this.error as InputError).name);
      console.error(`Error message : ${(this.error as InputError).message}`);
    } else {
      console.log(this.error);
    }
  }
}
