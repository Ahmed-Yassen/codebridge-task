import Dog from "../../../domain/entities/dog/dog";
import PaginatedEntityList from "../../../domain/interfaces/PaginatedEntityList";

export interface GetDogsQuery {
  offset?: number;
  limit?: number;
  orderBy?: {
    name?: string;
    color?: string;
    tail_length?: string;
    weight?: string;
  };
}

interface IDogRepository {
  createDog(dog: Dog): Promise<Dog>;
  getDogByName(name: string): Promise<Dog | null>;
  getDogs(query?: GetDogsQuery): Promise<PaginatedEntityList<Dog>>;
}

export default IDogRepository;
