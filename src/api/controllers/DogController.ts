import { Request, Response } from "express";
import { CreateDogUseCaseInput } from "../../core/application/use-cases/dog/input/CreateDogUseCaseInput";
import { CreateDogUseCase } from "../../core/application/use-cases/dog/CreateDogUseCase";
import { DogRepository } from "../../database/repositories/DogRepository";

const dogRepository = new DogRepository();

class DogController {
  async createDog(req: Request, res: Response) {
    const { name, color, tail_length, weight } = req.body;

    const input = new CreateDogUseCaseInput({
      name,
      color,
      tail_length,
      weight,
    });

    const createdDog = await new CreateDogUseCase(dogRepository).exec(input);

    res.status(201).json(createdDog.toJSON());
  }
}

const dogController = new DogController();
export default dogController;
