import Person from "./../classes/Person";
import { DriverInterface } from "./DriverStorage";
export default class XmlDriver implements DriverInterface {
    people: Person[];
    filePath: string;
    constructor();
    add(argPerson: Person): void;
    read(): Person[];
    import(argPeople: Person[]): void;
}
