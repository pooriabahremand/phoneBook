import Person from "../Person";
export default class ValidatePerson {
  private people;
  private filteredPeople;
  private invalidInput;
  private startsWithZero;
  constructor(argPeople: Person[], argPerson: Person);
  validation(): boolean;
}
