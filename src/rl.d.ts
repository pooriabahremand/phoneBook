import * as readline from "readline";
import { Person } from "./interfaces";

export declare class App {
  private rl: readline.Interface;
  private person: Person;

  constructor();
  public run(): Promise<void>;
  private restart(): void;
}
