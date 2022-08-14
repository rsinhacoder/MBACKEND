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
exports.checkAccessToken = void 0;
const common_1 = require("@nestjs/common");
require("dotenv").config({ debug: false });
let checkAccessToken = class checkAccessToken {
    constructor() { }
    use(req, res, next) {
        common_1.Logger.log(" Middleware:: checkAccessToken!");
        if (req.headers.accesstoken === `${process.env.accesstoken}` ||
            req.headers.admin_access_token === `${process.env.admin_access_token}`) {
            return next();
        }
        else {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: `Unauthorized, Invalid token:: ${req.headers.accesstoken} provided`,
                data: null,
            });
        }
    }
};
checkAccessToken = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], checkAccessToken);
exports.checkAccessToken = checkAccessToken;
//# sourceMappingURL=checkAccessToken.middleware.js.map