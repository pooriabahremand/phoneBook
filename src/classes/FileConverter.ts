import DriverStorage, { DriverInterface } from "../drivers/DriverStorage";
import ValidatePerson from "./validation/validatePerson";
import Person from "./Person";
export default class FileConverter {
  private originPeople: Person[];
  private destinationPeople: Person[];
  private destinationDriver: DriverInterface;
  private output: Person[] = [];

  constructor() {
    this.originPeople = new DriverStorage(process.argv[2]).driver.people;
    this.destinationDriver = new DriverStorage(process.argv[3]).driver;
    this.destinationPeople = this.destinationDriver.people;
  }

  convert() {
    new ValidatePerson().convertValidation(
      this.originPeople,
      this.destinationPeople
    );
    this.output = [...this.originPeople, ...this.destinationPeople];
    this.destinationDriver.add(this.output);
  }
}
