import JsonDriver from "./JsonDriver";
import CsvDriver from "./CsvDriver";
import XmlDriver from "./XmlDriver";
import XlsxDriver from "./XlsxDriver";
export default class DriverStorage {
    private format;
    driver: JsonDriver | XmlDriver | XlsxDriver | CsvDriver;
    constructor(argFormat: string);
}
