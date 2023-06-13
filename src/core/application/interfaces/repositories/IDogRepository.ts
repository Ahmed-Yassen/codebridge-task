import Dog from "../../../domain/entities/dog/dog";

interface IDogRepository {
  createDog(dog: Dog): Promise<Dog>;
  getDogByName(name: string): Promise<Dog | null>;
}

export default IDogRepository;
