import Person from "./Person";
export default class ValidatePerson {
    private people;
    private filteredPeople;
    private invalidInput;
    constructor(argPeople: Person[], argPerson: Person);
    validation(): number;
}
