// import { MongoClient } from 'mongodb'
import { exec, spawn } from "child_process";
import { AsyncDriverInterface } from "./storageDriver";
import Person from "../classes/Person";
import { MongoClient, type Db } from "mongodb";

export default class MongoDriver implements AsyncDriverInterface {
  public people: Person[] = [];
  public readonly filePath: string = "mongodb://127.0.0.1:27017";
  private db: Db | undefined;
  private collection: string = "Phonebook";
  private isConnected: boolean = false;
  constructor() {
    // const mongodProcess = spawn("mongod");
    // exec("mongod", (error) => {
    //   if ((error as Error) !== null) {
    //     // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    //     console.error(`exec error: ${error}`);
    //   } else {
    //     console.log("the server has been created");
    //   }
    // });
    // setTimeout(() => {
    //   mongodProcess.kill()
    //   console.log('the server has been terminated')
    // }, 18000)
  }

  public connect(): Promise<void> {
    if (this.isConnected) {
      return new Promise((resolve) => {
        resolve();
      });
    } else {
      return MongoClient.connect(this.filePath).then((client) => {
        this.db = client.db("PhoneBook");
        console.log("connection has been stablished succsessfully");
        this.isConnected = true;
      });
    }
  }

  public read(): Promise<Person[]> {
    const cursor = (this.db as Db).collection(this.collection).find();
    return cursor
      .toArray()
      .then((documents) => {
        return documents.map((document) => {
          return new Person(
            document.fullName,
            document.Number,
            document.format
          );
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  public add(argPerson: Person): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.db !== undefined) {
        this.db
          .collection(this.collection)
          .insertOne(argPerson)
          .then(() => {
            resolve();
          })
          .catch((err) => {
            throw reject(err);
          });
      }
    });
  }

  public import(argPeople: Person[]): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.db !== undefined) {
        this.db
          .collection(this.collection)
          .insertMany(argPeople)
          .then(() => {
            resolve();
          })
          .catch((error: Error) => {
            reject(error);
          });
      }
    });
  }
}
