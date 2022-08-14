"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.checkAdminEmailToken = void 0;
var common_1 = require("@nestjs/common");
require("dotenv").config({ debug: false });
var checkAdminEmailToken = /** @class */ (function () {
    function checkAdminEmailToken(jwtService) {
        this.jwtService = jwtService;
    }
    checkAdminEmailToken.prototype.use = function (req, res, next) {
        common_1.Logger.log(" Middleware: checkAdminEmailToken!");
        if (!req.headers.admin_auth_token) {
            common_1.Logger.log(" No AdminAuthToken found in request header", "checkAdminAuthToken");
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, No admin_auth_token found in request header",
                data: null
            });
        }
        var admin_auth_token_ = req.headers.admin_auth_token
            .toString()
            .split(" ")[1];
        if (!admin_auth_token_ || !req.headers.admin_auth_token) {
            common_1.Logger.log("AdminAuthToken not found", "checkAdminAuthToken");
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, AdminAuthToken not found",
                data: null
            });
        }
        try {
            var verified = this.jwtService.verify(admin_auth_token_, {
                secret: "".concat(process.env.ADMIN_JWT_SECRET)
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
                    data: null
                });
            }
        }
        catch (error) {
            common_1.Logger.log(" Error Occured", "checkAdminAuthToken");
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured",
                data: null
            });
        }
    };
    checkAdminEmailToken = __decorate([
        (0, common_1.Injectable)()
    ], checkAdminEmailToken);
    return checkAdminEmailToken;
}());
exports.checkAdminEmailToken = checkAdminEmailToken;
