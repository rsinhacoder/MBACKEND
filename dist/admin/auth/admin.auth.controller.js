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
exports.AdminAuthController = void 0;
const axios = require("axios");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const mail_service_1 = require("../../utils/mail/mail.service");
const typeorm_2 = require("typeorm");
const admin_entity_1 = require("../../modules/entities/admin.entity");
const Create_Admin_dto_1 = require("../dtos/Create-Admin.dto");
const Update_Admin_dto_1 = require("../dtos/Update-Admin.dto");
const admin_auth_service_1 = require("./admin.auth.service");
const speakeasy = require("speakeasy");
let AdminAuthController = class AdminAuthController {
    constructor(jwtService, adminAuthService, mailService, adminRepository) {
        this.jwtService = jwtService;
        this.adminAuthService = adminAuthService;
        this.mailService = mailService;
        this.adminRepository = adminRepository;
    }
    async ping() {
        var ip_data;
        const req_data = await axios
            .get("https://ipinfo.io")
            .then((res) => {
            ip_data = res.data;
        })
            .catch((err) => {
            ip_data = err;
        });
        return {
            code: "200",
            status: "success",
            message: "Server is running",
            data: {
                time: new Date().toISOString().split("T")[0] +
                    " " +
                    new Date().toLocaleTimeString(),
                metadata: ip_data,
            },
        };
    }
    async registerAdmin(createAdminDto) {
        const { email_id, password } = createAdminDto;
        const admin_check = await this.adminAuthService.checkEmail(email_id);
        if (admin_check) {
            return {
                code: "400",
                status: "error",
                message: "Admin already exist",
                data: [],
            };
        }
        const result = await this.adminAuthService.registerAdmin(createAdminDto);
        if (!result || result === null || result === undefined) {
            return {
                code: "400",
                status: "error",
                message: "Error Occured in Registering Admin",
                data: [],
            };
        }
        else {
            return {
                code: "200",
                status: "success",
                message: "Admin Registered successfully",
                data: { admin_id: result.admin_id },
            };
        }
    }
    async sendMail(res, body) {
        const { admin_id, email_id } = body;
        console.log(body);
        const is_admin_exist = await this.adminAuthService.checkEmail(email_id);
        if (!is_admin_exist ||
            is_admin_exist === null ||
            is_admin_exist === undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: [],
                data: [],
            });
        }
        else {
            const password_change = await this.adminAuthService.ChangePasswordForced(email_id);
            if (!password_change ||
                password_change === null ||
                password_change === undefined) {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Error Occured During password sending",
                    data: [],
                });
            }
            else {
                const result = await this.mailService.sendMail("YOUR Password is", password_change, email_id);
                if (!result || result == null || result == undefined) {
                    common_1.Logger.log("Error Sending mail", "");
                    return res.status(400).json({
                        code: "400",
                        status: "error",
                        message: "Error in sending mail",
                        data: [],
                    });
                }
                else {
                    return res.status(200).json({
                        code: "200",
                        status: "success",
                        message: "New Password Sent",
                        data: [],
                    });
                }
            }
        }
    }
    async verifyTFA(res, body) {
        const { token, admin_id } = body;
        const admin_id_int = parseInt(admin_id);
        common_1.Logger.warn("Verifying Two Factor Auth ...");
        const admin = await this.adminAuthService.getAdminById(admin_id_int);
        if (!admin || admin === null || admin === undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Admin not found",
                data: [],
            });
        }
        else {
            const isValid = await this.adminAuthService.VerifyTFA(admin_id_int, token);
            if (!isValid || isValid === null || isValid === undefined) {
                common_1.Logger.log("TFA not verified");
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "TFA not verified",
                    data: [],
                });
            }
            else {
                common_1.Logger.log("TFA verified");
                admin.google_auth_code = admin.temp_secret.base32;
                await this.adminRepository.save(admin);
                const token = this.jwtService.sign({
                    admin_id: admin.admin_id,
                }, { secret: `${process.env.ADMIN_JWT_SECRET}`, expiresIn: "1080h" });
                return res.status(200).json({
                    code: "200",
                    status: "success",
                    message: "TFA verified",
                    data: {
                        admin_id: admin.admin_id,
                        first_name: admin.first_name,
                        last_name: admin.last_name,
                        admin_email: admin.email_id,
                        username: admin.username,
                        token: token,
                    },
                });
            }
        }
    }
    async checkEmail(body, res) {
        const { email } = body;
        const result = await this.adminAuthService.checkEmail(email);
        if (!result || result === null || result === undefined) {
            common_1.Logger.log("Email not found", "AdminAuthController");
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Email not found",
                data: null,
            });
        }
        else {
            common_1.Logger.log("Email found", "AdminAuthController");
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Email found",
                data: { admin_id: result.admin_id, email: result.email_id },
            });
        }
    }
    async UpdateAdminProfile(updateAdminDto, res) {
        const user_email = await this.adminAuthService.checkEmail(updateAdminDto.email_id);
        if (!user_email || user_email === null || user_email === undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Admin with Such Email not found",
                data: null,
            });
        }
        const result = await this.adminAuthService.UpdateAdminProfile(updateAdminDto);
        if (!result || result === null || result === undefined) {
            common_1.Logger.log("Profile update failed", "AdminAuthController");
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, in  updating profile",
                data: null,
            });
        }
        else {
            common_1.Logger.log("Profile updated successfully", "AdminAuthController");
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Profile updated successfully",
                data: null,
            });
        }
    }
    async toggleTfaStatus(body, res) {
        const { admin_id, otp, isAuthStatus } = body;
        console.log(typeof isAuthStatus);
        console.log(body);
        const admin_id_int = parseInt(admin_id);
        const result = await this.adminAuthService.VerifyTFA(admin_id_int, otp);
        if (!result || result === null || result === undefined) {
            common_1.Logger.error("TFA not verified", "AdminAuthController");
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "TFA  Status not changed",
                data: [],
            });
        }
        else {
            await this.adminAuthService.updateTFAStatus(admin_id_int, isAuthStatus);
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "TFA status updated successfully",
                data: [],
            });
        }
    }
    async getAdminDetails(res, id) {
        common_1.Logger.log("Getting Admin Details", "AdminAuthController");
        const result = await this.adminAuthService.getAdminById(parseInt(id));
        if (!result || result === null || result === undefined) {
            common_1.Logger.log("Admin not found", "AdminAuthController");
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Admin not found",
                data: [],
            });
        }
        else {
            common_1.Logger.log("Admin found", "AdminAuthController");
            var otp_auth_url = result.temp_secret.otpauth_url;
            var otp_secret = result.temp_secret.base32;
            result.temp_secret = "";
            result.google_auth_code = "";
            var resultnew = Object.assign(Object.assign({}, result), { security_key: otp_secret, otp_auth_url: otp_auth_url });
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Admin found",
                data: resultnew,
            });
        }
    }
    async loginAdmin(body) {
        const { email_id, password } = body;
        const result = await this.adminAuthService.loginAdmin(email_id, password);
        if (!result || result === null || result === undefined) {
            common_1.Logger.log("Login failed", "AdminAuthController");
            return {
                code: "400",
                status: "error",
                message: "Error Occured in logging in",
                data: null,
            };
        }
        else {
            common_1.Logger.log("Logged in Succesfully", "AdminAuthController");
            const admin_ = await this.adminRepository.findOne({
                where: { email_id: email_id },
            });
            if (!admin_) {
                return {
                    code: "400",
                    status: "error",
                    message: "Error Occured, no such email found",
                    data: null,
                };
            }
            const token = this.jwtService.sign({
                admin_id: admin_.admin_id,
            }, { secret: `${process.env.ADMIN_JWT_SECRET}`, expiresIn: "1080h" });
            common_1.Logger.log("Admin", admin_.email_id);
            return {
                code: "200",
                status: "success",
                message: "ADMIN JWT Token:",
                data: {
                    token: token,
                    admin_id: admin_.admin_id,
                    admin_email: admin_.email_id,
                    first_name: admin_.first_name,
                    last_name: admin_.last_name,
                    username: admin_.username,
                    isGoogleAuthEnabled: admin_.google_auth_enabled,
                },
            };
        }
    }
    async changePassword(body) {
        const { email, old_password, new_password } = body;
        const result = await this.adminAuthService.changePassword(email, old_password, new_password);
        if (!result || result === null || result === undefined) {
            common_1.Logger.log("Password change failed", "AdminAuthController");
            return {
                code: "400",
                status: "error",
                message: "Error Occured, in changing password",
                data: null,
            };
        }
        else {
            common_1.Logger.log("Password changed successfully", "AdminAuthController");
            return {
                code: "200",
                status: "success",
                message: "Password changed successfully",
                data: null,
            };
        }
    }
};
__decorate([
    (0, common_1.Post)("ping"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "ping", null);
__decorate([
    (0, common_1.Post)("register"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Create_Admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "registerAdmin", null);
__decorate([
    (0, common_1.Post)("sendmail"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "sendMail", null);
__decorate([
    (0, common_1.Post)("verifyadmin/tfa"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "verifyTFA", null);
__decorate([
    (0, common_1.Post)("check/email"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "checkEmail", null);
__decorate([
    (0, common_1.Post)("/update"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Update_Admin_dto_1.UpdateAdminDto, Object]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "UpdateAdminProfile", null);
__decorate([
    (0, common_1.Post)("/change/tfatoggle"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "toggleTfaStatus", null);
__decorate([
    (0, common_1.Post)("getdetails/admin/:id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "getAdminDetails", null);
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "loginAdmin", null);
__decorate([
    (0, common_1.Post)("change/password"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "changePassword", null);
AdminAuthController = __decorate([
    (0, common_1.Controller)("admin/auth"),
    __param(0, (0, common_1.Inject)("JWT_SERVICE")),
    __param(1, (0, common_1.Inject)("ADMIN_AUTH_SERVICE")),
    __param(2, (0, common_1.Inject)("MAIL_SERVICE")),
    __param(3, (0, typeorm_1.InjectRepository)(admin_entity_1.moleculus_admin)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        admin_auth_service_1.AdminAuthService,
        mail_service_1.MailService,
        typeorm_2.Repository])
], AdminAuthController);
exports.AdminAuthController = AdminAuthController;
//# sourceMappingURL=admin.auth.controller.js.map