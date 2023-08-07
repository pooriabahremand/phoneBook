export default class Exception extends Error {
  public code: number;
  constructor(status: number);
}
