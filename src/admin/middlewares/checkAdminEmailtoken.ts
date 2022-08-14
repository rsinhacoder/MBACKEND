import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
require("dotenv").config({ debug: false });

@Injectable()
export class checkAdminEmailToken implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  use(req: Request, res: Response, next: NextFunction) {
    Logger.log(" Middleware: checkAdminEmailToken!");
    if (!req.headers.admin_auth_token) {
      Logger.log(
        " No AdminAuthToken found in request header",
        "checkAdminAuthToken"
      );
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured, No admin_auth_token found in request header",
        data: null,
      });
    }

    const admin_auth_token_ = req.headers.admin_auth_token
      .toString()
      .split(" ")[1];

    if (!admin_auth_token_ || !req.headers.admin_auth_token) {
      Logger.log("AdminAuthToken not found", "checkAdminAuthToken");
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured, AdminAuthToken not found",
        data: null,
      });
    }
    try {
      const verified = this.jwtService.verify(admin_auth_token_, {
        secret: `${process.env.ADMIN_JWT_SECRET}`,
      });
      if (verified) {
        Logger.log(" Admin AuthToken verified", "checkAdminAuthToken");
        next();
      } else {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Error Occured, incorrect AdminAuthToken !",
          data: null,
        });
      }
    } catch (error) {
      Logger.log(" Error Occured", "checkAdminAuthToken");
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured",
        data: null,
      });
    }
  }
}
