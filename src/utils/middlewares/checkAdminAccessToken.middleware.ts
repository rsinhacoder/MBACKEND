import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

require("dotenv").config({ debug: false });

@Injectable()
export class checkAdminAccessToken implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    Logger.log(" Middleware:: checkAdminAccessToken!");
    if (
      req.headers.admin_access_token === `${process.env.admin_access_token}`
    ) {
      next();
    } else {
      res.json({
        code: "400",
        status: "error",
        message: `Unauthorized, Invalid token:: ${req.headers.accesstoken} provided`,
        data: null,
      });
    }
  }
}
