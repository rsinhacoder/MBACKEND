"use strict";
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
exports.CommonCrudService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var entities_1 = require("../../modules/entities");
var pages_entity_1 = require("../../modules/entities/pages.entity");
var settings_entity_1 = require("../../modules/entities/settings.entity");
var user_entity_1 = require("../../modules/entities/user.entity");
var userNotification_entity_1 = require("../../modules/entities/userNotification.entity");
var entities_2 = require("./../../modules/entities");
var email_template_entity_1 = require("./../../modules/entities/email-template.entity");
var loginLog_entity_1 = require("./../../modules/entities/loginLog.entity");
var pages_entity_2 = require("./../../modules/entities/pages.entity");
var settings_entity_2 = require("./../../modules/entities/settings.entity");
var user_entity_2 = require("./../../modules/entities/user.entity");
require("dotenv").config({ debug: false });
var CommonCrudService = /** @class */ (function () {
    //emailTemplateRepoistory
    function CommonCrudService(indexTokenRepository, notificationRepository, countryRepository, addressRpository, loginLogRepository, sipRepository, sipTransactionsRepository, pagesRepository, settingsRepository, userRepository, emailTemplateEntity, stateRepository, citiesRepository, kycRepository) {
        this.indexTokenRepository = indexTokenRepository;
        this.notificationRepository = notificationRepository;
        this.countryRepository = countryRepository;
        this.addressRpository = addressRpository;
        this.loginLogRepository = loginLogRepository;
        this.sipRepository = sipRepository;
        this.sipTransactionsRepository = sipTransactionsRepository;
        this.pagesRepository = pagesRepository;
        this.settingsRepository = settingsRepository;
        this.userRepository = userRepository;
        this.emailTemplateEntity = emailTemplateEntity;
        this.stateRepository = stateRepository;
        this.citiesRepository = citiesRepository;
        this.kycRepository = kycRepository;
    }
    CommonCrudService.prototype.changeUserDeleteStatus = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Changing user delete status by user_id : ".concat(user_id, " }"), "CommonCrudService");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { user_id: user_id }
                            })];
                    case 2:
                        user = _a.sent();
                        if (!(user.is_deleted == user_entity_2.is_deleted_Enum.Yes)) return [3 /*break*/, 4];
                        user.is_deleted = user_entity_2.is_deleted_Enum.No;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        if (!(user.is_deleted == user_entity_2.is_deleted_Enum.No)) return [3 /*break*/, 6];
                        user.is_deleted = user_entity_2.is_deleted_Enum.Yes;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [4 /*yield*/, this.userRepository.save(user)];
                    case 7: return [2 /*return*/, _a.sent()];
                    case 8:
                        err_1 = _a.sent();
                        common_1.Logger.error(err_1, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudService.prototype.getUserKycDetails = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var kyc_details, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Getting user kyc details by user_id : ".concat(user_id, " }"), "CommonCrudService");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.kycRepository.findOne({
                                where: { kyc_user_id: user_id },
                                order: { kyc_id: "DESC" }
                            })];
                    case 2:
                        kyc_details = _a.sent();
                        if (!kyc_details || kyc_details === null || kyc_details === undefined) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, kyc_details];
                    case 3:
                        e_1 = _a.sent();
                        common_1.Logger.error(e_1, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudService.prototype.getCitiesList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cities, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Getting cities list", "CommonCrudService");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.citiesRepository.find({
                                order: { city_country_id: "DESC", city_name: "ASC" }
                            })];
                    case 2:
                        cities = _a.sent();
                        return [2 /*return*/, cities];
                    case 3:
                        e_2 = _a.sent();
                        common_1.Logger.error(e_2, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudService.prototype.getStateList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var states, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Getting state list", "CommonCrudService");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.stateRepository.find({
                                order: { state_country_id: "DESC", state_name: "ASC" }
                            })];
                    case 2:
                        states = _a.sent();
                        return [2 /*return*/, states];
                    case 3:
                        e_3 = _a.sent();
                        common_1.Logger.error(e_3, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudService.prototype.getCountryList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var countries;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.countryRepository.find({
                            order: { country_name: "ASC" }
                        })];
                    case 1:
                        countries = _a.sent();
                        return [2 /*return*/, countries];
                }
            });
        });
    };
    CommonCrudService.prototype.changeUserStatus = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Changing user status by user_id : ".concat(user_id, " }"), "CommonCrudService");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { user_id: user_id }
                            })];
                    case 2:
                        user = _a.sent();
                        if (!(!user || user === null || user === undefined)) return [3 /*break*/, 3];
                        return [2 /*return*/, null];
                    case 3:
                        if (!(user.status == user_entity_1.status_Enum.Enable)) return [3 /*break*/, 5];
                        user.status = user_entity_1.status_Enum.Disable;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 4:
                        _a.sent();
                        user.password = "";
                        return [2 /*return*/, user];
                    case 5:
                        if (!(user.status == user_entity_1.status_Enum.Disable)) return [3 /*break*/, 7];
                        user.status = user_entity_1.status_Enum.Enable;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 6:
                        _a.sent();
                        user.password = "";
                        return [2 /*return*/, user];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        e_4 = _a.sent();
                        common_1.Logger.error(e_4, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudService.prototype.getSipOfaUserByTokenCode = function (token_code, user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var sip, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Getting sip details by token_code : ".concat(token_code), "CommonCrudService");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.sipTransactionsRepository.find({
                                where: { token_code: token_code, tra_user_id: user_id }
                            })];
                    case 2:
                        sip = _a.sent();
                        // return sip;
                        if (!sip || sip === null || sip === undefined) {
                            return [2 /*return*/, null];
                        }
                        else {
                            return [2 /*return*/, sip];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_5 = _a.sent();
                        common_1.Logger.error(e_5, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudService.prototype.getUserSips = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var user_sips, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Getting user sips by user_id : ".concat(user_id), "CommonCrudService");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.sipRepository.find({
                                where: { sip_user_id: user_id }
                            })];
                    case 2:
                        user_sips = _a.sent();
                        return [2 /*return*/, user_sips];
                    case 3:
                        e_6 = _a.sent();
                        common_1.Logger.error(e_6, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudService.prototype.getNotifications = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var user_check, notifications, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Getting User Notifications by user_id: ".concat(user_id), "CommonCrudService");
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { user_id: user_id }
                            })];
                    case 1:
                        user_check = _a.sent();
                        if (!(!user_check || user_check === null || user_check === undefined)) return [3 /*break*/, 2];
                        return [2 /*return*/, null];
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.notificationRepository.findOne({
                                where: { noti_user_id: user_id }
                            })];
                    case 3:
                        notifications = _a.sent();
                        if (!notifications ||
                            notifications === null ||
                            notifications === undefined) {
                            return [2 /*return*/, null];
                        }
                        else {
                            return [2 /*return*/, notifications];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        err_2 = _a.sent();
                        common_1.Logger.log("Error", "UserService");
                        return [2 /*return*/, null];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudService.prototype.getCountOfRepositoryEntries2 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pageresult, settingresult, emailresult, tokenresult, totalusersresult, totalusersresultindia, enableuserresultIndia, disableuserresultIndia, totalusersresultusa, enableuserresultusa, enableusersusa2, disableuserresultusa, disableuserresult, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Getting Repository entries count of", "CommonCrudService");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 15, , 16]);
                        return [4 /*yield*/, this.pagesRepository.count()];
                    case 2:
                        pageresult = _a.sent();
                        return [4 /*yield*/, this.settingsRepository.count()];
                    case 3:
                        settingresult = _a.sent();
                        return [4 /*yield*/, this.emailTemplateEntity.count({
                                where: { is_deleted: false }
                            })];
                    case 4:
                        emailresult = _a.sent();
                        return [4 /*yield*/, this.indexTokenRepository.count()];
                    case 5:
                        tokenresult = _a.sent();
                        return [4 /*yield*/, this.userRepository.count()];
                    case 6:
                        totalusersresult = _a.sent();
                        return [4 /*yield*/, this.userRepository.count({
                                where: { country_id: 2 }
                            })];
                    case 7:
                        totalusersresultindia = _a.sent();
                        return [4 /*yield*/, this.userRepository.count({
                                where: {
                                    status: user_entity_1.status_Enum.Enable,
                                    country_id: 2
                                }
                            })];
                    case 8:
                        enableuserresultIndia = _a.sent();
                        return [4 /*yield*/, this.userRepository.count({
                                where: {
                                    status: user_entity_1.status_Enum.Disable,
                                    country_id: 2
                                }
                            })];
                    case 9:
                        disableuserresultIndia = _a.sent();
                        return [4 /*yield*/, this.userRepository.count({
                                where: { country_id: 1 }
                            })];
                    case 10:
                        totalusersresultusa = _a.sent();
                        return [4 /*yield*/, this.userRepository.count({
                                where: {
                                    status: user_entity_1.status_Enum.Enable,
                                    country_id: 1
                                }
                            })];
                    case 11:
                        enableuserresultusa = _a.sent();
                        return [4 /*yield*/, this.userRepository
                                .createQueryBuilder("user")
                                .where("user.status = :status", { status: user_entity_1.status_Enum.Enable })
                                .andWhere("user.country_id = :country_id", {
                                country_id: 1
                            })
                                .getCount()];
                    case 12:
                        enableusersusa2 = _a.sent();
                        return [4 /*yield*/, this.userRepository.count({
                                where: {
                                    status: user_entity_1.status_Enum.Disable,
                                    country_id: 1
                                }
                            })];
                    case 13:
                        disableuserresultusa = _a.sent();
                        return [4 /*yield*/, this.userRepository.count({
                                where: { status: user_entity_1.status_Enum.Disable }
                            })];
                    case 14:
                        disableuserresult = _a.sent();
                        return [2 /*return*/, {
                                pageresult: pageresult,
                                settingresult: settingresult,
                                emailresult: emailresult,
                                //indexresult: indexresult,
                                totalusersresultindia: enableuserresultIndia + disableuserresultIndia,
                                enableuserresultIndia: enableuserresultIndia,
                                disableuserresultindia: disableuserresultIndia,
                                totalusersresultusa: enableuserresultusa + disableuserresultusa,
                                //enableuserresultusa: enableuserresultusa,
                                enableuserresultusa: enableusersusa2,
                                disableuserresultusa: disableuserresultusa,
                                disableuserresult: disableuserresult,
                                tokenresult: tokenresult,
                                totalusersresult: totalusersresult
                            }];
                    case 15:
                        e_7 = _a.sent();
                        common_1.Logger.error(e_7, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudService.prototype.getById = function (id, repository) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_8, e_9, e_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.warn("Getting ".concat(repository, " Repository entry by id: ").concat(id), "CommonCrudService");
                        if (!(repository === "pages" || repository === "pages_entity")) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.pagesRepository.findOne({
                                where: { pagetitle_id: id }
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        e_8 = _a.sent();
                        common_1.Logger.error(e_8, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 4:
                        if (!(repository === "settings" || repository === "settings_entity")) return [3 /*break*/, 8];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.settingsRepository.findOne({
                                where: { setting_id: id }
                            })];
                    case 6:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 7:
                        e_9 = _a.sent();
                        common_1.Logger.error(e_9, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 8:
                        if (!(repository === "email_templates" ||
                            repository === "email_templates_entity")) return [3 /*break*/, 12];
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, this.emailTemplateEntity.findOne({
                                where: { email_template_id: id }
                            })];
                    case 10:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 11:
                        e_10 = _a.sent();
                        common_1.Logger.error(e_10, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudService.prototype.getAddressDetails = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var address, e_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Getting address details by id --: ".concat(id), "CommonCrudService");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.addressRpository.findOne({
                                where: { user_address_id: id }
                            })];
                    case 2:
                        address = _a.sent();
                        return [2 /*return*/, address];
                    case 3:
                        e_11 = _a.sent();
                        common_1.Logger.error(e_11, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudService.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.userRepository.find({
                            order: { user_id: "DESC" }
                        })];
                }
                catch (err) {
                    common_1.Logger.log("Error", "UserService");
                    return [2 /*return*/, null];
                }
                return [2 /*return*/];
            });
        });
    };
    CommonCrudService.prototype.getUserDetailsById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Getting User Details by id: ".concat(id), "CommonCrudService");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { user_id: id }
                            })];
                    case 2:
                        //arrange in ascending order:
                        result = _a.sent();
                        common_1.Logger.log("User Details by id: ".concat(id, " Got"), "CommonCrudService");
                        return [2 /*return*/, result];
                    case 3:
                        e_12 = _a.sent();
                        common_1.Logger.error(e_12, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudService.prototype.updateUserById = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var user, user_address, e_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Updating user by id: ".concat(id, " with data: ").concat(JSON.stringify(data)), "CommonCrudService");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { user_id: id }
                            })];
                    case 2:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 7];
                        if (data.first_name != null) {
                            user.first_name = data.first_name;
                        }
                        if (data.last_name != null) {
                            user.last_name = data.last_name;
                        }
                        if (data.email != null) {
                            user.email_id = data.email;
                        }
                        if (data.mobileNumber != null) {
                            user.phone_number = data.mobileNumber;
                        }
                        if (data.dob != null) {
                            user.dob = data.dob;
                        }
                        if (data.tin != null) {
                            user.tin = data.tin;
                        }
                        if (data.citizenship != null) {
                            user.citizenship = data.citizenship;
                        }
                        if (data.zipcode != null) {
                            user.zipcode = data.zipcode;
                        }
                        if (data.city != null) {
                            user.city = data.city;
                        }
                        if (data.state != null) {
                            user.state_name = data.state;
                        }
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.addressRpository.findOne({
                                where: { user_address_id: id }
                            })];
                    case 4:
                        user_address = _a.sent();
                        if (!user_address) return [3 /*break*/, 6];
                        if (data.address1 != null) {
                            user_address.address_line1 = data.address1;
                        }
                        if (data.address2 != null) {
                            user_address.address_line2 = data.address2;
                        }
                        if (data.other_info != null) {
                            user_address.other_info = data.other_info;
                        }
                        return [4 /*yield*/, this.addressRpository.save(user_address)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, user];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        e_13 = _a.sent();
                        common_1.Logger.error(e_13, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 9: return [2 /*return*/, true];
                }
            });
        });
    };
    CommonCrudService.prototype.updateSettingsById = function (id, updateSettingDto) {
        return __awaiter(this, void 0, void 0, function () {
            var settings, e_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Updating settings by id: ".concat(id, " )}"), "CommonCrudService");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.settingsRepository.findOne({
                                where: { setting_id: id }
                            })];
                    case 2:
                        settings = _a.sent();
                        if (!settings) return [3 /*break*/, 4];
                        if (updateSettingDto.setting_value != null) {
                            settings.setting_value = updateSettingDto.setting_value;
                        }
                        return [4 /*yield*/, this.settingsRepository.save(settings)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, settings];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_14 = _a.sent();
                        common_1.Logger.error(e_14, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 6: return [2 /*return*/, true];
                }
            });
        });
    };
    CommonCrudService.prototype.getEnabledUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.userRepository.count({
                            where: { status: user_entity_1.status_Enum.Enable }
                        })];
                }
                catch (err) {
                    common_1.Logger.log("Error", "UserService");
                    return [2 /*return*/, null];
                }
                return [2 /*return*/];
            });
        });
    };
    CommonCrudService.prototype.getDisabledUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.userRepository.count({
                            where: { status: user_entity_1.status_Enum.Disable }
                        })];
                }
                catch (err) {
                    common_1.Logger.log("Error", "UserService");
                    return [2 /*return*/, null];
                }
                return [2 /*return*/];
            });
        });
    };
    CommonCrudService.prototype.getAll = function (repository) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_15, e_16, e_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Getting ".concat(repository, " Repository entries"), "CommonCrudService");
                        if (!(repository === "pages" || repository === "pages_entity")) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.pagesRepository.find({
                                order: {
                                    pagetitle_id: "ASC"
                                }
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        e_15 = _a.sent();
                        common_1.Logger.error(e_15, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 4:
                        if (!(repository === "settings" || repository === "settings_entity")) return [3 /*break*/, 8];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.settingsRepository.find({
                                order: {
                                    setting_id: "ASC"
                                }
                            })];
                    case 6:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 7:
                        e_16 = _a.sent();
                        common_1.Logger.error(e_16, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 8:
                        if (!(repository === "email_templates" ||
                            repository === "email_templates_entity")) return [3 /*break*/, 13];
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, this.emailTemplateEntity.find({
                                order: {
                                    email_template_id: "ASC"
                                }
                            })];
                    case 10:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 11:
                        e_17 = _a.sent();
                        common_1.Logger.error(e_17, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        common_1.Logger.error("".concat(repository, " Repository not found"), "CommonCrudService");
                        return [2 /*return*/, null];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudService.prototype.getRepoContent = function (repository) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_18, e_19, e_20, e_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.warn("Getting ".concat(repository, " Repository's content"), "CommonCrudService");
                        if (!(repository === "pages" || repository === "pages_entity")) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.pagesRepository.find({})];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        e_18 = _a.sent();
                        common_1.Logger.error(e_18, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 4:
                        if (!(repository === "settings" || repository === "settings_entity")) return [3 /*break*/, 8];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.settingsRepository.find({})];
                    case 6:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 7:
                        e_19 = _a.sent();
                        common_1.Logger.error(e_19, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 8:
                        if (!(repository === "email_templates" ||
                            repository === "email_templates_entity")) return [3 /*break*/, 12];
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, this.settingsRepository.find({})];
                    case 10:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 11:
                        e_20 = _a.sent();
                        common_1.Logger.error(e_20, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 12:
                        if (!(repository === "login_log" || repository === "login_log_entity")) return [3 /*break*/, 16];
                        _a.label = 13;
                    case 13:
                        _a.trys.push([13, 15, , 16]);
                        return [4 /*yield*/, this.loginLogRepository.find({
                                order: {
                                    log_in_datetime: "DESC"
                                }
                            })];
                    case 14:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 15:
                        e_21 = _a.sent();
                        common_1.Logger.error(e_21, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudService.prototype.updateStatus = function (id, repository) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_22, e_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.warn("Updating ".concat(repository, " Repository's status entry by id: ").concat(id), "CommonCrudService");
                        if (!(repository === "pages" || repository === "pages_entity")) return [3 /*break*/, 8];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, this.pagesRepository.findOne({
                                where: { pagetitle_id: id }
                            })];
                    case 2:
                        result = _a.sent();
                        if (!result.page_status || result.page_status === null) {
                            return [2 /*return*/, null];
                        }
                        if (!(result.page_status === pages_entity_2.page_status_enum.Enable)) return [3 /*break*/, 4];
                        result.page_status = pages_entity_2.page_status_enum.Disable;
                        return [4 /*yield*/, this.pagesRepository.save(result)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        if (!(result.page_status === pages_entity_2.page_status_enum.Disable)) return [3 /*break*/, 6];
                        result.page_status = pages_entity_2.page_status_enum.Enable;
                        return [4 /*yield*/, this.pagesRepository.save(result)];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_22 = _a.sent();
                        common_1.Logger.error(e_22, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 8:
                        if (!(repository === "settings" || repository === "settings_entity")) return [3 /*break*/, 16];
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 15, , 16]);
                        return [4 /*yield*/, this.settingsRepository.findOne({
                                where: { setting_id: id }
                            })];
                    case 10:
                        result = _a.sent();
                        if (!result.setting_status || result.setting_status === null) {
                            return [2 /*return*/, null];
                        }
                        if (!(result.setting_status === settings_entity_2.setting_status_enum.Enable)) return [3 /*break*/, 12];
                        result.setting_status = settings_entity_2.setting_status_enum.Disable;
                        return [4 /*yield*/, this.settingsRepository.save(result)];
                    case 11: return [2 /*return*/, _a.sent()];
                    case 12:
                        if (!(result.setting_status === settings_entity_2.setting_status_enum.Disable)) return [3 /*break*/, 14];
                        result.setting_status = settings_entity_2.setting_status_enum.Enable;
                        return [4 /*yield*/, this.settingsRepository.save(result)];
                    case 13: return [2 /*return*/, _a.sent()];
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        e_23 = _a.sent();
                        common_1.Logger.error(e_23, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudService.prototype.deleteSoft = function (id, repository) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_24, e_25, e_26;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Deleting ".concat(repository, " Repository entry by id: ").concat(id), "CommonCrudService");
                        if (!(repository === "pages" || repository === "pages_entity")) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.pagesRepository.findOne({
                                where: { pagetitle_id: id }
                            })];
                    case 2:
                        result = _a.sent();
                        result.is_deleted = true;
                        return [4 /*yield*/, this.pagesRepository.save(result)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        e_24 = _a.sent();
                        common_1.Logger.error(e_24, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 5:
                        if (!(repository === "settings" || repository === "settings_entity")) return [3 /*break*/, 10];
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 9, , 10]);
                        return [4 /*yield*/, this.settingsRepository.findOne({
                                where: { setting_id: id }
                            })];
                    case 7:
                        result = _a.sent();
                        result.is_deleted = true;
                        return [4 /*yield*/, this.settingsRepository.save(result)];
                    case 8: return [2 /*return*/, _a.sent()];
                    case 9:
                        e_25 = _a.sent();
                        common_1.Logger.error(e_25, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 10:
                        if (!(repository === "email_templates" ||
                            repository === "email_templates_entity")) return [3 /*break*/, 15];
                        _a.label = 11;
                    case 11:
                        _a.trys.push([11, 14, , 15]);
                        return [4 /*yield*/, this.settingsRepository.findOne({
                                where: { setting_id: id }
                            })];
                    case 12:
                        result = _a.sent();
                        result.is_deleted = true;
                        return [4 /*yield*/, this.settingsRepository.save(result)];
                    case 13: return [2 /*return*/, _a.sent()];
                    case 14:
                        e_26 = _a.sent();
                        common_1.Logger.error(e_26, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudService.prototype.getCountOfRepositoryEntries = function (repository) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_27, e_28, e_29;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Getting Repository entries count of ".concat(repository), "CommonCrudService");
                        if (!(repository === "pages" || repository === "pages_entity")) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.pagesRepository.count()];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        e_27 = _a.sent();
                        common_1.Logger.error(e_27, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 4:
                        if (!(repository === "settings" || repository === "settings_entity")) return [3 /*break*/, 8];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.settingsRepository.count()];
                    case 6:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 7:
                        e_28 = _a.sent();
                        common_1.Logger.error(e_28, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 8:
                        if (!(repository === "email_templates" ||
                            repository === "email_templates_entity")) return [3 /*break*/, 12];
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, this.emailTemplateEntity.count()];
                    case 10:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 11:
                        e_29 = _a.sent();
                        common_1.Logger.error(e_29, "CommonCrudService");
                        return [2 /*return*/, null];
                    case 12:
                        common_1.Logger.error("".concat(repository, " Repository not found"), "CommonCrudService");
                        return [2 /*return*/, null];
                }
            });
        });
    };
    CommonCrudService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(entities_2.moleculus_index_tokens)),
        __param(1, (0, typeorm_1.InjectRepository)(userNotification_entity_1.moleculus_user_notification)),
        __param(2, (0, typeorm_1.InjectRepository)(entities_2.moleculus_countries)),
        __param(3, (0, typeorm_1.InjectRepository)(entities_2.moleculus_user_address)),
        __param(4, (0, typeorm_1.InjectRepository)(loginLog_entity_1.moleculus_login_log)),
        __param(5, (0, typeorm_1.InjectRepository)(entities_1.moleculus_sip)),
        __param(6, (0, typeorm_1.InjectRepository)(entities_1.moleculus_sip_transactions)),
        __param(7, (0, typeorm_1.InjectRepository)(pages_entity_1.moleculus_pages)),
        __param(8, (0, typeorm_1.InjectRepository)(settings_entity_1.moleculus_settings)),
        __param(9, (0, typeorm_1.InjectRepository)(user_entity_2.moleculus_user)),
        __param(10, (0, typeorm_1.InjectRepository)(email_template_entity_1.moleculus_email_template)),
        __param(11, (0, typeorm_1.InjectRepository)(entities_1.moleculus_states)),
        __param(12, (0, typeorm_1.InjectRepository)(entities_1.moleculus_cities)),
        __param(13, (0, typeorm_1.InjectRepository)(entities_2.moleculus_user_kyc))
    ], CommonCrudService);
    return CommonCrudService;
}());
exports.CommonCrudService = CommonCrudService;
