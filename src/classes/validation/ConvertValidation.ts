// Import necessary classes
import Person from "../Person";
import { ValidationError } from "./../Exception";

// Define the ConvertValidation class
export default class ConvertValidation {
  private originArray: Person[];
  private destinationArray: Person[];

  // Constructor for the ConvertValidation class
  constructor(argPeople: Person[][]) {
    // Initialize the originArray and destinationArray properties with the provided data
    this.originArray = argPeople[0];
    this.destinationArray = argPeople[1];
  }

  // Method to validate that there are no duplicate phone numbers in the origin and destination arrays
  validation() {
    // For each person in the destination array
    this.destinationArray.map((destContact) => {
      // For each person in the origin array
      this.originArray.map((originContact) => {
        // If the phone numbers match, throw a ValidationError
        if (originContact.Number === destContact.Number) {
          throw new ValidationError(1, originContact);
        }
      });
    });
  }
}
