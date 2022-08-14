"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.checkAccessToken = void 0;
var common_1 = require("@nestjs/common");
require("dotenv").config({ debug: false });
var checkAccessToken = /** @class */ (function () {
    function checkAccessToken() {
    }
    checkAccessToken.prototype.use = function (req, res, next) {
        common_1.Logger.log(" Middleware:: checkAccessToken!");
        if (req.headers.accesstoken === "".concat(process.env.accesstoken) ||
            req.headers.admin_access_token === "".concat(process.env.admin_access_token)) {
            return next();
        }
        else {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Unauthorized, Invalid token:: ".concat(req.headers.accesstoken, " provided"),
                data: null
            });
        }
    };
    checkAccessToken = __decorate([
        (0, common_1.Injectable)()
    ], checkAccessToken);
    return checkAccessToken;
}());
exports.checkAccessToken = checkAccessToken;
