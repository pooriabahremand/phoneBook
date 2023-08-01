// Import the readline module and the Person class
import * as readline from "readline";
import { Person } from "./classes/Person";

// Declare the App class
export declare class App {
  // Declare private properties for the readline interface and a Person object
  private rl: readline.Interface;
  private person: Person;

  // Declare the constructor
  constructor();
  // Declare the run method, which returns a Promise that resolves with void
  public run(): Promise<void>;
  // Declare the restart method, which returns void
  private restart(): void;
}
