import joi from "joi";
import { config } from "dotenv";

config({
  path: ".env",
  debug: true,
});

const envSchema = joi.object({
  PORT: joi.number().integer(),
  DB_USER: joi.string(),
  DB_PASSWORD: joi.string(),
  DB_PORT: joi.number().integer(),
  DB_HOST: joi.string(),
  DB_NAME: joi.string(),
  BACKEND_URL: joi.string(),
});

export interface Env {
  PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_HOST: string;
  DB_NAME: string;
  BACKEND_URL: string;
}

function getEnv(): Env {
  const parsed = envSchema.validate(process.env);
  return parsed.value;
}

export default getEnv;
