// importing required modules
import ErrorLogger from "../ErrorLogger";
import Person from "../Person";
import BuilderCtor from "../builderCtor";
import ImporterCtor from "../importerCtor";
import ImportValidation from "../validation/importValidation";
import ValidatePerson from "../validation/validatePerson";

// creating and exporting Run class
export default class Run {
  //difining the private ctorConfig that can be of type BuilderCtor or ImporterCtor
  private ctorConfig: BuilderCtor | ImporterCtor;
  // constuctor for the Run class
  constructor(argCtorConfig: BuilderCtor | ImporterCtor) {
    this.ctorConfig = argCtorConfig;
  }

  public async run() {
    //checking that if ctorConfig is an instance of BuilderCtor or not , if yes ...
    if (this.ctorConfig instanceof BuilderCtor) {
      // Getting user input for full name and phone number using the getInput method and assigning them to tempFullName and tempPhoneNumebr respectively
      let tempFullName = await this.getInput("what is your full name?");
      let tempPhoneNumebr = await this.getInput("what is your phone number?");

      // Creating a new instance of Person with tempFullName, tempPhoneNumebr, and this.format as arguments and assigning it to tempPerson
      let tempPerson = new Person(
        tempFullName,
        tempPhoneNumebr,
        this.ctorConfig.format
      );
      // start to add the contact to the phonebook inside of a try catch block to catch and handle errors
      try {
        //validating input with people
        new ValidatePerson(this.ctorConfig.people, tempPerson).validation();
        // Adding tempPerson to this.phoneBook using the add method
        this.ctorConfig.phoneBook.add(tempPerson);
        console.log("the contact has been successfully added to phone book");
      } catch (error) {
        // making a new instance of ErrorLogger class
        new ErrorLogger(error as Error);
      }
      // if ctorConfig is not an instance of Builder ...
    } else {
      //trying to convert people of first format combined with people people of second format to the destination with the help of calling import method on storageDriver inside of try catch to handle and catch errors
      try {
        // validate to check if there are any similarity between peoples or not
        new ImportValidation(
          this.ctorConfig.storageDriver2.driver.read(),
          this.ctorConfig.storageDriver.driver.read()
        ).validation();

        //import persons of the origin format to the destination format
        this.ctorConfig.storageDriver.driver.import([
          ...this.ctorConfig.storageDriver2.driver.read(),
          ...this.ctorConfig.storageDriver.driver.read(),
        ]);

        console.log("the convertion has been successfuly completed");
      } catch (error) {
        // making a new instance of ErrorLogger class
        new ErrorLogger(error as Error);
      }
    }
  }
  // Private method getInput that takes a string message as argument and returns a Promise that resolves with a string value
  private getInput(message: string): Promise<string> {
    return new Promise((resolve) => {
      if (this.ctorConfig instanceof BuilderCtor) {
        // Using the question method of this.readLine to get user input and resolving the Promise with the input value
        this.ctorConfig.readLine.question(message, (input: string) => {
          resolve(input);
        });
      }
    });
  }
}
