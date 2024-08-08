import { Knex } from "knex";
import { URL } from "../types/db";
import client from "./client";
import { build } from "joi";

export class URLService {
  url: Knex.QueryBuilder<URL>;
  filter: Knex.QueryBuilder<any> | null;

  constructor() {
    this.url = client.table("URL");
    this.filter = null;
  }

  filterById(user_id: string, url_id: string) {
    this.filter = this.url
      .where("user_id", "=", user_id)
      .andWhere("id", "=", url_id);
  }

  filterByName(user_id: string, name: string) {
    let builder = this.url;

    if (this.filter) {
      builder = this.filter;
    }

    this.filter = builder
      .where("user_id", "=", user_id)
      .andWhereILike("name", `%${name}%`);
  }

  filterByCategory(user_id: string, category: string) {
    let builder = this.url;

    if (this.filter) {
      builder = this.filter;
    }

    this.filter = builder
      .where("user_id", "=", user_id)
      .andWhereILike("name", `%${category}%`);
  }

  async get(
    page_no: number,
    page_size: number
  ): Promise<{ data: URL[]; hasNext: boolean }> {
    let builder = this.url;
    let hasNext = false;

    let limit = page_size + 1;
    let offset = (page_no - 1) * page_size;

    if (this.filter) {
      builder = this.filter;
    }

    const res: URL[] = await builder.select().limit(limit).offset(offset);

    if (res.length > limit) {
      hasNext = true;
    }

    return {
      data: res,
      hasNext,
    };
  }
}
