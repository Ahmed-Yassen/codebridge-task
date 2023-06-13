import { Router } from "express";
import pingRouter from "./ping.router";
const apiRouter = Router();

apiRouter.use(pingRouter);

export default apiRouter;
