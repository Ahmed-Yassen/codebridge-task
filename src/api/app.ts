import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import path from "path";
import apiRouter from "./routes/api.router";

dotenv.config({
  path: path.join(__dirname + `/../../config/${process.env.NODE_ENV}.env`),
});

const app = express();

app.use(express.json());

app.use(apiRouter);

//- Not Found Middleware
app.all("*", () => {
  throw new Error("404 Not Found");
});

//- Catch Any Error Middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: "Something went wrong!" });
});

export default app;
