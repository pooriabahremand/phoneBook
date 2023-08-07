import Person from "./Person";
import Exception from "./Exception";

export default class ValidatePerson {
  private people: Person[];
  private filteredPeople: Person[];
  private invalidInput: String[];

  constructor(argPeople: Person[], argPerson: Person) {
    this.people = argPeople;
    this.filteredPeople = this.people.filter((contact: Person) => {
      return contact.Number === argPerson.Number;
    });
    this.invalidInput = Object.values(argPerson).filter((item) => {
      return item.trim() === "";
    });
  }

  public validation(): boolean {
    if (this.invalidInput.length > 0) {
      throw new Exception(0);
    } else {
      if (this.filteredPeople.length > 0) {
        throw new Exception(1);
      } else {
        return true;
      }
    }
  }
}
