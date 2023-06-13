import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError {
  statusCode = 400;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: this.message || "Bad request",
      },
    ];
  }
}
