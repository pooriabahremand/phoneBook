import Person from "./Person";
export default class Exception extends Error {
    constructor(message: string);
}
export declare class ValidationError extends Exception {
    cause: Person;
    name: string;
    constructor(index: number, cause: Person);
}
export declare class InputError extends Exception {
    name: string;
    constructor(index: number);
}
