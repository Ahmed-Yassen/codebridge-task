export interface EntityPagination {
  offset: number;
  limit: number;
  hasNext: boolean;
  nextOffset: number | undefined;
}
interface PaginatedEntityList<Entity> {
  data: Entity[];
  pagination?: EntityPagination;
}

export default PaginatedEntityList;
