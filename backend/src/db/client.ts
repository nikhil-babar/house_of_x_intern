import knex from "knex";
import getEnv from "../envConfig";

const env = getEnv();

const client = knex({
  client: "mysql2",
  connection: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  },
});

export default client;
