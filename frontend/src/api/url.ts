import { axiosClient } from "./axiosClient";
import { URL } from "../types/types";

export interface CreateURLParamsType {
  name: string;
  category: string;
  url: string;
}

export async function createUrl(params: CreateURLParamsType) {
  try {
    await new Promise((res, rej) => {
      setTimeout(() => {
        res("");
      }, 1000);
    });
    await axiosClient.post("/url", { ...params });
  } catch (error: Error | any) {
    console.log("Error while creating url: ", error.message);
    throw error;
  }
}

export interface GetUrlParamsType {
  page_no: number;
  page_size: number;
}

export async function getURLs(params: GetUrlParamsType): Promise<URL[]> {
  try {
    await new Promise((res, rej) => {
      setTimeout(() => {
        res("");
      }, 1000);
    });
    const res = await axiosClient.get("/url", {
      params: {
        ...params,
      },
    });
    return res.data.data;
  } catch (error: Error | any) {
    console.log("Error while creating url: ", error.message);
    throw error;
  }
}
