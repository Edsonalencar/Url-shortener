import { Router, Request, Response } from "express";
import StatusCodes from "http-status-codes";

const statusRoute = Router();

statusRoute.get("/status", (req: Request, res: Response) => {
  res.sendStatus(StatusCodes.OK);
});

export default statusRoute;
