/*
 * The `Run` class is responsible for executing the main logic of the application. It:
 * - Initializes with an argument of type `BuilderCtor` or `ImporterCtor`.
 * - Executes the main logic of the application in its `run` method. If `ctorConfig` is an instance of `BuilderCtor`, it gets user input, creates a new instance of `Person`, validates the person, and adds them to the phone book. If `ctorConfig` is not an instance of `BuilderCtor`, it validates and imports data from one storage format to another.
 * - Uses the private method `getInput` to get user input when the application's duty is "builder".
 */

// importing required modules
import ErrorLogger from "../ErrorLogger";
import Person from "../Person";
import BuilderCtor from "../ctorBuilder";
import type ImporterCtor from "../ctorImporter";
import ImportValidation from "../validation/importValidatior";
import ValidatePerson from "../validation/personValidator";

// creating and exporting Run class
export default class Run {
  // difining the private ctorConfig that can be of type BuilderCtor or ImporterCtor
  private readonly ctorConfig: BuilderCtor | ImporterCtor;
  private readonly errorLog: ErrorLogger;
  // constuctor for the Run class
  constructor(argCtorConfig: BuilderCtor | ImporterCtor) {
    this.ctorConfig = argCtorConfig;
    this.errorLog = new ErrorLogger();
  }

  public async run(): Promise<void> {
    // checking that if ctorConfig is an instance of BuilderCtor or not , if yes ...
    if (this.ctorConfig instanceof BuilderCtor) {
      const builderCtor = this.ctorConfig;
      // Getting user input for full name and phone number using the getInput method and assigning them to tempFullName and tempPhoneNumebr respectively
      const tempFullName = await this.getInput("what is your full name?");
      const tempPhoneNumebr = await this.getInput("what is your phone number?");

      // Creating a new instance of Person with tempFullName, tempPhoneNumebr, and this.format as arguments and assigning it to tempPerson
      const tempPerson = new Person(
        tempFullName,
        tempPhoneNumebr,
        builderCtor.format
      );

      // validating input with people
       builderCtor
        .readPeople()
        .then((content) => {
          new ValidatePerson(content, tempPerson).validation();
        })
        .then(() => {
          // Adding tempPerson to this.phoneBook using the add method
          builderCtor.phoneBook.add(tempPerson);
        })
        .then(() => {
          console.log("the contact has been successfully added to phone book");
        })
        .catch((error) => {
          // making a new instance of ErrorLogger class
          this.errorLog.ErrorHandler(error as Error);
        });

      // if ctorConfig is not an instance of Builder ...
    } else {
      const importerCtor = this.ctorConfig;
      // validate to check if there are any similarity between peoples or not
       importerCtor
        .readPeople()
        .then(([firstPeople, secondPeople]) => {
          new ImportValidation(firstPeople, secondPeople).validation();
          return [firstPeople, secondPeople];
        })
        .then(([firstPeople, secondPeople]) => {
          // import persons of the origin format to the destination format
          importerCtor.storageDriver.driver.import([
            ...firstPeople,
            ...secondPeople,
          ]);
        })
        .then(() => {
          console.log("the convertion has been successfuly completed");
        })
        .catch((error) => {
          this.errorLog.ErrorHandler(error as Error);
        });
    }
  }

  // Private method getInput that takes a string message as argument and returns a Promise that resolves with a string value
  private async getInput(message: string): Promise<string> {
    return await new Promise((resolve) => {
      if (this.ctorConfig instanceof BuilderCtor) {
        // Using the question method of this.readLine to get user input and resolving the Promise with the input value
        this.ctorConfig.readLine.question(message, (input: string) => {
          resolve(input);
        });
      }
    });
  }
}
