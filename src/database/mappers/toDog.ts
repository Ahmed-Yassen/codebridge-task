import Dog from "../../core/domain/entities/dog/dog";
import { DBDog } from "../models/DBDog";

export const toDog = (dbDog: DBDog): Dog => {
  const dog = new Dog({
    name: dbDog.name,
    color: dbDog.color,
    tail_length: dbDog.tail_length,
    weight: dbDog.weight,
  });
  dog.setId(dbDog.id);

  return dog;
};

export const toDogs = (dbDogs: DBDog[]): Dog[] => dbDogs.map(toDog);
