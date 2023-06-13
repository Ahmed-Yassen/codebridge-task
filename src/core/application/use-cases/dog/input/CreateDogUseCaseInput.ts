import { BadRequestError } from "../../../errors/BadRequestError";

interface CreateDogUseCaseInputData {
  name: string;
  color: string;
  tail_length: number;
  weight: number;
}

export class CreateDogUseCaseInput {
  private name: string;
  private color: string;
  private tail_length: number;
  private weight: number;

  constructor(input: CreateDogUseCaseInputData) {
    if (!input.name) throw new BadRequestError("Dog's name must be submitted");
    if (!input.color)
      throw new BadRequestError("Dog's color must be submitted");
    if (!input.tail_length)
      throw new BadRequestError("Dog's tail_length must be submitted");
    if (!input.weight)
      throw new BadRequestError("Dog's weight must be submitted");

    this.name = input.name;
    this.color = input.color;
    this.tail_length = input.tail_length;
    this.weight = input.weight;
  }

  getName() {
    return this.name;
  }

  getColor() {
    return this.color;
  }

  getTailLength() {
    return this.tail_length;
  }

  getWeight() {
    return this.weight;
  }
}
