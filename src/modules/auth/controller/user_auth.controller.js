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
exports.ControllerController = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var axios_1 = require("axios");
var bcrypt_1 = require("../../../../../../../../../src/utils/bcrypt/bcrypt");
var encryption_1 = require("../../../../../../../../../src/utils/bcrypt/encryption");
var speakeasy = require("speakeasy");
var entities_1 = require("../../../../../../../../../src/modules/entities");
var loginLog_entity_1 = require("../../entities/loginLog.entity");
var user_entity_1 = require("../../entities/user.entity");
require("dotenv").config({ debug: false });
var jwt = require("jsonwebtoken");
var crypto = require("crypto");
var algorithm = "aes-256-cbc"; //Using AES encryption
var key = crypto.randomBytes(32);
var iv = crypto.randomBytes(16);
var ControllerController = /** @class */ (function () {
    function ControllerController(loginLogRepository, 
    // @Inject("JWT_SERVICE")
    jwtService, 
    // private usersService: UsersService,
    userRepository, notificationRepository, usersService, addressRepository, userNotificationsService) {
        this.loginLogRepository = loginLogRepository;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.notificationRepository = notificationRepository;
        this.usersService = usersService;
        this.addressRepository = addressRepository;
        this.userNotificationsService = userNotificationsService;
    }
    //save auth_0 response:
    ControllerController.prototype.save_auth = function (req, res, createUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var user_email_check, token, login_log_1, req_data_1, temp, user, token, temp_secret_generated, google_auth_code, saved, adress_confirmation, login_log, req_data_, notification, req_data, noti_check, noti, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Inside save_auth ", "UserAuthController:- save_auth");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 20, , 21]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: {
                                    email_id: createUserDto.auth_response.email
                                }
                            })];
                    case 2:
                        user_email_check = _a.sent();
                        if (!user_email_check) return [3 /*break*/, 6];
                        if (user_email_check.is_deleted === user_entity_1.is_deleted_Enum.Yes) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "User is deleted",
                                    data: []
                                })];
                        }
                        if (user_email_check.status === user_entity_1.status_Enum.Disable) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "User is disabled",
                                    data: []
                                })];
                        }
                        return [4 /*yield*/, this.jwtService.sign({
                                username: "".concat(user_email_check.first_name, " \n            ").concat(user_email_check.last_name)
                            }, { secret: "".concat(process.env.JWT_SECRET), expiresIn: "1500s" })];
                    case 3:
                        token = _a.sent();
                        login_log_1 = new loginLog_entity_1.moleculus_login_log();
                        login_log_1.logged_user_email = user_email_check.email_id;
                        login_log_1.logged_user_id = user_email_check.user_id.toString();
                        login_log_1.logged_user_name = "".concat(user_email_check.first_name, " ").concat(user_email_check.last_name);
                        login_log_1.log_in_datetime = new Date();
                        return [4 /*yield*/, axios_1["default"]
                                .get("https://ipinfo.io")
                                .then(function (res) { return res.data; })];
                    case 4:
                        req_data_1 = _a.sent();
                        login_log_1.logged_user_ip = req_data_1 ? req_data_1.ip : "";
                        return [4 /*yield*/, this.loginLogRepository.save(login_log_1)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                code: "200",
                                status: "success",
                                message: "Login Successful",
                                data: {
                                    user_id: user_email_check.user_id,
                                    JWTtoken: token,
                                    isSignupDone: user_email_check.isSignupFilled,
                                    isAddressUpdated: user_email_check.isAddressFilled,
                                    isPersonalUpadted: user_email_check.isPersonalFilled,
                                    isDeleted: user_email_check.is_deleted
                                }
                            })];
                    case 6:
                        temp = JSON.stringify(createUserDto.auth_response);
                        return [4 /*yield*/, this.userRepository.create(createUserDto)];
                    case 7:
                        user = _a.sent();
                        return [4 /*yield*/, this.jwtService.sign({
                                username: "".concat(createUserDto.auth_response.given_name, " ").concat(createUserDto.auth_response.family_name)
                            }, { secret: "".concat(process.env.JWT_SECRET), expiresIn: "1500s" })];
                    case 8:
                        token = _a.sent();
                        return [4 /*yield*/, speakeasy.generateSecret()];
                    case 9:
                        temp_secret_generated = _a.sent();
                        google_auth_code = temp_secret_generated.base32;
                        user.temp_secret = temp_secret_generated;
                        user.google_auth_code = google_auth_code;
                        user.first_name = createUserDto.auth_response.given_name
                            ? createUserDto.auth_response.given_name
                            : "Test First Name";
                        user.email_id = createUserDto.auth_response.email;
                        user.last_name = createUserDto.auth_response.family_name
                            ? createUserDto.auth_response.family_name
                            : "Test Last Name";
                        user.auth_o_response = (0, encryption_1.encrypt)(temp);
                        user.legalname =
                            createUserDto.auth_response.given_name +
                                " " +
                                createUserDto.auth_response.family_name;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 10:
                        saved = _a.sent();
                        if (saved === undefined || saved === null) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "failure",
                                    message: "Error Occured, User not created",
                                    data: []
                                })];
                        }
                        return [4 /*yield*/, this.usersService.createAddress(user.user_id)];
                    case 11:
                        adress_confirmation = _a.sent();
                        if (adress_confirmation == null || adress_confirmation == undefined) {
                            common_1.Logger.error("New Address not created, Address for the user exists");
                        }
                        else {
                            common_1.Logger.log("New Address created");
                        }
                        login_log = new loginLog_entity_1.moleculus_login_log();
                        login_log.logged_user_email = createUserDto.auth_response.email;
                        login_log.logged_user_id = user.user_id.toString();
                        login_log.logged_user_name = "".concat(createUserDto.auth_response.given_name, " ").concat(createUserDto.auth_response.family_name);
                        login_log.log_in_datetime = new Date();
                        return [4 /*yield*/, axios_1["default"]
                                .get("https://ipinfo.io")
                                .then(function (res) { return res.data; })];
                    case 12:
                        req_data_ = _a.sent();
                        login_log.logged_user_ip = req_data_ ? req_data_.ip : "";
                        login_log.logged_user_country_of_login = req_data_
                            ? req_data_.country
                            : "";
                        return [4 /*yield*/, this.loginLogRepository.save(login_log)];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 14:
                        _a.sent();
                        notification = new entities_1.moleculus_user_notification();
                        notification.noti_user_id = user.user_id;
                        return [4 /*yield*/, axios_1["default"]
                                .get("https://ipinfo.io")
                                .then(function (res) { return res.data; })];
                    case 15:
                        req_data = _a.sent();
                        notification.modified_datetime = new Date();
                        notification.modified_ip = req_data ? req_data.ip : "";
                        return [4 /*yield*/, this.notificationRepository.findOne({
                                where: {
                                    noti_user_id: user.user_id
                                }
                            })];
                    case 16:
                        noti_check = _a.sent();
                        if (!(noti_check !== undefined && noti_check !== null)) return [3 /*break*/, 17];
                        common_1.Logger.log("Notification already exists", "UserAuthController:- save_auth");
                        return [3 /*break*/, 19];
                    case 17: return [4 /*yield*/, this.notificationRepository.save(notification)];
                    case 18:
                        noti = _a.sent();
                        if (noti) {
                            common_1.Logger.log("Notification created", "UserAuthController:- save_auth");
                        }
                        _a.label = 19;
                    case 19: return [2 /*return*/, res.status(200).json({
                            code: "200",
                            status: "success",
                            message: "Login Successful",
                            data: {
                                user_id: user.user_id,
                                JWTtoken: token,
                                otp_auth_url: user.temp_secret.otpauth_url,
                                google_auth_code: user.google_auth_code,
                                isSignupDone: user.isSignupFilled,
                                isAddressUpdated: user.isAddressFilled,
                                isPersonalUpdated: user.isPersonalFilled
                            }
                        })];
                    case 20:
                        error_1 = _a.sent();
                        return [3 /*break*/, 21];
                    case 21: return [2 /*return*/];
                }
            });
        });
    };
    ControllerController.prototype.logout = function (req, res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, jwt_1, login_log, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Inside logout ", "UserAuthController:- logout");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        user_id = body.user_id;
                        jwt_1 = body.jwt;
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: {
                                    user_id: user_id
                                }
                            })];
                    case 2:
                        login_log = _a.sent();
                        if (!(login_log === undefined || login_log === null)) return [3 /*break*/, 3];
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "failure",
                                message: "No User Exists",
                                data: []
                            })];
                    case 3: return [4 /*yield*/, this.loginLogRepository.update({ logged_user_id: user_id }, { log_out_datetime: new Date() })];
                    case 4:
                        result = _a.sent();
                        if (result) {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "logged out Succesfully",
                                    data: []
                                })];
                        }
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        common_1.Logger.error(error_2, "UserAuthController:- logout");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ControllerController.prototype.login = function (req, res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var token, email_id, password, user_check, is_Matched, login_log, req_data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Inside login controller", "UserAuthController");
                        email_id = body.email_id, password = body.password;
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { email_id: email_id }
                            })];
                    case 1:
                        user_check = _a.sent();
                        if (!!user_check) return [3 /*break*/, 2];
                        common_1.Logger.log("User not found", "UserAuthController");
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "User not found",
                                data: []
                            })];
                    case 2: return [4 /*yield*/, (0, bcrypt_1.comparePassword)(password, user_check.password)];
                    case 3:
                        is_Matched = _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 10, , 11]);
                        if (!!is_Matched) return [3 /*break*/, 5];
                        common_1.Logger.log("Password not matched", "UserAuthController");
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "Password not matched",
                                data: []
                            })];
                    case 5:
                        common_1.Logger.log("Password matched", "UserAuthController");
                        return [4 /*yield*/, this.jwtService.sign({
                                username: "".concat(user_check.first_name, " ").concat(user_check.last_name)
                            }, { secret: "".concat(process.env.JWT_SECRET), expiresIn: "1080h" })];
                    case 6:
                        token = _a.sent();
                        login_log = new loginLog_entity_1.moleculus_login_log();
                        login_log.logged_user_email = user_check.email_id;
                        login_log.logged_user_id = user_check.user_id.toString();
                        login_log.logged_user_name = "".concat(user_check.first_name, " ").concat(user_check.last_name);
                        login_log.log_in_datetime = new Date();
                        return [4 /*yield*/, axios_1["default"]
                                .get("https://ipinfo.io")
                                .then(function (res) { return res.data; })];
                    case 7:
                        req_data = _a.sent();
                        login_log.logged_user_ip = req_data.ip;
                        login_log.logged_user_country_of_login = req_data.country;
                        return [4 /*yield*/, this.loginLogRepository.save(login_log)];
                    case 8:
                        _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                code: "200",
                                status: "success",
                                message: "JWT token assigned",
                                data: {
                                    user_id: user_check.user_id,
                                    token: token
                                }
                            })];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        error_3 = _a.sent();
                        common_1.Logger.error(error_3);
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: " Error Occured ",
                                data: null
                            })];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, common_1.Post)("/auth0"),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Response)()),
        __param(2, (0, common_1.Body)())
    ], ControllerController.prototype, "save_auth");
    __decorate([
        (0, common_1.Post)("/logout"),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Response)()),
        __param(2, (0, common_1.Body)())
    ], ControllerController.prototype, "logout");
    __decorate([
        (0, common_1.Post)("/login"),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Response)()),
        __param(2, (0, common_1.Body)())
    ], ControllerController.prototype, "login");
    ControllerController = __decorate([
        (0, common_1.Controller)("users/auth"),
        __param(0, (0, typeorm_1.InjectRepository)(loginLog_entity_1.moleculus_login_log)),
        __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.moleculus_user)),
        __param(3, (0, typeorm_1.InjectRepository)(entities_1.moleculus_user_notification)),
        __param(4, (0, common_1.Inject)("USER_SERVICE")),
        __param(5, (0, typeorm_1.InjectRepository)(entities_1.moleculus_user_address)),
        __param(6, (0, common_1.Inject)("NOTIFICATIONS_SERVICE"))
    ], ControllerController);
    return ControllerController;
}());
exports.ControllerController = ControllerController;
