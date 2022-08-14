import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
require("dotenv").config({ debug: false });

@Injectable()
export class checkAuthToken implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  use(req: Request, res: Response, next: NextFunction) {
    Logger.log(" Middleware: checking User AuthToken ...");
    if (!req.headers.auth_token && !req.headers.admin_auth_token) {
      Logger.log(" No AuthToken found in request header", "UserAuthController");
      return res.status(401).json({
        code: "401",
        status: "error",
        message: "No AuthToken found in request header",
        data: null,
      });
    }
    // if (req.headers.admin_auth_token) {
    //   const admin_token = req.headers.admin_auth_token.toString().split(" ")[1];
    //   if (admin_token) {
    //     const ver = this.jwtService.verify(admin_token, {
    //       secret: `${process.env.ADMIN_JWT_SECRET}`,
    //     });
    //     if (ver) {
    //       Logger.log(" Admin AuthToken verified", "UserAuthController");
    //       //return next();
    //       next();
    //     } else {
    //       return res.status(400).json({
    //         code: "400",
    //         status: "error",
    //         message: "Error Occured, incorrect UserAuthToken !",
    //         data: null,
    //       });
    //     }
    //   }
    // }

    const token = req.headers.auth_token.toString().split(" ")[1];

    if (!token) {
      Logger.log("Token not found", "UserAuthController");
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Token not found",
        data: null,
      });
    }
    try {
      const verified = this.jwtService.verify(token, {
        secret: `${process.env.JWT_SECRET}`,
      });
      if (verified) {
        Logger.log(" User AuthToken verified", "UserAuthController");
        next();
      } else {
        res.json({
          code: "400",
          status: "error",
          message: `Unauthorized, Invalid token. `,
          data: null,
        });
      }
    } catch (error) {
      Logger.log(" User AuthToken not verified", "UserAuthController");
      console.log(error.message);
      return res.status(401).json({
        code: "401",
        status: "error",
        message: "Error Occured, User auth token expired",
        data: [],
      });
    }
  }
}
