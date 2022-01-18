import { NextFunction, Request, Response } from "express";
import StatusCodes from "http-status-codes";
import DataBaseError from "../models/error/database.error";
import ForbbidenError from "../models/error/forbidden.error";

function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof DataBaseError) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  } else if (error instanceof ForbbidenError) {
    res.sendStatus(StatusCodes.FORBIDDEN);
  } else {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export default errorHandler;