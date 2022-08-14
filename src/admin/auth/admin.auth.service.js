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
exports.AdminAuthService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var axios_1 = require("axios");
var admin_entity_1 = require("../../modules/entities/admin.entity");
var bcrypt_1 = require("./utils/bcrypt");
var speakeasy = require("speakeasy");
require("dotenv").config({ debug: false });
var AdminAuthService = /** @class */ (function () {
    function AdminAuthService(jwtService, adminRepository) {
        this.jwtService = jwtService;
        this.adminRepository = adminRepository;
    }
    AdminAuthService.prototype.updateTFAStatus = function (admin_id, isAuthStatus) {
        return __awaiter(this, void 0, void 0, function () {
            var admin, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.getAdminById(admin_id)];
                    case 1:
                        admin = _a.sent();
                        if (!(isAuthStatus === true)) return [3 /*break*/, 3];
                        admin.google_auth_enabled = admin_entity_1.google_auth_enabled_Enum.Disable;
                        return [4 /*yield*/, this.adminRepository.save(admin)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        if (!(isAuthStatus === false)) return [3 /*break*/, 5];
                        admin.google_auth_enabled = admin_entity_1.google_auth_enabled_Enum.Enable;
                        return [4 /*yield*/, this.adminRepository.save(admin)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        common_1.Logger.error(e_1);
                        return [2 /*return*/, null];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AdminAuthService.prototype.VerifyTFA = function (admin_id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var admin, secret, verified, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminRepository.findOne({
                            where: {
                                admin_id: admin_id
                            }
                        })];
                    case 1:
                        admin = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        secret = admin.temp_secret.base32;
                        return [4 /*yield*/, speakeasy.totp.verify({
                                secret: secret,
                                encoding: "base32",
                                token: token
                            })];
                    case 3:
                        verified = _a.sent();
                        if (verified) {
                            return [2 /*return*/, true];
                        }
                        else {
                            common_1.Logger.error("Invalid TFA Code");
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, verified];
                    case 4:
                        error_1 = _a.sent();
                        common_1.Logger.error(error_1, "AdminAuthService");
                        return [2 /*return*/, null];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AdminAuthService.prototype.getAdminById = function (admin_id) {
        return __awaiter(this, void 0, void 0, function () {
            var admin, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.adminRepository.findOne({
                                where: { admin_id: admin_id }
                            })];
                    case 1:
                        admin = _a.sent();
                        if (!admin || admin === null || admin === undefined) {
                            return [2 /*return*/, null];
                        }
                        else {
                            admin.password = undefined;
                            return [2 /*return*/, admin];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        common_1.Logger.error(error_2, "AdminAuthService");
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminAuthService.prototype.generateRandomUniqueDigits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var length, result, characters, charactersLength, i;
            return __generator(this, function (_a) {
                length = 5;
                result = "";
                characters = "0123456789";
                charactersLength = characters.length;
                for (i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return [2 /*return*/, result];
            });
        });
    };
    AdminAuthService.prototype.checkEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var check_admin, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.adminRepository.findOne({
                                where: { email_id: email }
                            })];
                    case 1:
                        check_admin = _a.sent();
                        if (!check_admin || check_admin === null || check_admin === undefined) {
                            return [2 /*return*/, null];
                        }
                        else {
                            check_admin.password = "";
                            return [2 /*return*/, check_admin];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        common_1.Logger.error(error_3, "AdminAuthService");
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminAuthService.prototype.registerAdmin = function (createAdminDto) {
        return __awaiter(this, void 0, void 0, function () {
            var temp_secret, password_encoded, admin, req_data, uniqueDigits, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, speakeasy.generateSecret()];
                    case 1:
                        temp_secret = _a.sent();
                        password_encoded = (0, bcrypt_1.encodePasswordAdmin)(createAdminDto.password);
                        admin = this.adminRepository.create(__assign(__assign({}, createAdminDto), { password: password_encoded }));
                        admin.temp_secret = temp_secret;
                        admin.google_auth_code = temp_secret.base32;
                        return [4 /*yield*/, this.adminRepository.save(admin)];
                    case 2:
                        _a.sent();
                        admin.first_name = createAdminDto.first_name;
                        admin.last_name = createAdminDto.last_name;
                        admin.email_id = createAdminDto.email_id;
                        admin.password = password_encoded;
                        admin.created_datetime = new Date();
                        return [4 /*yield*/, axios_1["default"]
                                .get("https://ipinfo.io")
                                .then(function (res) { return res.data; })];
                    case 3:
                        req_data = _a.sent();
                        admin.created_ip = req_data ? req_data.ip : "";
                        return [4 /*yield*/, this.generateRandomUniqueDigits()];
                    case 4:
                        uniqueDigits = _a.sent();
                        admin.admin_slug =
                            createAdminDto.first_name.toLowerCase() +
                                "_" +
                                createAdminDto.last_name.toLowerCase() +
                                "_" +
                                uniqueDigits;
                        return [4 /*yield*/, this.adminRepository.save(admin)];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6:
                        error_4 = _a.sent();
                        common_1.Logger.error(error_4, "AdminAuthService");
                        return [2 /*return*/, null];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AdminAuthService.prototype.loginAdmin = function (email_id, password) {
        return __awaiter(this, void 0, void 0, function () {
            var check_admin, password_encoded, is_verified, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.adminRepository.findOne({
                                where: { email_id: email_id }
                            })];
                    case 1:
                        check_admin = _a.sent();
                        if (!check_admin) {
                            return [2 /*return*/, null];
                        }
                        password_encoded = check_admin.password;
                        is_verified = (0, bcrypt_1.comparePasswordAdmin)(password, password_encoded);
                        if (!is_verified || is_verified === null || is_verified === undefined) {
                            return [2 /*return*/, null];
                        }
                        else {
                            return [2 /*return*/, true];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        common_1.Logger.error(error_5, "AdminAuthService");
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminAuthService.prototype.UpdateAdminProfile = function (updateAdminDto) {
        return __awaiter(this, void 0, void 0, function () {
            var admin_id, admin;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("UpdateAdminProfile ".concat(updateAdminDto.admin_id), "AdminAuthService");
                        admin_id = updateAdminDto.admin_id;
                        return [4 /*yield*/, this.adminRepository.findOne({
                                where: { admin_id: parseInt(admin_id) }
                            })];
                    case 1:
                        admin = _a.sent();
                        if (!(!admin || admin === null || admin === undefined)) return [3 /*break*/, 2];
                        common_1.Logger.error("Admin not found", "AdminAuthService");
                        return [2 /*return*/, null];
                    case 2:
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
                        return [4 /*yield*/, this.adminRepository.save(admin)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AdminAuthService.prototype.ChangePasswordForced = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var check_admin, new_password, password_encoded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("ChangePasswordForced", "AdminAuthService");
                        return [4 /*yield*/, this.adminRepository.findOne({
                                where: { email_id: email }
                            })];
                    case 1:
                        check_admin = _a.sent();
                        if (!(!check_admin || check_admin === null || check_admin === undefined)) return [3 /*break*/, 2];
                        return [2 /*return*/, null];
                    case 2:
                        new_password = "admin_";
                        password_encoded = (0, bcrypt_1.encodePasswordAdmin)(new_password);
                        check_admin.password = password_encoded;
                        return [4 /*yield*/, this.adminRepository.save(check_admin)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, new_password];
                }
            });
        });
    };
    AdminAuthService.prototype.changePassword = function (email, old_password, new_password) {
        return __awaiter(this, void 0, void 0, function () {
            var check_admin, verified, password_encoded, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.adminRepository.findOne({
                                where: { email_id: email }
                            })];
                    case 1:
                        check_admin = _a.sent();
                        if (!(!check_admin || check_admin === null || check_admin === undefined)) return [3 /*break*/, 2];
                        return [2 /*return*/, null];
                    case 2:
                        verified = (0, bcrypt_1.comparePasswordAdmin)(old_password, check_admin.password);
                        if (!!verified) return [3 /*break*/, 3];
                        return [2 /*return*/, null];
                    case 3:
                        if (!verified) return [3 /*break*/, 5];
                        password_encoded = (0, bcrypt_1.encodePasswordAdmin)(new_password);
                        check_admin.password = password_encoded;
                        return [4 /*yield*/, this.adminRepository.save(check_admin)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [2 /*return*/, null];
                    case 6:
                        error_6 = _a.sent();
                        common_1.Logger.error(error_6, "AdminAuthService");
                        return [2 /*return*/, null];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AdminAuthService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, common_1.Inject)("JWT_SERVICE")),
        __param(1, (0, typeorm_1.InjectRepository)(admin_entity_1.moleculus_admin))
    ], AdminAuthService);
    return AdminAuthService;
}());
exports.AdminAuthService = AdminAuthService;
