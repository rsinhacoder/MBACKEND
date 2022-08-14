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
exports.AdminAuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const axios_1 = require("axios");
const typeorm_2 = require("typeorm");
const admin_entity_1 = require("../../modules/entities/admin.entity");
const bcrypt_1 = require("./utils/bcrypt");
const speakeasy = require("speakeasy");
require("dotenv").config({ debug: false });
let AdminAuthService = class AdminAuthService {
    constructor(jwtService, adminRepository) {
        this.jwtService = jwtService;
        this.adminRepository = adminRepository;
    }
    async updateTFAStatus(admin_id, isAuthStatus) {
        try {
            const admin = await this.getAdminById(admin_id);
            if (isAuthStatus === true) {
                admin.google_auth_enabled = admin_entity_1.google_auth_enabled_Enum.Disable;
                return await this.adminRepository.save(admin);
            }
            else if (isAuthStatus === false) {
                admin.google_auth_enabled = admin_entity_1.google_auth_enabled_Enum.Enable;
                return await this.adminRepository.save(admin);
            }
        }
        catch (e) {
            common_1.Logger.error(e);
            return null;
        }
    }
    async VerifyTFA(admin_id, token) {
        const admin = await this.adminRepository.findOne({
            where: {
                admin_id: admin_id,
            },
        });
        try {
            const secret = admin.temp_secret.base32;
            const verified = await speakeasy.totp.verify({
                secret,
                encoding: "base32",
                token,
            });
            if (verified) {
                return true;
            }
            else {
                common_1.Logger.error("Invalid TFA Code");
                return null;
            }
            return verified;
        }
        catch (error) {
            common_1.Logger.error(error, "AdminAuthService");
            return null;
        }
    }
    async getAdminById(admin_id) {
        try {
            const admin = await this.adminRepository.findOne({
                where: { admin_id: admin_id },
            });
            if (!admin || admin === null || admin === undefined) {
                return null;
            }
            else {
                admin.password = undefined;
                return admin;
            }
        }
        catch (error) {
            common_1.Logger.error(error, "AdminAuthService");
            return null;
        }
    }
    async generateRandomUniqueDigits() {
        const length = 5;
        let result = "";
        const characters = "0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    async checkEmail(email) {
        try {
            const check_admin = await this.adminRepository.findOne({
                where: { email_id: email },
            });
            if (!check_admin || check_admin === null || check_admin === undefined) {
                return null;
            }
            else {
                check_admin.password = "";
                return check_admin;
            }
        }
        catch (error) {
            common_1.Logger.error(error, "AdminAuthService");
            return null;
        }
    }
    async registerAdmin(createAdminDto) {
        try {
            const temp_secret = await speakeasy.generateSecret();
            const password_encoded = (0, bcrypt_1.encodePasswordAdmin)(createAdminDto.password);
            const admin = this.adminRepository.create(Object.assign(Object.assign({}, createAdminDto), { password: password_encoded }));
            admin.temp_secret = temp_secret;
            admin.google_auth_code = temp_secret.base32;
            await this.adminRepository.save(admin);
            admin.first_name = createAdminDto.first_name;
            admin.last_name = createAdminDto.last_name;
            admin.email_id = createAdminDto.email_id;
            admin.password = password_encoded;
            admin.created_datetime = new Date();
            const req_data = await axios_1.default
                .get("https://ipinfo.io")
                .then((res) => res.data);
            admin.created_ip = req_data ? req_data.ip : "";
            var uniqueDigits = await this.generateRandomUniqueDigits();
            admin.admin_slug =
                createAdminDto.first_name.toLowerCase() +
                    "_" +
                    createAdminDto.last_name.toLowerCase() +
                    "_" +
                    uniqueDigits;
            return await this.adminRepository.save(admin);
        }
        catch (error) {
            common_1.Logger.error(error, "AdminAuthService");
            return null;
        }
    }
    async loginAdmin(email_id, password) {
        try {
            const check_admin = await this.adminRepository.findOne({
                where: { email_id: email_id },
            });
            if (!check_admin) {
                return null;
            }
            const password_encoded = check_admin.password;
            const is_verified = (0, bcrypt_1.comparePasswordAdmin)(password, password_encoded);
            if (!is_verified || is_verified === null || is_verified === undefined) {
                return null;
            }
            else {
                return true;
            }
        }
        catch (error) {
            common_1.Logger.error(error, "AdminAuthService");
            return null;
        }
    }
    async UpdateAdminProfile(updateAdminDto) {
        common_1.Logger.log(`UpdateAdminProfile ${updateAdminDto.admin_id}`, "AdminAuthService");
        const admin_id = updateAdminDto.admin_id;
        const admin = await this.adminRepository.findOne({
            where: { admin_id: parseInt(admin_id) },
        });
        if (!admin || admin === null || admin === undefined) {
            common_1.Logger.error("Admin not found", "AdminAuthService");
            return null;
        }
        else {
            console.log(admin);
            if (updateAdminDto.first_name !== null &&
                updateAdminDto.first_name !== undefined) {
                admin.first_name = updateAdminDto.first_name;
            }
            if (updateAdminDto.last_name !== null &&
                updateAdminDto.last_name !== undefined) {
                admin.last_name = updateAdminDto.last_name;
            }
            if (updateAdminDto.email_id !== null &&
                updateAdminDto.email_id !== undefined) {
                admin.email_id = updateAdminDto.email_id;
            }
            if (updateAdminDto.username !== null &&
                updateAdminDto.username !== undefined) {
                admin.username = updateAdminDto.username;
            }
            return await this.adminRepository.save(admin);
        }
    }
    async ChangePasswordForced(email) {
        common_1.Logger.log("ChangePasswordForced", "AdminAuthService");
        const check_admin = await this.adminRepository.findOne({
            where: { email_id: email },
        });
        if (!check_admin || check_admin === null || check_admin === undefined) {
            return null;
        }
        else {
            const new_password = "admin_";
            const password_encoded = (0, bcrypt_1.encodePasswordAdmin)(new_password);
            check_admin.password = password_encoded;
            await this.adminRepository.save(check_admin);
            return new_password;
        }
    }
    async changePassword(email, old_password, new_password) {
        try {
            const check_admin = await this.adminRepository.findOne({
                where: { email_id: email },
            });
            if (!check_admin || check_admin === null || check_admin === undefined) {
                return null;
            }
            else {
                const verified = (0, bcrypt_1.comparePasswordAdmin)(old_password, check_admin.password);
                if (!verified) {
                    return null;
                }
                else if (verified) {
                    const password_encoded = (0, bcrypt_1.encodePasswordAdmin)(new_password);
                    check_admin.password = password_encoded;
                    return await this.adminRepository.save(check_admin);
                }
            }
            return null;
        }
        catch (error) {
            common_1.Logger.error(error, "AdminAuthService");
            return null;
        }
    }
};
AdminAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("JWT_SERVICE")),
    __param(1, (0, typeorm_1.InjectRepository)(admin_entity_1.moleculus_admin)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository])
], AdminAuthService);
exports.AdminAuthService = AdminAuthService;
//# sourceMappingURL=admin.auth.service.js.map