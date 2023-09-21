import Person from "./../classes/Person";
import { DriverInterface } from "./DriverStorage";
export default class JsonDriver implements DriverInterface {
    people: Person[];
    filePath: string;
    constructor();
    read(): Person[];
    add(argPerson: Person): void;
    import(argPeople: Person[]): void;
}
