import formats from "../../utils/formats";
export default class ValidateArgument {
  private errorMsg: string =
    "the command that you wrote is invalid , you can choose between json , csv , xml and xlsx like: npm start xml";
  constructor() {
    if (process.argv.length > 3) {
      console.error(this.errorMsg);
      process.exit(1);
    } else if (!formats.includes(process.argv[2])) {
      console.error(this.errorMsg);
      process.exit(1);
    }
  }
}
