// Define the Person class
export default class Person {
  // Declare properties for the full name, phone number and format
  fullName: string;
  Number: string;
  format: string | string[];

  // Define the constructor, which takes a full name, phone number and format as arguments
  constructor(
    argFullName: string,
    argNumber: string,
    argFormat: string | string[]
  ) {
    // Initialize the fullName, Number and format properties with the provided arguments
    this.fullName = argFullName;
    this.Number = argNumber;
    this.format = argFormat;
  }
}
