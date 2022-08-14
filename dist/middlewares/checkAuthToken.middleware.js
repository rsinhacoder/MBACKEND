"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthToken = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
require("dotenv").config({ debug: false });
let checkAuthToken = class checkAuthToken {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    use(req, res, next) {
        common_1.Logger.log(" Middleware: checking User AuthToken ...");
        if (!req.headers.auth_token && !req.headers.admin_auth_token) {
            common_1.Logger.log(" No AuthToken found in request header", "UserAuthController");
            return res.status(401).json({
                code: "401",
                status: "error",
                message: "No AuthToken found in request header",
                data: null,
            });
        }
        const token = req.headers.auth_token.toString().split(" ")[1];
        if (!token) {
            common_1.Logger.log("Token not found", "UserAuthController");
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
                common_1.Logger.log(" User AuthToken verified", "UserAuthController");
                next();
            }
            else {
                res.json({
                    code: "400",
                    status: "error",
                    message: `Unauthorized, Invalid token. `,
                    data: null,
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
                data: [],
            });
        }
    }
};
checkAuthToken = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], checkAuthToken);
exports.checkAuthToken = checkAuthToken;
//# sourceMappingURL=checkAuthToken.middleware.js.map