import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
export declare class checkAccessToken implements NestMiddleware {
    constructor();
    use(req: Request, res: Response, next: NextFunction): void | Response<any, Record<string, any>>;
}
