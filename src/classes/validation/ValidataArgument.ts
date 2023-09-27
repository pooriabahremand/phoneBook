// Import necessary modules
import formats from '../../utils/formats'

// Define the ValidateArgument class
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class ValidateArgument {
  // Define an error message for invalid commands
  private static readonly errorMsg: string =
    'The command that you wrote is invalid. You can choose between json, csv, xml, and xlsx like: npm start xml. Or you can command to convert one type to another like this: npm start xml json. With this format, you command to convert the xml storage to json.'

  // Static method for validation
  public static validate (): void {
    // If there are four command line arguments (including the command to run the script)
    if (process.argv.length === 4) {
      // If both the third and fourth arguments are not included in the formats array, log the error message and exit the process with a failure code
      if (
        !formats.includes(process.argv[2]) ||
        !formats.includes(process.argv[3])
      ) {
        console.error(ValidateArgument.errorMsg)
        process.exit(1)
      }
    } else if (process.argv.length === 3) {
      // If the third argument is not included in the formats array, log the error message and exit the process with a failure code
      if (!formats.includes(process.argv[2])) {
        console.error(ValidateArgument.errorMsg)
        process.exit(1)
      }
    } else {
      // If there are not three or four command line arguments, log the error message and exit the process with a failure code
      console.error(ValidateArgument.errorMsg)
      process.exit(1)
    }
  }
}
