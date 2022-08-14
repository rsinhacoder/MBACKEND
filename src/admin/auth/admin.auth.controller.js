"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AdminAuthController = void 0;
var axios = require("axios");
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var admin_entity_1 = require("../../modules/entities/admin.entity");
var speakeasy = require("speakeasy");
var AdminAuthController = /** @class */ (function () {
    function AdminAuthController(jwtService, adminAuthService, mailService, adminRepository) {
        this.jwtService = jwtService;
        this.adminAuthService = adminAuthService;
        this.mailService = mailService;
        this.adminRepository = adminRepository;
    }
    //Ping the Server:
    AdminAuthController.prototype.ping = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ip_data, req_data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios
                            .get("https://ipinfo.io")
                            .then(function (res) {
                            ip_data = res.data;
                        })["catch"](function (err) {
                            ip_data = err;
                        })];
                    case 1:
                        req_data = _a.sent();
                        return [2 /*return*/, {
                                code: "200",
                                status: "success",
                                message: "Server is running",
                                data: {
                                    time: new Date().toISOString().split("T")[0] +
                                        " " +
                                        new Date().toLocaleTimeString(),
                                    metadata: ip_data
                                }
                            }];
                }
            });
        });
    };
    //register Admin:
    AdminAuthController.prototype.registerAdmin = function (createAdminDto) {
        return __awaiter(this, void 0, void 0, function () {
            var email_id, password, admin_check, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email_id = createAdminDto.email_id, password = createAdminDto.password;
                        return [4 /*yield*/, this.adminAuthService.checkEmail(email_id)];
                    case 1:
                        admin_check = _a.sent();
                        if (admin_check) {
                            return [2 /*return*/, {
                                    code: "400",
                                    status: "error",
                                    message: "Admin already exist",
                                    data: []
                                }];
                        }
                        return [4 /*yield*/, this.adminAuthService.registerAdmin(createAdminDto)];
                    case 2:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            return [2 /*return*/, {
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured in Registering Admin",
                                    data: []
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    code: "200",
                                    status: "success",
                                    message: "Admin Registered successfully",
                                    data: { admin_id: result.admin_id }
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminAuthController.prototype.sendMail = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var admin_id, email_id, is_admin_exist, password_change, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        admin_id = body.admin_id, email_id = body.email_id;
                        console.log(body);
                        return [4 /*yield*/, this.adminAuthService.checkEmail(email_id)];
                    case 1:
                        is_admin_exist = _a.sent();
                        if (!(!is_admin_exist ||
                            is_admin_exist === null ||
                            is_admin_exist === undefined)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: [],
                                data: []
                            })];
                    case 2: return [4 /*yield*/, this.adminAuthService.ChangePasswordForced(email_id)];
                    case 3:
                        password_change = _a.sent();
                        if (!(!password_change ||
                            password_change === null ||
                            password_change === undefined)) return [3 /*break*/, 4];
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "Error Occured During password sending",
                                data: []
                            })];
                    case 4: return [4 /*yield*/, this.mailService.sendMail("YOUR Password is", password_change, email_id)];
                    case 5:
                        result = _a.sent();
                        if (!result || result == null || result == undefined) {
                            common_1.Logger.log("Error Sending mail", "");
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error in sending mail",
                                    data: []
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "New Password Sent",
                                    data: []
                                })];
                        }
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AdminAuthController.prototype.verifyTFA = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var token, admin_id, admin_id_int, admin, isValid, token_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = body.token, admin_id = body.admin_id;
                        admin_id_int = parseInt(admin_id);
                        common_1.Logger.warn("Verifying Two Factor Auth ...");
                        return [4 /*yield*/, this.adminAuthService.getAdminById(admin_id_int)];
                    case 1:
                        admin = _a.sent();
                        if (!(!admin || admin === null || admin === undefined)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "Admin not found",
                                data: []
                            })];
                    case 2: return [4 /*yield*/, this.adminAuthService.VerifyTFA(admin_id_int, token)];
                    case 3:
                        isValid = _a.sent();
                        if (!(!isValid || isValid === null || isValid === undefined)) return [3 /*break*/, 4];
                        common_1.Logger.log("TFA not verified");
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "TFA not verified",
                                data: []
                            })];
                    case 4:
                        common_1.Logger.log("TFA verified");
                        admin.google_auth_code = admin.temp_secret.base32;
                        return [4 /*yield*/, this.adminRepository.save(admin)];
                    case 5:
                        _a.sent();
                        token_1 = this.jwtService.sign({
                            admin_id: admin.admin_id
                        }, { secret: "".concat(process.env.ADMIN_JWT_SECRET), expiresIn: "1080h" });
                        return [2 /*return*/, res.status(200).json({
                                code: "200",
                                status: "success",
                                message: "TFA verified",
                                data: {
                                    admin_id: admin.admin_id,
                                    first_name: admin.first_name,
                                    last_name: admin.last_name,
                                    admin_email: admin.email_id,
                                    username: admin.username,
                                    token: token_1
                                }
                            })];
                }
            });
        });
    };
    AdminAuthController.prototype.checkEmail = function (body, res) {
        return __awaiter(this, void 0, void 0, function () {
            var email, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = body.email;
                        return [4 /*yield*/, this.adminAuthService.checkEmail(email)];
                    case 1:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            common_1.Logger.log("Email not found", "AdminAuthController");
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Email not found",
                                    data: null
                                })];
                        }
                        else {
                            common_1.Logger.log("Email found", "AdminAuthController");
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Email found",
                                    data: { admin_id: result.admin_id, email: result.email_id }
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminAuthController.prototype.UpdateAdminProfile = function (updateAdminDto, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user_email, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminAuthService.checkEmail(updateAdminDto.email_id)];
                    case 1:
                        user_email = _a.sent();
                        if (!user_email || user_email === null || user_email === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Admin with Such Email not found",
                                    data: null
                                })];
                        }
                        return [4 /*yield*/, this.adminAuthService.UpdateAdminProfile(updateAdminDto)];
                    case 2:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            common_1.Logger.log("Profile update failed", "AdminAuthController");
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured, in  updating profile",
                                    data: null
                                })];
                        }
                        else {
                            common_1.Logger.log("Profile updated successfully", "AdminAuthController");
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Profile updated successfully",
                                    data: null
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminAuthController.prototype.toggleTfaStatus = function (body, res) {
        return __awaiter(this, void 0, void 0, function () {
            var admin_id, otp, isAuthStatus, admin_id_int, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        admin_id = body.admin_id, otp = body.otp, isAuthStatus = body.isAuthStatus;
                        console.log(typeof isAuthStatus);
                        console.log(body);
                        admin_id_int = parseInt(admin_id);
                        return [4 /*yield*/, this.adminAuthService.VerifyTFA(admin_id_int, otp)];
                    case 1:
                        result = _a.sent();
                        if (!(!result || result === null || result === undefined)) return [3 /*break*/, 2];
                        common_1.Logger.error("TFA not verified", "AdminAuthController");
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "TFA  Status not changed",
                                data: []
                            })];
                    case 2: return [4 /*yield*/, this.adminAuthService.updateTFAStatus(admin_id_int, isAuthStatus)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                code: "200",
                                status: "success",
                                message: "TFA status updated successfully",
                                data: []
                            })];
                }
            });
        });
    };
    AdminAuthController.prototype.getAdminDetails = function (res, id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, otp_auth_url, otp_secret, resultnew;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Getting Admin Details", "AdminAuthController");
                        return [4 /*yield*/, this.adminAuthService.getAdminById(parseInt(id))];
                    case 1:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            common_1.Logger.log("Admin not found", "AdminAuthController");
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Admin not found",
                                    data: []
                                })];
                        }
                        else {
                            common_1.Logger.log("Admin found", "AdminAuthController");
                            otp_auth_url = result.temp_secret.otpauth_url;
                            otp_secret = result.temp_secret.base32;
                            result.temp_secret = "";
                            result.google_auth_code = "";
                            resultnew = __assign(__assign({}, result), { security_key: otp_secret, otp_auth_url: otp_auth_url });
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Admin found",
                                    data: resultnew
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminAuthController.prototype.loginAdmin = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var email_id, password, result, admin_, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email_id = body.email_id, password = body.password;
                        return [4 /*yield*/, this.adminAuthService.loginAdmin(email_id, password)];
                    case 1:
                        result = _a.sent();
                        if (!(!result || result === null || result === undefined)) return [3 /*break*/, 2];
                        common_1.Logger.log("Login failed", "AdminAuthController");
                        return [2 /*return*/, {
                                code: "400",
                                status: "error",
                                message: "Error Occured in logging in",
                                data: null
                            }];
                    case 2:
                        common_1.Logger.log("Logged in Succesfully", "AdminAuthController");
                        return [4 /*yield*/, this.adminRepository.findOne({
                                where: { email_id: email_id }
                            })];
                    case 3:
                        admin_ = _a.sent();
                        if (!admin_) {
                            return [2 /*return*/, {
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured, no such email found",
                                    data: null
                                }];
                        }
                        token = this.jwtService.sign({
                            admin_id: admin_.admin_id
                        }, { secret: "".concat(process.env.ADMIN_JWT_SECRET), expiresIn: "1080h" });
                        common_1.Logger.log("Admin", admin_.email_id);
                        return [2 /*return*/, {
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
                                    isGoogleAuthEnabled: admin_.google_auth_enabled
                                }
                            }];
                }
            });
        });
    };
    AdminAuthController.prototype.changePassword = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var email, old_password, new_password, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = body.email, old_password = body.old_password, new_password = body.new_password;
                        return [4 /*yield*/, this.adminAuthService.changePassword(email, old_password, new_password)];
                    case 1:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            common_1.Logger.log("Password change failed", "AdminAuthController");
                            return [2 /*return*/, {
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured, in changing password",
                                    data: null
                                }];
                        }
                        else {
                            common_1.Logger.log("Password changed successfully", "AdminAuthController");
                            return [2 /*return*/, {
                                    code: "200",
                                    status: "success",
                                    message: "Password changed successfully",
                                    data: null
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, common_1.Post)("ping")
    ], AdminAuthController.prototype, "ping");
    __decorate([
        (0, common_1.Post)("register"),
        (0, common_1.UsePipes)(common_1.ValidationPipe),
        __param(0, (0, common_1.Body)())
    ], AdminAuthController.prototype, "registerAdmin");
    __decorate([
        (0, common_1.Post)("sendmail"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], AdminAuthController.prototype, "sendMail");
    __decorate([
        (0, common_1.Post)("verifyadmin/tfa"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], AdminAuthController.prototype, "verifyTFA");
    __decorate([
        (0, common_1.Post)("check/email"),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Res)())
    ], AdminAuthController.prototype, "checkEmail");
    __decorate([
        (0, common_1.Post)("/update"),
        (0, common_1.UsePipes)(common_1.ValidationPipe),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Res)())
    ], AdminAuthController.prototype, "UpdateAdminProfile");
    __decorate([
        (0, common_1.Post)("/change/tfatoggle"),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Res)())
    ], AdminAuthController.prototype, "toggleTfaStatus");
    __decorate([
        (0, common_1.Post)("getdetails/admin/:id"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Param)("id"))
    ], AdminAuthController.prototype, "getAdminDetails");
    __decorate([
        (0, common_1.Post)("login"),
        __param(0, (0, common_1.Body)())
    ], AdminAuthController.prototype, "loginAdmin");
    __decorate([
        (0, common_1.Post)("change/password"),
        __param(0, (0, common_1.Body)())
    ], AdminAuthController.prototype, "changePassword");
    AdminAuthController = __decorate([
        (0, common_1.Controller)("admin/auth"),
        __param(0, (0, common_1.Inject)("JWT_SERVICE")),
        __param(1, (0, common_1.Inject)("ADMIN_AUTH_SERVICE")),
        __param(2, (0, common_1.Inject)("MAIL_SERVICE")),
        __param(3, (0, typeorm_1.InjectRepository)(admin_entity_1.moleculus_admin))
    ], AdminAuthController);
    return AdminAuthController;
}());
exports.AdminAuthController = AdminAuthController;
