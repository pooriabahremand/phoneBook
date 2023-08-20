export default class Exception extends Error {
    code: number;
    constructor(status: number);
}
