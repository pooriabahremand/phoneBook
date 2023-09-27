/*
 * The `App` class serves as the main controller of the application. It is responsible for:
 * - Initializing several other classes (`ValidateArgument`, `DirectoryFileValidator`, `CommandLineParser`, and either `BuilderCtor` or `ImporterCtor`) during its construction.
 * - Parsing command line arguments to determine the duty of the application, which can be either "builder" or "importer".
 * - Running the application by calling the `run` method on an instance of the `Run` class, which was initialized with the configuration of either `BuilderCtor` or `ImporterCtor`.
 * - Restarting the application if its duty is "builder", by calling the `run` method again.
 */

// Importing required modules
import ValidateArgument from "../validation/ValidataArgument";
import CommandLineParser from "../CommandLineParser";
import DirectoryFileValidator from "../validation/directoryFileValidator";
import BuilderCtor from "../builderCtor";
import ImporterCtor from "../importerCtor";
import Run from "./run";

export class App {
  // Declaring private properties duty, directoryCheck, ctorConfig, runApp
  private duty: string;
  private directoryCheck: DirectoryFileValidator;
  private ctorConfig: BuilderCtor | ImporterCtor;
  private runApp: Run;
  // Constructor for the App class
  constructor() {
    // Creating a new instance of ValidateArgument for checking if the arguments that user entered are valid or not
    new ValidateArgument();
    // making a new instance of class DirectoryFileValidator for checking the existence of storages that we wanna use
    this.directoryCheck = new DirectoryFileValidator();
    // deciding on the goal of the whole application which can be build a phone book or import persons one storege to another
    this.duty = new CommandLineParser().cmdParser();
    // checking the value of the duty , if it is equal to builder ...
    if (this.duty === "builder") {
      // assigning the configuration of constructor to the builder mode
      this.ctorConfig = new BuilderCtor(this.directoryCheck);
    } else {
      // assigning the configuration of constructor to the importer mode
      this.ctorConfig = new ImporterCtor(this.directoryCheck);
    }
    // making a new instance of the Run class and passing the constuctor configuration to it
    this.runApp = new Run(this.ctorConfig);
  }

  // Public async method run that returns void
  public async run(): Promise<void> {
    // calling the run method on the instance of the Run class
    await this.runApp.run();
    if (this.duty === "builder") {
      // call the restart method if the duty of app is to build persons and add them to phonebook
      this.restart();
    }
  }
  // Private method restart that returns void
  private restart() {
    // Restarting the app by calling the run method again
    this.run();
  }
}
