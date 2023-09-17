import Person from "../Person";
import { ValidationError } from "./../Exception";

export default class ConvertValidation {
  private originArray: Person[];
  private destinationArray: Person[];
  constructor(argPeople: Person[][]) {
    this.originArray = argPeople[0];
    this.destinationArray = argPeople[1];
  }

  validation() {
    this.destinationArray.map((destContact) => {
      this.originArray.map((originContact) => {
        if (originContact.Number === destContact.Number) {
          throw new ValidationError(1, originContact);
        }
      });
    });
  }
}
