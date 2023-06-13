import JSONBaseEntity from "../JSONBaseEntity";

export default interface JSONDog extends JSONBaseEntity {
  name: string;
  color: string;
  tail_length: number;
  weight: number;
}
