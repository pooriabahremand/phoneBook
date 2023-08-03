import { Person } from "./Person";
export declare class PhoneBook {
    ppl: Person[];
    filePath: string;
    private messages;
    constructor();
    add(argPerson: Person): string;
    private validatePerson;
}
