// Import necessary modules and types
import path from "path";
import type Person from "../classes/Person";
import { type DriverInterface } from "./storageDriver";
import Database from "better-sqlite3";

// Define the SqliteDriver class
export default class SqliteDriver implements DriverInterface {
  // Declare class properties
  public people: Person[];
  public filePath: string;
  public db: any;

  // Constructor for the SqliteDriver class
  constructor() {
    // Set the file path for the SQLite database
    this.filePath = path.join("storage", "phoneBook.sqlite");
    // Initialize the people array
    this.people = [];
    // Create a new SQLite database connection
    this.db = new Database(this.filePath);

    // Check if the phoneBook table exists in the database
    const tableExists = this.db
      .prepare("SELECT name FROM sqlite_master WHERE type='table'")
      .get();
    // If the table does not exist, create it
    if (tableExists === undefined) {
      this.db
        .prepare(
          `CREATE TABLE IF NOT EXISTS phoneBook (
        ID INTEGER PRIMARY KEY,
        fullName TEXT,
        Number TEXT,
        format TEXT
      )`
        )
        .run();
    }
  }

  // Method to read all records from the phoneBook table
  public read(): Promise<Person[]> {
    return new Promise((resolve, reject) => {
      try {
        // Prepare and execute the SQL query
        const rows = this.db.prepare("SELECT * FROM phoneBook").all();
        // Resolve the promise with the result of the query
        resolve(rows);
      } catch (error) {
        // If an error occurred, reject the promise with the error
        reject(error);
      }
    });
  }

  // Method to add a new record to the phoneBook table
  public add(argPerson: Person): Promise<void> {
    return new Promise((resolve) => {
      // Start an exclusive transaction
      this.db.exec("BEGIN EXCLUSIVE");
      try {
        // Prepare the data for insertion
        const data: string[] = [
          argPerson.fullName,
          argPerson.Number,
          argPerson.format,
        ];
        // Prepare and execute the SQL query
        this.db
          .prepare(
            "INSERT INTO phoneBook(fullName, Number, format) VALUES(?, ?, ?)"
          )
          .run(data);
        // Commit the transaction if no errors occurred
        this.db.exec("COMMIT");
      } catch (err) {
        // Log any errors that occurred
        console.error(err);
        // Rollback the transaction in case of errors
        this.db.exec("ROLLBACK");
      }
      resolve();
    });
  }

  // Method to import multiple records into the phoneBook table
  public import(argPeople: Person[]): Promise<void> {
    return new Promise((resolve) => {
      // Start an exclusive transaction
      this.db.exec("BEGIN EXCLUSIVE");
      try {
        // Prepare the SQL query for insertion
        const insert = this.db.prepare(
          "INSERT INTO phoneBook (fullName, Number, format) VALUES (?, ?, ?)"
        );
        // Define a transaction to insert multiple records
        const insertMany = this.db.transaction((people: Person[]) => {
          for (const person of people) {
            insert.run(person.fullName, person.Number, person.format);
          }
        });

        // Execute the transaction with the provided data
        insertMany(argPeople);
        // Commit the transaction if no errors occurred
        this.db.exec("COMMIT");
      } catch (err) {
        // Log any errors that occurred
        console.error(err);
        // Rollback the transaction in case of errors
        this.db.exec("ROLLBACK");
      }
      resolve();
    });
  }
}
