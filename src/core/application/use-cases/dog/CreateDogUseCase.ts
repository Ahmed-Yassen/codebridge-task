import Dog from "../../../domain/entities/dog/dog";
import { BadRequestError } from "../../errors/BadRequestError";
import IDogRepository from "../../interfaces/repositories/IDogRepository";
import { CreateDogUseCaseInput } from "./input/CreateDogUseCaseInput";

export class CreateDogUseCase {
  constructor(private dogRepository: IDogRepository) {}

  async exec(input: CreateDogUseCaseInput): Promise<Dog> {
    const dogExists = await this.dogRepository.getDogByName(input.getName());
    if (dogExists) throw new BadRequestError("This name is already taken");

    const newDog = new Dog({
      name: input.getName(),
      color: input.getColor(),
      tail_length: input.getTailLength(),
      weight: input.getWeight(),
    });

    return await this.dogRepository.createDog(newDog);
  }
}
