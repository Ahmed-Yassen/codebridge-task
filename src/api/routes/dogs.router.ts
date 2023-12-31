import { Router } from "express";
import dogController from "../controllers/DogController";
const dogsRouter = Router();

dogsRouter.post("/dogs", dogController.createDog);
dogsRouter.get("/dogs", dogController.getDogs);

export default dogsRouter;
