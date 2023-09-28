import Person from "../classes/Person";
export interface DriverInterface {
    people: Person[];
    filePath: string;
    read(): Person[];
    add(argPerson: Person): void;
    import(argPeople: Person[]): void;
}
export type ValidTypes = "json" | "csv" | "xml" | "xlsx";
export default class DriverStorage {
    private format;
    driver: DriverInterface;
    constructor(argFormat: ValidTypes);
}
