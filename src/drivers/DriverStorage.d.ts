import Person from "../classes/Person";
export interface DriverInterface {
    people: Person[];
    filePath: string;
    add(argPerson: Person): void;
    convert(argPeople: Person[]): void;
}
export default class DriverStorage {
    private format;
    driver: DriverInterface;
    people: Person[];
    constructor(argFormat: string | string[]);
    add(argPerson: Person): void;
    convert(argPeople: Person[]): void;
}
