import express from "express";
import getEnv from "./envConfig";
import urlRouter from "./routes/url";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const env = getEnv();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use("/url", urlRouter);

app.listen(env.PORT, () => console.log("Server on port: ", env.PORT));
