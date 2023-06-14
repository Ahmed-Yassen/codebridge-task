import Dog from "../../../domain/entities/dog/dog";
import PaginatedEntityList from "../../../domain/interfaces/PaginatedEntityList";
import IDogRepository from "../../interfaces/repositories/IDogRepository";
import GetDogsUseCaseInput from "./input/GetDogsUseCaseInput";

export default class GetDogsUseCase {
  constructor(private dogRepository: IDogRepository) {}

  async exec(input: GetDogsUseCaseInput): Promise<PaginatedEntityList<Dog>> {
    return await this.dogRepository.getDogs(input.getQuery());
  }
}
