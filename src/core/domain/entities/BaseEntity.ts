import JSONBaseEntity from "./JSONBaseEntity";

export default abstract class BaseEntity {
  abstract toJSON(): JSONBaseEntity;
}
