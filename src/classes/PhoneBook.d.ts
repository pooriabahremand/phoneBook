import DriverStorage from "../drivers/DriverStorage";
import Person from "./Person";
export declare class PhoneBook {
    private storageDriver;
    constructor(argStorageDriver: DriverStorage);
    add(argPerson: Person): void;
}
