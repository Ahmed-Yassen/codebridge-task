import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import path from "path";
import apiRouter from "./routes/api.router";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "../core/application/errors/NotFoundError";

dotenv.config({
  path: path.join(__dirname + `/../../config/${process.env.NODE_ENV}.env`),
});

const app = express();

app.use(express.json());

app.use(apiRouter);

//- Not Found Middleware
app.all("*", () => {
  throw new NotFoundError("URL");
});

//- Catch Any Error Middleware
app.use(errorHandler);

export default app;
