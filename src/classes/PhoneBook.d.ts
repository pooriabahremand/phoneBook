import Person from "./Person";
export declare class PhoneBook {
    private people;
    private filePath;
    private format;
    private registery;
    constructor(formatArg: string);
    add(argPerson: Person): void;
}
