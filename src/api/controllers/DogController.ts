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
        attribute?: string;
        order?: string;
      }
    >,
    res: Response
  ) {
    const getDogsUseCase = new GetDogsUseCase(dogRepository);
    const getDogsUseCaseInput = new GetDogsUseCaseInput();
    let { limit, offset, attribute, order } = req.query;

    if (limit) getDogsUseCaseInput.setLimit(limit);
    if (offset) getDogsUseCaseInput.setOffset(offset);
    if (attribute) {
      attribute = attribute.toLowerCase();
      if (attribute === "name") getDogsUseCaseInput.setOrderByName(order);
      if (attribute === "color") getDogsUseCaseInput.setOrderByColor(order);
      if (attribute === "tail_length")
        getDogsUseCaseInput.setOrderByTailLength(order);
      if (attribute === "weight") getDogsUseCaseInput.setOrderByWeight(order);
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
