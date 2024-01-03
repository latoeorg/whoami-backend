import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import { ENV } from "./constant";
import Routes from "./routes";

dotenv.config();

const app: Express = express();

app
  .disable("x-powered-by")
  .use(logger("dev"))
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(express.static(path.join(__dirname, "public")));

Routes(app);

const port = ENV.API_PORT || 3000;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
