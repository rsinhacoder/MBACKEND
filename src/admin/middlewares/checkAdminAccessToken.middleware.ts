import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

require("dotenv").config({ debug: false });

@Injectable()
export class checkAdminAccessToken implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    Logger.log(" Middleware: checkAdminAccessToken!");

    if (!req.headers.admin_access_token) {
      Logger.log(
        " No Admin Access Token found in request header",
        "checkAdminAccessToken"
      );
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured",
        data: null,
      });
    }
    if (
      req.headers.admin_access_token === `${process.env.admin_access_token}`
    ) {
      Logger.log(" Admin AccessToken verified", "checkAdminAccessToken");
      next();
    } else {
      Logger.log(" Admin AccessToken not verified", "checkAdminAccessToken");
      return res.json({
        code: "400",
        status: "error",
        message: `Unauthorized, Invalid token:: ${req.headers.accesstoken} provided`,
        data: null,
      });
    }
  }
}
