import Person from "./../classes/Person";
import { DriverInterface } from "./DriverStorage";
export default class JsonDriver implements DriverInterface {
    people: Person[];
    filePath: string;
    constructor(argPeople: Person[]);
    add(argPerson: Person): void;
    convert(argPeople: Person[]): void;
}
