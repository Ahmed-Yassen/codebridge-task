import { JSONSchemaType } from "ajv";
import ajv from "../BaseValidator";

interface Dog {
  name: string;
  color: string;
  tail_length: number;
  weight: number;
}

const DogSchema: JSONSchemaType<Dog> = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 3,
      maxLength: 25,
    },
    color: {
      type: "string",
      minLength: 3,
      maxLength: 35,
    },
    tail_length: {
      type: "number",
      minimum: 1,
    },
    weight: {
      type: "number",
      minimum: 1,
    },
  },
  required: ["name", "color", "tail_length", "weight"],
  additionalProperties: false,
  errorMessage: {
    properties: {
      name: "dog's name should be more than 3 characters and less than 25 characters",
      color:
        "dog's color should be more than 3 characters and less than 35 characters",
      tail_length: "dog's tail_length should be a valid positive number",
      weight: "dog's weight should be a valid positive number",
    },
  },
};

export const dogValidator = ajv.compile(DogSchema);
