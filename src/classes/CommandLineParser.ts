// Define the CommandLineParser class
export default class CommandLineParser {
  // Method to parse command line arguments
  cmdParser(): string {
    // If there are exactly three command line arguments (including the command to run the script),
    // return "builder"
    if (process.argv.length === 3) {
      return "builder";
    } else {
      // If there are more or less than three command line arguments, return "converter"
      return "converter";
    }
  }
}
