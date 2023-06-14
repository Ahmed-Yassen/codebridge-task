import { BadRequestError } from "../../../errors/BadRequestError";
import { GetDogsQuery } from "../../../interfaces/repositories/IDogRepository";

export default class GetQuotesUseCaseInput {
  private query: GetDogsQuery = {};

  constructor() {}

  setLimit(limit: string) {
    if (isNaN(+limit) || +limit < 0)
      throw new BadRequestError("limit should be a valid positive number");
    this.query.limit = +limit > 0 ? +limit : 0;
  }

  setOffset(offset: string) {
    if (isNaN(+offset) || +offset < 0)
      throw new BadRequestError("offset should be a valid positive number");
    this.query.offset = +offset > 0 ? +offset : 0;
  }

  setOrderByName(order = "") {
    if (!this.query.orderBy) this.query.orderBy = {};
    this.query.orderBy.name = order.toUpperCase() === "DESC" ? "DESC" : "ASC";
  }

  setOrderByColor(order = "") {
    if (!this.query.orderBy) this.query.orderBy = {};
    this.query.orderBy.color = order.toUpperCase() === "DESC" ? "DESC" : "ASC";
  }

  setOrderByTailLength(order = "") {
    if (!this.query.orderBy) this.query.orderBy = {};
    this.query.orderBy.tail_length =
      order.toUpperCase() === "DESC" ? "DESC" : "ASC";
  }

  setOrderByWeight(order = "") {
    if (!this.query.orderBy) this.query.orderBy = {};
    this.query.orderBy.weight = order.toUpperCase() === "DESC" ? "DESC" : "ASC";
  }

  getQuery(): GetDogsQuery {
    return this.query;
  }
}
