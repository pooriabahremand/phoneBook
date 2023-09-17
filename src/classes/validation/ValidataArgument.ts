import formats from "../../utils/formats";
export default class ValidateArgument {
  private errorMsg: string =
    "the command that you wrote is invalid , you can choose between json , csv , xml and xlsx like: npm start xml. or you can command to convert one type to another like this : npm start xml json : with this format you command to convert the xml storage to json";
  constructor() {
    if (process.argv.length === 4) {
      if (
        formats.includes(process.argv[2]) &&
        formats.includes(process.argv[3])
      ) {
        return;
      } else {
        console.error(this.errorMsg);
        process.exit(1);
      }
    } else if (process.argv.length === 3) {
      if (formats.includes(process.argv[2])) {
        return;
      } else {
        console.error(this.errorMsg);
        process.exit(1);
      }
    } else {
      console.error(this.errorMsg);
      process.exit(1);
    }
  }
}
