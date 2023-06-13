import { Router } from "express";
import pingRouter from "./ping.router";
import dogsRouter from "./dogs.router";
const apiRouter = Router();

apiRouter.use(pingRouter);
apiRouter.use(dogsRouter);

export default apiRouter;
