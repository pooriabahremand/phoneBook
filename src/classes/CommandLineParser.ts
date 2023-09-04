export default class CommandLineParser {
  cmdParser(): string {
    if (process.argv.length === 3) {
      return "builder";
    } else {
      return "converter";
    }
  }
}
