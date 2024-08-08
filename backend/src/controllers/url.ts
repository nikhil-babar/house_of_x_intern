import * as joi from "@hapi/joi";
import "joi-extract-type";
import { Request, Response, NextFunction } from "express";
import { URLService } from "../db/url";
import { required } from "joi";

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
    res.sendStatus(500);
  }
}

export const AddURLQuerySchema = joi
  .object({
    name: joi.string().strict(),
    url: joi.string().strict(),
    category: joi.string().strict(),
    user_id: joi.string().strict(),
  })
  .strict();

export type AddURLQueryType = joi.extractType<typeof AddURLQuerySchema>;

export async function addURL(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("Received request to add url: ", req.body);

    const parsed = AddURLQuerySchema.validate(req.body);

    const query: AddURLQueryType = parsed.value;
    const service = new URLService();

    const url = await service.add(
      query.user_id as string,
      query.name as string,
      query.category as string,
      query.url as string
    );

    return res.status(201).json({ data: url });
  } catch (error: Error | any) {
    console.log("Error while getting urls: ", error.message);
    res.sendStatus(500);
  }
}

export async function redirect(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;

    console.log("Received id", id);

    if (!id) {
      return res.sendStatus(422);
    }

    const service = new URLService();

    const url = await service.incrementAndGet(id);

    console.log(url);

    return res.redirect(url.redirect_url);
  } catch (error: Error | any) {
    console.log("Error while getting urls: ", error.message);
    res.sendStatus(500);
  }
}
