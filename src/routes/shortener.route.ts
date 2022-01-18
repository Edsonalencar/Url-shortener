import { Router, Request, Response, NextFunction } from "express";
import { config } from "../config/constants";
import shortid from "shortid";
import { MongoModelURL } from "../models/mongoMoldels/ulr.model";
import { StatusCodes } from "http-status-codes";
import ForbbidenError from "../models/error/forbidden.error";

const shortenerRoute = Router();

shortenerRoute.post(
  "/shorten",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { originURL } = req.body;

      if (!originURL || originURL === " ") {
        throw new ForbbidenError("URL não Informada");
      }

      const url = await MongoModelURL.findOne({ originURL });

      if (url) {
        res.status(StatusCodes.OK).json(url);
        return;
      }

      const hash = shortid.generate();
      const shortURL = `${config.API_URL}/${hash}`;

      const newUrl = await MongoModelURL.create({ originURL, hash, shortURL });
      res.status(StatusCodes.OK).json(newUrl);
    } catch (error) {
      next(error);
    }
  }
);

shortenerRoute.get(
  "/:hash",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { hash } = req.params;

      const url = await MongoModelURL.findOne({ hash });
      const originURL = url?.originURL;

      if (!originURL) {
        throw new ForbbidenError("URL Invalida");
      }

      res.status(StatusCodes.OK).redirect(originURL);
    } catch (error) {
      next(error);
    }
  }
);

export default shortenerRoute;
