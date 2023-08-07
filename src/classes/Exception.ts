const messages: { [key: number]: string } = {
  0: "Invalid input, make sure you answered all questions",
  1: "Invalid input, this phone number belongs to another person",
};
export default class Exception extends Error {
  public code: number;
  constructor(status: number) {
    super(messages[status]);
    this.code = status;
  }
}
