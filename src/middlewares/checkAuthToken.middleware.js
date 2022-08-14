"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.checkAuthToken = void 0;
var common_1 = require("@nestjs/common");
require("dotenv").config({ debug: false });
var checkAuthToken = /** @class */ (function () {
    function checkAuthToken(jwtService) {
        this.jwtService = jwtService;
    }
    checkAuthToken.prototype.use = function (req, res, next) {
        common_1.Logger.log(" Middleware: checking User AuthToken ...");
        if (!req.headers.auth_token && !req.headers.admin_auth_token) {
            common_1.Logger.log(" No AuthToken found in request header", "UserAuthController");
            return res.status(401).json({
                code: "401",
                status: "error",
                message: "No AuthToken found in request header",
                data: null
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
        var token = req.headers.auth_token.toString().split(" ")[1];
        if (!token) {
            common_1.Logger.log("Token not found", "UserAuthController");
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Token not found",
                data: null
            });
        }
        try {
            var verified = this.jwtService.verify(token, {
                secret: "".concat(process.env.JWT_SECRET)
            });
            if (verified) {
                common_1.Logger.log(" User AuthToken verified", "UserAuthController");
                next();
            }
            else {
                res.json({
                    code: "400",
                    status: "error",
                    message: "Unauthorized, Invalid token. ",
                    data: null
                });
            }
        }
        catch (error) {
            common_1.Logger.log(" User AuthToken not verified", "UserAuthController");
            console.log(error.message);
            return res.status(401).json({
                code: "401",
                status: "error",
                message: "Error Occured, User auth token expired",
                data: []
            });
        }
    };
    checkAuthToken = __decorate([
        (0, common_1.Injectable)()
    ], checkAuthToken);
    return checkAuthToken;
}());
exports.checkAuthToken = checkAuthToken;
