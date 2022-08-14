"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdminAccessToken = void 0;
const common_1 = require("@nestjs/common");
require("dotenv").config({ debug: false });
let checkAdminAccessToken = class checkAdminAccessToken {
    use(req, res, next) {
        common_1.Logger.log(" Middleware: checkAdminAccessToken!");
        if (!req.headers.admin_access_token) {
            common_1.Logger.log(" No Admin Access Token found in request header", "checkAdminAccessToken");
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured",
                data: null,
            });
        }
        if (req.headers.admin_access_token === `${process.env.admin_access_token}`) {
            common_1.Logger.log(" Admin AccessToken verified", "checkAdminAccessToken");
            next();
        }
        else {
            common_1.Logger.log(" Admin AccessToken not verified", "checkAdminAccessToken");
            return res.json({
                code: "400",
                status: "error",
                message: `Unauthorized, Invalid token:: ${req.headers.accesstoken} provided`,
                data: null,
            });
        }
    }
};
checkAdminAccessToken = __decorate([
    (0, common_1.Injectable)()
], checkAdminAccessToken);
exports.checkAdminAccessToken = checkAdminAccessToken;
//# sourceMappingURL=checkAdminAccessToken.middleware.js.map