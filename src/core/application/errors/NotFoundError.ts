import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
  statusCode: number = 404;

  constructor(public resource?: string) {
    super("Not found");

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: `${this.resource} not found` || "Not found" }];
  }
}
