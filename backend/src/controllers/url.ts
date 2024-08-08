import * as joi from "@hapi/joi";
import "joi-extract-type";
import { Request, Response, NextFunction } from "express";
import { URLService } from "../db/url";

export const GetURLFilterSchema = joi
  .object({
    name: joi.string().optional(),
    category: joi.string().optional(),
    id: joi.string().optional(),
    page_size: joi.number().strict(),
    page_no: joi.number().strict(),
    user_id: joi.string().strict(),
  })
  .strict();

export type GetURLFilterType = joi.extractType<typeof GetURLFilterSchema>;

export async function getURL(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = GetURLFilterSchema.validate(req.query);

    const query: GetURLFilterType = parsed.value;
    const service = new URLService();

    if (query.category) {
      service.filterByCategory(query.user_id as string, query.category);
    }

    if (query.name) {
      service.filterByCategory(query.user_id as string, query.name);
    }

    if (query.id) {
      service.filterById(query.user_id as string, query.id);
    }

    const urls = await service.get(
      query.page_no as number,
      query.page_size as number
    );

    return res.status(200).json(urls);
  } catch (error: Error | any) {
    console.log("Error while getting urls: ", error.message);
  }
}
