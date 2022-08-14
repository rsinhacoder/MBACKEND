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
exports.CommonCrudController = void 0;
var common_1 = require("@nestjs/common");
var CommonCrudController = /** @class */ (function () {
    function CommonCrudController(mailService, commonCrudService) {
        this.mailService = mailService;
        this.commonCrudService = commonCrudService;
    }
    CommonCrudController.prototype.getNotifications = function (res, userid) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Get all notifications");
                        return [4 /*yield*/, this.commonCrudService.getNotifications(parseInt(userid))];
                    case 1:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    message: "No notifications found",
                                    code: "400",
                                    status: "error",
                                    data: null
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    message: "Notifications found",
                                    code: "200",
                                    status: "success",
                                    data: result
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudController.prototype.getUserKycDetails = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, user_check, user_name, email, document_type, document_value, country_id, country, user_kyc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = body.user_id;
                        return [4 /*yield*/, this.commonCrudService.getUserDetailsById(user_id)];
                    case 1:
                        user_check = _a.sent();
                        user_name = user_check.first_name.toUpperCase() +
                            " " +
                            user_check.last_name.toUpperCase();
                        email = user_check.email_id;
                        document_type = user_check.document_type;
                        document_value = user_check.document_value;
                        country_id = user_check.country_id;
                        country = "";
                        country_id == 1 ? (country = "USA") : (country = "INDIA");
                        if (!user_check || user_check == undefined || user_check == null) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error, No suh user present",
                                    data: null
                                })];
                        }
                        return [4 /*yield*/, this.commonCrudService.getUserKycDetails(user_id)];
                    case 2:
                        user_kyc = _a.sent();
                        if (!user_kyc || user_kyc == undefined || user_kyc == null) {
                            return [2 /*return*/, res.status(201).json({
                                    code: "201",
                                    status: "error",
                                    message: "NO_KYC_FOUND",
                                    data: null
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "User kyc details found",
                                    data: __assign(__assign({}, user_kyc), { user_name: user_name, country: country, email: email, document_type: document_type, document_value: document_value })
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudController.prototype.getUserSips = function (res, id) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = parseInt(id);
                        return [4 /*yield*/, this.commonCrudService.getUserSips(user_id)];
                    case 1:
                        user = _a.sent();
                        if (!user || user == null || user == undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error occured , No such user",
                                    data: null
                                })];
                        }
                        else {
                            //const user_sips = await this.usersService.getUserSips(user_id);
                            //if (!user_sips || user_sips == null || user_sips == undefined) {
                            //   return res.status(400).json({
                            //     code: "400",
                            //     status: "error",
                            //     message: "Error occured , No Sips found",
                            //     data: null,
                            //   });
                            // }
                            //else {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "User SIPs",
                                    data: user
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //Get all users:
    CommonCrudController.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Get all users");
                        return [4 /*yield*/, this.commonCrudService.getAllUsers()];
                    case 1:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            return [2 /*return*/, result];
                        }
                        else {
                            //undefine password for each user:
                            result.forEach(function (user) {
                                user.password = undefined;
                                user.temp_secret
                                    ? (user.temp_secret.base32 =
                                        user.temp_secret.ascii =
                                            user.temp_secret.hex =
                                                undefined)
                                    : "";
                            });
                            return [2 /*return*/, result];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudController.prototype.GetRepositoyEntriesCount2 = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Get all users");
                        return [4 /*yield*/, this.commonCrudService.getCountOfRepositoryEntries2()];
                    case 1:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured in getting count of repository entries",
                                    data: null
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Data found",
                                    data: result
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudController.prototype.getSIPByTokenCode = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var token_code, user_id, required_sip;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token_code = body.token_code, user_id = body.user_id;
                        token_code = "MFV-50";
                        return [4 /*yield*/, this.commonCrudService.getSipOfaUserByTokenCode(token_code, user_id)];
                    case 1:
                        required_sip = _a.sent();
                        if (!required_sip || required_sip == undefined || required_sip == null) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured, No SIP found for given index token! ",
                                    data: []
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "SIP fetched for the user successfully",
                                    data: required_sip
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudController.prototype.update = function (res, id, updateUserByAdminDto) {
        return __awaiter(this, void 0, void 0, function () {
            var id_, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id_ = parseInt(id);
                        return [4 /*yield*/, this.commonCrudService.updateUserById(id_, updateUserByAdminDto)];
                    case 1:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured, No such user",
                                    data: null
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "User updated successfully",
                                    data: null
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudController.prototype.updateSettings = function (res, updateSettingsDto) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.commonCrudService.updateSettingsById(parseInt(updateSettingsDto.setting_id), updateSettingsDto)];
                    case 1:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured in updating settings",
                                    data: null
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Settings updated successfully",
                                    data: null
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudController.prototype.getEnabledUsers = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.commonCrudService.getEnabledUsers()];
                    case 1:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured in getting enabled users",
                                    data: 0
                                })];
                        }
                        else {
                            //undefine password for each user:
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Enabled Users Fetched Successfully",
                                    data: result
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudController.prototype.getCitiesList = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.commonCrudService.getCitiesList()];
                    case 1:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured in getting cities list",
                                    data: []
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Cities List Fetched Successfully",
                                    data: result
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudController.prototype.getStatesList = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var states;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.commonCrudService.getStateList()];
                    case 1:
                        states = _a.sent();
                        if (!states || states === null || states === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured in getting states",
                                    data: null
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "States Fetched Successfully",
                                    data: states
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudController.prototype.getCountryList = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.commonCrudService.getCountryList()];
                    case 1:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured in getting country list",
                                    data: null
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Country List Fetched Successfully",
                                    data: result
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudController.prototype.changeUserDeleteStatus = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, user_check, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = body.user_id;
                        return [4 /*yield*/, this.commonCrudService.getUserDetailsById(user_id)];
                    case 1:
                        user_check = _a.sent();
                        if (!(!user_check || user_check === null || user_check === undefined)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "Error Occured, No such user found",
                                data: []
                            })];
                    case 2: return [4 /*yield*/, this.commonCrudService.changeUserDeleteStatus(parseInt(user_id))];
                    case 3:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured, No such user found",
                                    data: []
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "User Deleted Successfully",
                                    data: result
                                })];
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudController.prototype.changeUserStatus = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, user_check, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = body.user_id;
                        return [4 /*yield*/, this.commonCrudService.getUserDetailsById(user_id)];
                    case 1:
                        user_check = _a.sent();
                        if (!user_check || user_check == null || user_check == undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured in getting user",
                                    data: []
                                })];
                        }
                        return [4 /*yield*/, this.commonCrudService.changeUserStatus(user_id)];
                    case 2:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured in changing user status",
                                    data: []
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "User status changed successfully",
                                    data: null
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudController.prototype.getDisabledUsers = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.commonCrudService.getDisabledUsers()];
                    case 1:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured in getting disabled users",
                                    data: null
                                })];
                        }
                        else {
                            //undefine password for each user:
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Disabled Users Fetched Successfully",
                                    data: result
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //Get All Records:
    CommonCrudController.prototype.getAllRecords = function (res, repository) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Get all records");
                        return [4 /*yield*/, this.commonCrudService.getAll(repository)];
                    case 1:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured in getting all records",
                                    data: null
                                })];
                        }
                        return [2 /*return*/, res.status(200).json({
                                code: "200",
                                status: "success",
                                message: "Data found successfully",
                                data: result
                            })];
                }
            });
        });
    };
    //Get By Id:
    CommonCrudController.prototype.getAll = function (res, repository, id) {
        return __awaiter(this, void 0, void 0, function () {
            var id_, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id_ = parseInt(id);
                        return [4 /*yield*/, this.commonCrudService.getById(id_, repository)];
                    case 1:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured in getting all records of repository",
                                    data: null
                                })];
                        }
                        else {
                            result.created_datetime = result.created_ip = undefined;
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Data found",
                                    data: result
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudController.prototype.getRepoContent = function (res, repository) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.commonCrudService.getRepoContent(repository)];
                    case 1:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured",
                                    data: null
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Data found",
                                    data: result
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //Toggle status:
    CommonCrudController.prototype.toggleStatus = function (res, repository, id) {
        return __awaiter(this, void 0, void 0, function () {
            var id_, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id_ = parseInt(id);
                        return [4 /*yield*/, this.commonCrudService.updateStatus(id_, repository)];
                    case 1:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured",
                                    data: null
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Status updated successfully",
                                    data: {}
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudController.prototype.GetRepositoyEntriesCount = function (res, repository) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.commonCrudService.getCountOfRepositoryEntries(repository)];
                    case 1:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured",
                                    data: null
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Data found",
                                    data: result
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudController.prototype.getAddressDetails = function (res, id) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = parseInt(id);
                        return [4 /*yield*/, this.commonCrudService.getAddressDetails(user_id)];
                    case 1:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured",
                                    data: null
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Data found",
                                    data: result
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudController.prototype.getUserById = function (res, id) {
        return __awaiter(this, void 0, void 0, function () {
            var id_, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Get user by id");
                        id_ = parseInt(id);
                        return [4 /*yield*/, this.commonCrudService.getUserDetailsById(id_)];
                    case 1:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured",
                                    data: null
                                })];
                        }
                        else {
                            result.password = undefined;
                            result.authauth_o_response = undefined;
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Data found",
                                    data: result
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CommonCrudController.prototype.deleteSoft = function (res, repository, id) {
        return __awaiter(this, void 0, void 0, function () {
            var id_, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id_ = parseInt(id);
                        return [4 /*yield*/, this.commonCrudService.deleteSoft(id_, repository)];
                    case 1:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured",
                                    data: null
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Data deleted successfully",
                                    data: {}
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, common_1.Put)("/getusernotifications/:userid"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Param)("userid"))
    ], CommonCrudController.prototype, "getNotifications");
    __decorate([
        (0, common_1.Post)("/getuserkycdetails"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], CommonCrudController.prototype, "getUserKycDetails");
    __decorate([
        (0, common_1.Get)("getusersips/:id"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Param)("id"))
    ], CommonCrudController.prototype, "getUserSips");
    __decorate([
        (0, common_1.Get)("/allusers")
    ], CommonCrudController.prototype, "getAllUsers");
    __decorate([
        (0, common_1.Post)("/gettingcount"),
        __param(0, (0, common_1.Res)())
    ], CommonCrudController.prototype, "GetRepositoyEntriesCount2");
    __decorate([
        (0, common_1.Post)("/getsipbytokencode"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], CommonCrudController.prototype, "getSIPByTokenCode");
    __decorate([
        (0, common_1.Put)("/update/user/:id"),
        (0, common_1.UsePipes)(common_1.ValidationPipe),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Param)("id")),
        __param(2, (0, common_1.Body)())
    ], CommonCrudController.prototype, "update");
    __decorate([
        (0, common_1.Post)("/update/settings"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], CommonCrudController.prototype, "updateSettings");
    __decorate([
        (0, common_1.Get)("/allenabledusers"),
        __param(0, (0, common_1.Res)())
    ], CommonCrudController.prototype, "getEnabledUsers");
    __decorate([
        (0, common_1.Post)("/getcitieslist"),
        __param(0, (0, common_1.Res)())
    ], CommonCrudController.prototype, "getCitiesList");
    __decorate([
        (0, common_1.Post)("/getstateslist"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], CommonCrudController.prototype, "getStatesList");
    __decorate([
        (0, common_1.Post)("/getcountrylist"),
        __param(0, (0, common_1.Res)())
    ], CommonCrudController.prototype, "getCountryList");
    __decorate([
        (0, common_1.Post)("/changeuserdeletestatus"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], CommonCrudController.prototype, "changeUserDeleteStatus");
    __decorate([
        (0, common_1.Post)("/changeuserstatus"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], CommonCrudController.prototype, "changeUserStatus");
    __decorate([
        (0, common_1.Get)("/alldisabledusers"),
        __param(0, (0, common_1.Res)())
    ], CommonCrudController.prototype, "getDisabledUsers");
    __decorate([
        (0, common_1.Get)("/:repository"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Param)("repository"))
    ], CommonCrudController.prototype, "getAllRecords");
    __decorate([
        (0, common_1.Get)(":repository/:id"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Param)("repository")),
        __param(2, (0, common_1.Param)("id"))
    ], CommonCrudController.prototype, "getAll");
    __decorate([
        (0, common_1.Post)(":repository/content"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Param)("repository"))
    ], CommonCrudController.prototype, "getRepoContent");
    __decorate([
        (0, common_1.Get)("updateStatus/:repository/:id"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Param)("repository")),
        __param(2, (0, common_1.Param)("id"))
    ], CommonCrudController.prototype, "toggleStatus");
    __decorate([
        (0, common_1.Post)("/getcount/:repository"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Param)("repository"))
    ], CommonCrudController.prototype, "GetRepositoyEntriesCount");
    __decorate([
        (0, common_1.Put)("/addressdetails/:id"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Param)("id"))
    ], CommonCrudController.prototype, "getAddressDetails");
    __decorate([
        (0, common_1.Put)("/userdetails/:id"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Param)("id"))
    ], CommonCrudController.prototype, "getUserById");
    __decorate([
        (0, common_1.Delete)(":repository/:id"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Param)("repository")),
        __param(2, (0, common_1.Param)("id"))
    ], CommonCrudController.prototype, "deleteSoft");
    CommonCrudController = __decorate([
        (0, common_1.Controller)("admin/common"),
        __param(0, (0, common_1.Inject)("MAIL_SERVICE")),
        __param(1, (0, common_1.Inject)("CRUD_SERVICE"))
    ], CommonCrudController);
    return CommonCrudController;
}());
exports.CommonCrudController = CommonCrudController;
