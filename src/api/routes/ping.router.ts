import { Request, Response, Router } from "express";
const pingRouter = Router();

pingRouter.get("/ping", (req: Request, res: Response) => {
  res.send('Dogshouseservice.Version1.0.1"');
});

export default pingRouter;
