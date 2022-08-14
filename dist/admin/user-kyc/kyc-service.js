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
exports.KYCService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const userKYC_entity_1 = require("../../modules/entities/userKYC.entity");
const user_entity_1 = require("../../modules/entities/user.entity");
const axios_1 = require("axios");
require("dotenv").config({ debug: false });
let KYCService = class KYCService {
    constructor(kycEntity, userEntity) {
        this.kycEntity = kycEntity;
        this.userEntity = userEntity;
    }
    async changekycstatus(user_id, required_status) {
        common_1.Logger.log("changekycstatus", "KYCService");
        var user_detail = await this.userEntity.findOne({
            where: { user_id: parseInt(user_id) },
        });
        var user_country_id = user_detail.country_id;
        try {
            const user_id_ = parseInt(user_id);
            const user = await this.kycEntity.findOne({
                where: { kyc_user_id: user_id_ },
                order: { kyc_id: "DESC" },
            });
            if (user) {
                if (required_status === "Pending") {
                    user.kyc_status = userKYC_entity_1.kyc_status_enum.Pending;
                    if (user_detail.country_name == "USA" ||
                        user_detail.country_name == "usa" ||
                        user_detail.country_name == "Usa") {
                        const req_data = await axios_1.default
                            .get("https://ipinfo.io")
                            .then((res) => res.data)
                            .catch((err) => {
                            req_data: "";
                        });
                        const new_kyc = await this.kycEntity.create({
                            kyc_user_id: user_id_,
                            kyc_status: userKYC_entity_1.kyc_status_enum.Pending,
                            created_datetime: new Date(),
                            created_ip: req_data.ip ? req_data.ip : "",
                        });
                        await this.kycEntity.save(new_kyc);
                        user.api_repsonse = `KYC changed to ${required_status} by Admin @ ${new Date().toLocaleString()} by IP: ${req_data.ip ? req_data.ip : "NA"}`;
                        await this.kycEntity.save(user);
                    }
                    else {
                        const req_data = await axios_1.default
                            .get("https://ipinfo.io")
                            .then((res) => res.data)
                            .catch((err) => {
                            req_data: "";
                        });
                        user.api_repsonse = `KYC changed to ${required_status} by Admin @ ${new Date().toLocaleString()} by IP: ${req_data.ip ? req_data.ip : "NA"}`;
                        await this.kycEntity.save(user);
                    }
                    return user;
                }
                if (required_status === "Completed") {
                    if (user_country_id === 1) {
                        user.token = `${Math.floor(Math.random() * 1000000000000).toString()}-${Math.floor(Math.random() * 1000000000000).toString()} `;
                    }
                    user.kyc_status = userKYC_entity_1.kyc_status_enum.Completed;
                    const req_data = await axios_1.default
                        .get("https://ipinfo.io")
                        .then((res) => res.data)
                        .catch((err) => {
                        req_data: "";
                    });
                    user.api_repsonse = `KYC changed to ${required_status} by Admin @ ${new Date().toLocaleString()} by IP: ${req_data.ip ? req_data.ip : "NA"}`;
                    await this.kycEntity.save(user);
                    return user;
                }
                if (required_status === "Rejected") {
                    if (user_country_id === 1) {
                        user.api_repsonse = "Rejected_By_Admin";
                        user.token = null;
                        user.vendor_id = null;
                        await this.kycEntity.save(user);
                    }
                    if (user_country_id == 2) {
                        user_detail.isPersonalFilled = 0;
                        user_detail.isAddressFilled = 0;
                        user_detail.phone_number = user_detail.document_value = null;
                        user_detail.document_type = user_entity_1.document_Type_Enum.PAN;
                        await this.userEntity.save(user_detail);
                    }
                    user.kyc_status = userKYC_entity_1.kyc_status_enum.Rejected;
                    await this.kycEntity.save(user);
                    return user;
                }
                return null;
            }
        }
        catch (error) {
            common_1.Logger.error(error);
            return null;
        }
    }
};
KYCService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(userKYC_entity_1.moleculus_user_kyc)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.moleculus_user)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], KYCService);
exports.KYCService = KYCService;
//# sourceMappingURL=kyc-service.js.map