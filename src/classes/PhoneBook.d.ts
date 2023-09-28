import DriverStorage from "../drivers/storageDriver";
import Person from "./Person";
export declare class PhoneBook {
    private storageDriver;
    constructor(argStorageDriver: DriverStorage);
    add(argPerson: Person): void;
}
