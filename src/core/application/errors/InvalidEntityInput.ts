import { ErrorObject } from "ajv";
import { BaseError } from "./BaseError";

export class InvalidEntityInput extends BaseError {
  statusCode: number = 400;
  constructor(public errors: ErrorObject[]) {
    super();
    Object.setPrototypeOf(this, InvalidEntityInput.prototype);
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return this.errors.map((err) => {
      return {
        message: err.message || "Invalid Entity Input",
        field: err.instancePath,
      };
    });
  }
}
