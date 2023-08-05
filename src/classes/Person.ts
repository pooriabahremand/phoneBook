// Define the Person class
export default class Person {
  // Declare properties for the full name and phone number
  fullName: string;
  Number: string;

  // Define the constructor, which takes a full name and phone number as arguments
  constructor(argFullName: string, argNumber: string) {
    // Initialize the fullName and Number properties with the provided arguments
    this.fullName = argFullName;
    this.Number = argNumber;
  }
}
