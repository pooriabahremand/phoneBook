import Person from "./Person";
export declare class PhoneBook {
    private format;
    private storageDriver;
    constructor(formatArg: string);
    add(argPerson: Person): void;
}
