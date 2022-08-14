import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

require("dotenv").config({ debug: false });

@Injectable()
export class checkAccessToken implements NestMiddleware {
  constructor() {}
  use(req: Request, res: Response, next: NextFunction) {
    Logger.log(" Middleware:: checkAccessToken!");
    if (
      req.headers.accesstoken === `${process.env.accesstoken}` ||
      req.headers.admin_access_token === `${process.env.admin_access_token}`
    ) {
      return next();
    } else {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: `Unauthorized, Invalid token:: ${req.headers.accesstoken} provided`,
        data: null,
      });
    }
  }
}
