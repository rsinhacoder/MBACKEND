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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KyccontrollerController = void 0;
const common_1 = require("@nestjs/common");
const kyc_service_1 = require("./kyc-service");
let KyccontrollerController = class KyccontrollerController {
    constructor(kycService) {
        this.kycService = kycService;
    }
    async changekycstatus(res, body) {
        console.log(body);
        common_1.Logger.log("info", "KycController");
        const { user_id, required_status } = body;
        const info = await this.kycService.changekycstatus(user_id, required_status);
        if (info) {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Status updated successfully! ",
                data: info,
            });
        }
        else {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Status not updated",
                data: [],
            });
        }
    }
};
__decorate([
    (0, common_1.Post)("/changekycstatus"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], KyccontrollerController.prototype, "changekycstatus", null);
KyccontrollerController = __decorate([
    (0, common_1.Controller)("admin/kyccontroller"),
    __param(0, (0, common_1.Inject)("KYC_SERVICE")),
    __metadata("design:paramtypes", [kyc_service_1.KYCService])
], KyccontrollerController);
exports.KyccontrollerController = KyccontrollerController;
//# sourceMappingURL=kyccontroller.controller.js.map