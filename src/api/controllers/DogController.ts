import { Request, Response } from "express";
import { CreateDogUseCaseInput } from "../../core/application/use-cases/dog/input/CreateDogUseCaseInput";
import { CreateDogUseCase } from "../../core/application/use-cases/dog/CreateDogUseCase";
import { DogRepository } from "../../database/repositories/DogRepository";
import GetDogsUseCase from "../../core/application/use-cases/dog/GetDogsUseCase";
import GetDogsUseCaseInput from "../../core/application/use-cases/dog/input/GetDogsUseCaseInput";

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

  async getDogs(
    req: Request<
      unknown,
      unknown,
      undefined,
      {
        limit?: string;
        offset?: string;
        orderBy?: {
          name?: string;
          color?: string;
          tail_length?: string;
          weight?: string;
        };
      }
    >,
    res: Response
  ) {
    const getDogsUseCase = new GetDogsUseCase(dogRepository);
    const getDogsUseCaseInput = new GetDogsUseCaseInput();

    if (req.query.limit) getDogsUseCaseInput.setLimit(req.query.limit);
    if (req.query.offset) getDogsUseCaseInput.setOffset(req.query.offset);
    if (req.query.orderBy) {
      const { name, color, tail_length, weight } = req.query.orderBy;
      if (name) getDogsUseCaseInput.setOrderByName(name);
      if (color) getDogsUseCaseInput.setOrderByColor(color);
      if (tail_length) getDogsUseCaseInput.setOrderByTailLength(tail_length);
      if (weight) getDogsUseCaseInput.setOrderByWeight(weight);
    }

    const paginatedDogs = await getDogsUseCase.exec(getDogsUseCaseInput);

    res.json({
      data: paginatedDogs.data.map((dog) => dog.toJSON()),
      pagination: paginatedDogs.pagination,
    });
  }
}

const dogController = new DogController();
export default dogController;
