import BaseError from "./BaseError";

export default class InvalidEntityInput extends BaseError {
  name = "InvalidEntityInput";
  message: string;
  constructor(message = "Invalid entity input") {
    super(message);
    this.message = message;
  }
}
