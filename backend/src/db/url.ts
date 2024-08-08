import { Knex } from "knex";
import { URL } from "../types/db";
import client from "./client";
import getEnv from "../envConfig";
import { v4 } from "uuid";

const env = getEnv();

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

  async incrementAndGet(url_id: string) {
    const res: URL[] = await this.url.where("id", "=", url_id).select();

    await this.url.where("id", "=", url_id).increment("user_count");

    return res[0];
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

  async add(user_id: string, name: string, category: string, url: string) {
    const id = v4();
    const generated_url = `${env.BACKEND_URL}/url/hit/${id}`;

    const res = await this.url.insert({
      id: id,
      name,
      url: generated_url,
      redirect_url: url,
      category,
      user_count: 0,
      user_id,
      created_at: new Date().toISOString().substring(0, 19).replace("T", " "),
      updated_at: new Date().toISOString().substring(0, 19).replace("T", " "),
    });

    return res;
  }
}
