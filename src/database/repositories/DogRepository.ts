import { Repository } from "sequelize-typescript";
import IDogRepository, {
  GetDogsQuery,
} from "../../core/application/interfaces/repositories/IDogRepository";
import Dog from "../../core/domain/entities/dog/dog";
import connection from "../db-connection";
import { DBDog } from "../models/DBDog";
import { toDog, toDogs } from "../mappers/toDog";
import PaginatedEntityList from "../../core/domain/interfaces/PaginatedEntityList";
import { Order, WhereOptions } from "sequelize";

export class DogRepository implements IDogRepository {
  private repo: Repository<DBDog>;

  constructor() {
    this.repo = connection.getRepository(DBDog);
  }

  async createDog(dog: Dog): Promise<Dog> {
    const dbDog = await this.repo.create({
      name: dog.getName(),
      color: dog.getColor(),
      tail_length: dog.getTailLength(),
      weight: dog.getWeight(),
    });
    dog.setId(dbDog.id);

    return dog;
  }

  async getDogByName(name: string): Promise<Dog | null> {
    if (!name) return null;

    const dbDog = await this.repo.findOne({ where: { name } });
    if (dbDog) return toDog(dbDog);

    return null;
  }

  async getDogs(
    query?: GetDogsQuery | undefined
  ): Promise<PaginatedEntityList<Dog>> {
    let _limit = 20;
    let _offset = 0;
    const order: Order = [];

    if (query?.limit) {
      _limit = query.limit > 50 ? 50 : query.limit;
    }
    if (query?.offset) {
      _offset = query.offset;
    }
    if (query?.orderBy) {
      if (query.orderBy.name) order.push(["name", query.orderBy.name]);
      if (query.orderBy.color) order.push(["color", query.orderBy.color]);
      if (query.orderBy.tail_length)
        order.push(["tail_length", query.orderBy.tail_length]);
      if (query.orderBy.weight) order.push(["name", query.orderBy.weight]);
    }

    const dbDogs = await this.repo.findAll({
      order,
      limit: _limit + 1, // (_limit + 1) to determine if it hasNext
      offset: _offset,
    });

    let _hasNext = false;

    if (dbDogs.length > _limit) {
      _hasNext = true;
      dbDogs.pop();
    }

    return {
      data: toDogs(dbDogs),
      pagination: {
        limit: _limit,
        offset: _offset,
        hasNext: _hasNext,
        nextOffset: _hasNext ? _offset + _limit : undefined,
      },
    };
  }
}
