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
exports.checkAdminEmailToken = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
require("dotenv").config({ debug: false });
let checkAdminEmailToken = class checkAdminEmailToken {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    use(req, res, next) {
        common_1.Logger.log(" Middleware: checkAdminEmailToken!");
        if (!req.headers.admin_auth_token) {
            common_1.Logger.log(" No AdminAuthToken found in request header", "checkAdminAuthToken");
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
            common_1.Logger.log("AdminAuthToken not found", "checkAdminAuthToken");
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
                common_1.Logger.log(" Admin AuthToken verified", "checkAdminAuthToken");
                next();
            }
            else {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Error Occured, incorrect AdminAuthToken !",
                    data: null,
                });
            }
        }
        catch (error) {
            common_1.Logger.log(" Error Occured", "checkAdminAuthToken");
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured",
                data: null,
            });
        }
    }
};
checkAdminEmailToken = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], checkAdminEmailToken);
exports.checkAdminEmailToken = checkAdminEmailToken;
//# sourceMappingURL=checkAdminEmailtoken.js.map