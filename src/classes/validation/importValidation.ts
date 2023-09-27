// Import necessary classes
import type Person from '../Person'
import { ValidationError } from '../Exception'

// Define the ConvertValidation class
export default class ImportValidation {
  private readonly originArray: Person[]
  private readonly destinationArray: Person[]

  // Constructor for the ConvertValidation class
  constructor (argOriginPeople: Person[], argDestinationPeople: Person[]) {
    // Initialize the originArray and destinationArray properties with the provided data
    this.originArray = argOriginPeople
    this.destinationArray = argDestinationPeople
  }

  // Method to validate that there are no duplicate phone numbers in the origin and destination arrays
  validation (): void {
    // For each person in the destination array
    this.destinationArray.forEach((destContact) => {
      // For each person in the origin array
      this.originArray.forEach((originContact) => {
        // If the phone numbers match, throw a ValidationError
        if (originContact.Number === destContact.Number) {
          throw new ValidationError(1, originContact)
        }
      })
    })
  }
}
