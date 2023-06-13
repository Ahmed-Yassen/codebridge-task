import { Repository } from "sequelize-typescript";
import IDogRepository from "../../core/application/interfaces/repositories/IDogRepository";
import Dog from "../../core/domain/entities/dog/dog";
import connection from "../db-connection";
import { DBDog } from "../models/DBDog";
import { toDog } from "../mappers/toDog";

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
}
