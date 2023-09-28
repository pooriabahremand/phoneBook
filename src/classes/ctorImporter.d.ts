import DriverStorage from "../drivers/storageDriver";
import Person from "./Person";
import DirectoryFileValidator from "./validation/directoryFileValidator";
export default class ImporterCtor {
    storageDriver: DriverStorage;
    storageDriver2: DriverStorage;
    format: string;
    people: Person[];
    directoryCheck: DirectoryFileValidator;
    constructor(argDirectoryCheck: DirectoryFileValidator);
}
