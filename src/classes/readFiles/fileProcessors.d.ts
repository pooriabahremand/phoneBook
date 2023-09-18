import Person from "../Person";
export default class FileProcessor {
    format: string[];
    filePath1: string;
    filePath2: string;
    constructor(argFormat: string[]);
    private existanceChecker;
    processFiles(): Person[][];
}
