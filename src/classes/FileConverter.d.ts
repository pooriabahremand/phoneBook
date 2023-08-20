import Person from "./Person";
export default class FileConverter {
    private filePath;
    constructor(filePathArg: string);
    readJson(): Person[];
    readCsv(): Person[];
    readXml(): Person[];
    readXlsx(): Person[];
    writeCsv(argPeople: Person[]): void;
    writeXml(argPeople: Person[]): void;
    writeXlsx(argPeople: Person[]): void;
}
