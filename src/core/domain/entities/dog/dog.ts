import { InvalidEntityInput } from "../../../application/errors/InvalidEntityInput";
import BaseEntity from "../BaseEntity";
import JSONBaseEntity from "../JSONBaseEntity";
import { dogValidator } from "./dogValidator";

export default class Dog extends BaseEntity {
  private dogId!: number;
  private name: string;
  private color: string;
  private tail_length: number;
  private weight: number;

  constructor(input: {
    name: string;
    color: string;
    tail_length: number;
    weight: number;
  }) {
    super();

    const isValidDog = dogValidator({ ...input });
    if (isValidDog) {
      this.name = input.name;
      this.color = input.color;
      this.tail_length = input.tail_length;
      this.weight = input.weight;
    } else {
      throw new InvalidEntityInput(dogValidator.errors!);
    }
  }

  setId(id: number) {
    if (id > 0) this.dogId = id;
  }
  getId() {
    return this.dogId;
  }

  setName(name: string) {
    if (name.length >= 3 && name.length <= 25) this.name = name;
  }
  getName() {
    return this.name;
  }

  setColor(color: string) {
    if (color.length >= 3 && color.length <= 35) this.color = color;
  }
  getColor() {
    return this.color;
  }

  setTailLength(tail_length: number) {
    if (tail_length >= 1) this.tail_length = tail_length;
  }
  getTailLength() {
    return this.tail_length;
  }

  setWeight(weight: number) {
    if (weight >= 1) this.weight = weight;
  }
  getWeight() {
    return this.weight;
  }

  toJSON(): JSONBaseEntity {
    return {
      name: this.name,
      color: this.color,
      tail_length: this.tail_length,
      weight: this.weight,
    };
  }
}
