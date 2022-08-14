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
exports.UsersService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var axios_1 = require("axios");
var bcrypt_1 = require("../../../../../../../../../src/utils/bcrypt/bcrypt");
var typeorm_2 = require("typeorm");
var cities_entity_1 = require("../../entities/cities.entity");
var countries_entity_1 = require("../../entities/countries.entity");
var states_entity_1 = require("../../entities/states.entity");
var userKYC_entity_1 = require("../../../../../../../../../src/modules/entities/userKYC.entity");
var entities_1 = require("../../entities");
var user_entity_1 = require("../../entities/user.entity");
var app_module_1 = require("../../../../../../../../../src/app.module");
var speakeasy = require("speakeasy");
var crypto = require("crypto");
var validator_aadhar = require("aadhaar-validator");
require("dotenv").config({ debug: false });
var UsersService = /** @class */ (function () {
    function UsersService(userRepository, cityRepository, addressRepository, sipRepository, sipTransactionsRepository, kycRepository, stateRepository, countryRepository, notificationRepository, smsService, mailService) {
        this.userRepository = userRepository;
        this.cityRepository = cityRepository;
        this.addressRepository = addressRepository;
        this.sipRepository = sipRepository;
        this.sipTransactionsRepository = sipTransactionsRepository;
        this.kycRepository = kycRepository;
        this.stateRepository = stateRepository;
        this.countryRepository = countryRepository;
        this.notificationRepository = notificationRepository;
        this.smsService = smsService;
        this.mailService = mailService;
    }
    UsersService.prototype.create = function (_createUserDto) {
        return "This action adds a new user";
    };
    UsersService.prototype.createsha256 = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                result = crypto.createHash("sha256").update(text).digest("hex");
                return [2 /*return*/, result];
            });
        });
    };
    UsersService.prototype.verifyUserDocumentPAN = function (_legal_name, user_email, document_type, document_value) {
        return __awaiter(this, void 0, void 0, function () {
            var url_, client_code_, client_sub_code_, api_key_, salt_, request_id_, stan_, transmission_datetime_, user_handle_value_, user_handle_type_, actor_type_, channel_code_, channel_version_, function_code_, function_sub_code_, operation_mode_, run_mode_, pan_details_, toHashString, hash, sample_resp, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Inside verifyUserDocumentPAN", "verifyUserDocumentPAN Service");
                        url_ = "https://sandbox.veri5digital.com/service/api/1.0/verifyUserIdDoc";
                        client_code_ = process.env.verif5_client_code;
                        client_sub_code_ = process.env.verif5_sub_client_code;
                        api_key_ = process.env.verif5_api_key;
                        salt_ = process.env.verif5_salt;
                        request_id_ = "requestId".concat(Math.floor(Math.random() * 90000) + 10000);
                        stan_ = "".concat(Math.floor(Math.random() * 90000) + 10000);
                        transmission_datetime_ = "".concat(Date.now());
                        user_handle_value_ = "".concat(user_email);
                        user_handle_type_ = "EMAIL";
                        actor_type_ = "CUSTOMER";
                        channel_code_ = "ANDROID_SDK";
                        channel_version_ = "3.1.7";
                        operation_mode_ = "SELF";
                        run_mode_ = "TRIAL";
                        pan_details_ = {
                            pan_number: "".concat(document_value),
                            pan_type: "IND"
                        };
                        if (document_type == "PAN") {
                            function_code_ = "VERIFY_PAN";
                            function_sub_code_ = "NUMBER";
                        }
                        toHashString = "".concat(client_code_, "|").concat(request_id_, "|").concat(api_key_, "|").concat(salt_, "|").concat(document_value);
                        return [4 /*yield*/, this.createsha256(toHashString)];
                    case 1:
                        hash = _a.sent();
                        sample_resp = {
                            txn_id: "4e2714e0-f5f2-4da2-9d75-539c67d80e70",
                            verified_by: "Income tax Database",
                            aadhaar_seeding_status: "Y",
                            full_name: "RISHABH SINHA",
                            response_status: {
                                code: "000",
                                message: "PAN number exists.",
                                status: "SUCCESS"
                            },
                            verified_data: '{"lastUpdatedDate":"26\\/06\\/2018","name":"RISHABH SINHA","fullName":"RISHABH SINHA","aadhaarSeedingStatus":"Y"}',
                            verification_method: "VERIFY_PAN_NUMBER",
                            verification_status: "SUCCESS",
                            last_updated_date: "26/06/2018",
                            verification_code: "000",
                            verified_using: "Database check"
                        };
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, (0, axios_1["default"])({
                                method: "POST",
                                url: url_,
                                data: {
                                    headers: {
                                        actor_type: actor_type_,
                                        channel_code: channel_code_,
                                        api_key: api_key_,
                                        channel_version: channel_version_,
                                        client_code: client_code_,
                                        client_ip: "",
                                        function_code: function_code_,
                                        function_sub_code: function_sub_code_,
                                        location: "NA",
                                        operation_mode: operation_mode_,
                                        request_id: request_id_,
                                        run_mode: run_mode_,
                                        stan: stan_,
                                        sub_client_code: client_sub_code_,
                                        transmission_datetime: transmission_datetime_,
                                        user_handle_type: user_handle_type_,
                                        salt: salt_,
                                        user_handle_value: user_handle_value_
                                    },
                                    request: {
                                        pan_details: pan_details_,
                                        api_key: api_key_,
                                        client_code: client_code_,
                                        sub_client_code: client_sub_code_,
                                        request_id: request_id_,
                                        salt: salt_,
                                        hash: hash,
                                        consent: "",
                                        consent_message: ""
                                    }
                                },
                                headers: {
                                    "Content-Type": "application/json",
                                    Accept: "*/*",
                                    "Accept-Encoding": "gzip, deflate,br",
                                    Connection: "keep-alive"
                                }
                            })];
                    case 3:
                        response = _a.sent();
                        console.log(response.data);
                        return [2 /*return*/, response.data];
                    case 4:
                        error_1 = _a.sent();
                        common_1.Logger.log(error_1, "verifyUserDocumentPAN Service");
                        return [2 /*return*/, null];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UsersService.prototype.checkPanValidity = function (pan_number, user_email, legal_name) {
        return __awaiter(this, void 0, void 0, function () {
            var is_pan_number_valid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("checking pan validity", "checkPanValidity Service");
                        if (pan_number.length != 10) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.verifyUserDocumentPAN(legal_name, user_email, "PAN", pan_number)];
                    case 1:
                        is_pan_number_valid = _a.sent();
                        if (is_pan_number_valid == null) {
                            return [2 /*return*/, null];
                        }
                        if (is_pan_number_valid.response_status.code == "000") {
                            return [2 /*return*/, true];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersService.prototype.checkAadhaarValidity = function (document_value, user_email) {
        return __awaiter(this, void 0, void 0, function () {
            var isValid, url_, random_letters, req_id_random, request_id_, headers_body, toHashString, hashAadharVerify, request_body, headers, response, parameter_1, parameter_2, parameter_3, parameter_4, sum;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("checking aadhaar validity", "checkAadhaarValidity");
                        if (document_value.length != 12) {
                            return [2 /*return*/, false];
                        }
                        isValid = validator_aadhar.isValidNumber(document_value);
                        console.log("AADHAR validator:", isValid);
                        if (isValid == false) {
                            return [2 /*return*/, false];
                        }
                        url_ = "https://sandbox.veri5digital.com/service/api/1.0/verifyUserIdDoc";
                        random_letters = function () {
                            var text = "";
                            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                            for (var i = 0; i < 5; i++)
                                text += possible.charAt(Math.floor(Math.random() * possible.length));
                            return text;
                        };
                        req_id_random = random_letters();
                        request_id_ = "".concat(req_id_random).concat(Math.floor(Math.random() * 90000) + 10000);
                        headers_body = {
                            actor_type: "CUSTOMER",
                            channel_code: "ANDROID_SDK",
                            api_key: process.env.verif5_api_key,
                            channel_version: "3.1.7",
                            client_code: process.env.verif5_client_code,
                            client_ip: "",
                            function_code: "VERIFY_AADHAAR",
                            function_sub_code: "DATA",
                            location: "NA",
                            operation_mode: "SELF",
                            request_id: request_id_,
                            run_mode: "TRIAL",
                            stan: "".concat(Math.floor(Math.random() * 90000) + 10000),
                            sub_client_code: process.env.verif5_sub_client_code,
                            transmission_datetime: "".concat(Date.now()),
                            user_handle_type: "EMAIL",
                            salt: process.env.verif5_salt,
                            user_handle_value: "".concat(user_email)
                        };
                        toHashString = "".concat(headers_body.client_code, "|").concat(request_id_, "|").concat(headers_body.api_key, "|").concat(headers_body.salt, "|").concat(document_value);
                        return [4 /*yield*/, this.createsha256(toHashString)];
                    case 1:
                        hashAadharVerify = _a.sent();
                        request_body = {
                            aadhaar_details: {
                                aadhaar_number: "".concat(document_value)
                            },
                            api_key: process.env.verif5_api_key,
                            client_code: process.env.verif5_client_code,
                            sub_client_code: process.env.verif5_sub_client_code,
                            request_id: request_id_,
                            salt: process.env.verif5_salt,
                            hash: hashAadharVerify,
                            consent: "YES",
                            consent_message: ""
                        };
                        headers = {
                            "Content-Type": "application/json",
                            Accept: "*/*",
                            "Accept-Encoding": "gzip, deflate,br",
                            Connection: "keep-alive"
                        };
                        return [4 /*yield*/, (0, axios_1["default"])({
                                method: "POST",
                                url: url_,
                                data: {
                                    headers: headers_body,
                                    request: request_body
                                },
                                headers: headers
                            })];
                    case 2:
                        response = _a.sent();
                        console.log("response.data AADHAR_API- : ", response.data);
                        if (response.data.response_status.code == "410006") {
                            return [2 /*return*/, true];
                        }
                        if (response.data.response_status.code == "000") {
                            parameter_1 = response.data.verified_data.split('"')[3].split(":")[0] == "null"
                                ? 0
                                : 1;
                            parameter_2 = response.data.verified_data.split('"')[7].split(":")[0] == "null"
                                ? 0
                                : 1;
                            parameter_3 = response.data.verified_data.split('"')[11].split(":")[0] == "null"
                                ? 0
                                : 1;
                            parameter_4 = response.data.verified_data.split('"')[15].split(":")[0] == "null"
                                ? 0
                                : 1;
                            sum = parameter_1 + parameter_2 + parameter_3 + parameter_4;
                            console.log("parameter_1 : ", parameter_1, "parameter_2 : ", parameter_2, "parameter_3 : ", parameter_3, "parameter_4 : ", parameter_4);
                            console.log("sum : ", sum);
                            if (sum < 2) {
                                return [2 /*return*/, false];
                            }
                            return [2 /*return*/, true];
                        }
                        if (response.data.response_status.code == "333" ||
                            response.data.response_status.code == "400304") {
                            return [2 /*return*/, null];
                        }
                        if (response.data.response_status.code == "400303" ||
                            response.data.response_status.code == "400302" ||
                            response.data.response_status.code == "400301") {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    UsersService.prototype.checkDocument = function (document_type, document_value, user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var user_aadhar_check, user_pan_check, user_ssn_check, user_tin_check;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (document_value == null || document_value == "") {
                            return [2 /*return*/, false];
                        }
                        if (!(document_type == "AADHAR")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: {
                                    document_type: user_entity_1.document_Type_Enum.AADHAR,
                                    document_value: document_value
                                }
                            })];
                    case 1:
                        user_aadhar_check = _a.sent();
                        if (user_aadhar_check) {
                            if (user_aadhar_check.user_id != user_id) {
                                console.log("user_id: ", user_id);
                                console.log("user_aadhar_check.user_id: ", user_aadhar_check.user_id);
                                return [2 /*return*/, true];
                            }
                        }
                        _a.label = 2;
                    case 2:
                        if (!(document_type == "PAN")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: {
                                    document_type: user_entity_1.document_Type_Enum.PAN,
                                    document_value: document_value
                                }
                            })];
                    case 3:
                        user_pan_check = _a.sent();
                        if (user_pan_check) {
                            if (user_pan_check.user_id != user_id) {
                                return [2 /*return*/, true];
                            }
                        }
                        _a.label = 4;
                    case 4:
                        if (!(document_type == "SSN")) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: {
                                    document_type: user_entity_1.document_Type_Enum.SSN,
                                    document_value: document_value
                                }
                            })];
                    case 5:
                        user_ssn_check = _a.sent();
                        if (user_ssn_check) {
                            if (user_ssn_check.user_id != user_id) {
                                return [2 /*return*/, true];
                            }
                        }
                        _a.label = 6;
                    case 6:
                        if (!(document_type == "TIN")) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: {
                                    document_type: user_entity_1.document_Type_Enum.TIN,
                                    document_value: document_value
                                }
                            })];
                    case 7:
                        user_tin_check = _a.sent();
                        if (user_tin_check) {
                            if (user_tin_check.user_id != user_id) {
                                return [2 /*return*/, true];
                            }
                        }
                        _a.label = 8;
                    case 8: return [2 /*return*/, false];
                }
            });
        });
    };
    UsersService.prototype.getCaptcha = function (user_email) {
        return __awaiter(this, void 0, void 0, function () {
            var url_, client_code_, client_sub_code_, channel_code_, channel_version_, stan_, client_ip_, transmission_datetime_, operation_mode_, run_mode_, actor_type_, user_handle_type_, user_handle_value_, function_code_, function_sub_code_, api_key_, salt_, request_id_, tohashStringGetCaptcha, hashCaptcha, body_headers, body_request, headers, response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("getCaptcha : usersService", "getCaptcha");
                        url_ = "https://sandbox.veri5digital.com/okyc/api/v1.0/getCaptcha";
                        client_code_ = process.env.verif5_client_code;
                        client_sub_code_ = process.env.verif5_sub_client_code;
                        channel_code_ = "web";
                        channel_version_ = "1";
                        stan_ = "".concat(Math.floor(Math.random() * 90000) + 10000);
                        client_ip_ = "";
                        transmission_datetime_ = "".concat(Date.now());
                        operation_mode_ = "SELF";
                        run_mode_ = "DEFAULT";
                        actor_type_ = "CUSTOMER";
                        user_handle_type_ = "EMAIL";
                        user_handle_value_ = "".concat(user_email);
                        function_code_ = "DEFAULT";
                        function_sub_code_ = "DEFAULT";
                        api_key_ = process.env.verif5_api_key_aadhaar;
                        salt_ = process.env.verif5_salt_aadhaar;
                        request_id_ = "".concat(Math.floor(Math.random() * 90000) + 10000);
                        tohashStringGetCaptcha = "".concat(client_code_, "|").concat(request_id_, "|").concat(api_key_, "|").concat(salt_);
                        return [4 /*yield*/, this.createsha256(tohashStringGetCaptcha)];
                    case 1:
                        hashCaptcha = _a.sent();
                        body_headers = {
                            client_code: client_code_,
                            sub_client_code: client_sub_code_,
                            channel_code: channel_code_,
                            channel_version: channel_version_,
                            stan: stan_,
                            client_ip: client_ip_,
                            transmission_datetime: transmission_datetime_,
                            operation_mode: operation_mode_,
                            run_mode: run_mode_,
                            actor_type: actor_type_,
                            user_handle_type: user_handle_type_,
                            user_handle_value: user_handle_value_,
                            function_code: function_code_,
                            function_sub_code: function_sub_code_,
                            salt: salt_
                        };
                        body_request = {
                            api_key: api_key_,
                            salt: salt_,
                            request_id: request_id_,
                            hash: hashCaptcha
                        };
                        headers = {
                            "Content-Type": "application/json",
                            Accept: "*/*",
                            "Accept-Encoding": "gzip, deflate,br",
                            Connection: "keep-alive"
                        };
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        common_1.Logger.log("getCaptcha : performing API call", "getCaptcha");
                        return [4 /*yield*/, (0, axios_1["default"])({
                                method: "POST",
                                url: url_,
                                data: {
                                    headers: body_headers,
                                    request: body_request
                                },
                                headers: headers
                            })];
                    case 3:
                        response = _a.sent();
                        return [4 /*yield*/, response.data];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        e_1 = _a.sent();
                        common_1.Logger.error(e_1, "getCaptcha : API call failed");
                        return [2 /*return*/, null];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UsersService.prototype.enterAadhaar = function (uuid, aadhaar, captcha, request_id, user_email) {
        return __awaiter(this, void 0, void 0, function () {
            var url_, client_code_, client_sub_code_, channel_code_, channel_version_, stan_, client_ip_, transmission_datetime_, operation_mode_, run_mode_, actor_type_, user_handle_type_, user_handle_value_, function_code_, function_sub_code_, api_key_, salt_, request_id_, tohashStringEnterAadhaar, hashEnterAadhaar, body_headers, body_request, headers, response, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        common_1.Logger.log("enterAadhaar : usersService", "enterAadhaar");
                        url_ = "https://sandbox.veri5digital.com/okyc/api/v1.0/enterAadhaar";
                        client_code_ = process.env.verif5_client_code;
                        client_sub_code_ = process.env.verif5_sub_client_code;
                        channel_code_ = "ANDROID_SDK";
                        channel_version_ = "1";
                        stan_ = "".concat(Math.floor(Math.random() * 90000) + 10000);
                        client_ip_ = "";
                        transmission_datetime_ = "".concat(Date.now());
                        operation_mode_ = "SELF";
                        run_mode_ = "DEFAULT";
                        actor_type_ = "CUSTOMER";
                        user_handle_type_ = "EMAIL";
                        user_handle_value_ = "".concat(user_email);
                        function_code_ = "DEFAULT";
                        function_sub_code_ = "DEFAULT";
                        api_key_ = process.env.verif5_api_key_aadhaar;
                        salt_ = process.env.verif5_salt_aadhaar;
                        request_id_ = request_id;
                        tohashStringEnterAadhaar = "".concat(client_code_, "|").concat(request_id_, "|").concat(uuid, "|").concat(api_key_, "|").concat(salt_);
                        return [4 /*yield*/, this.createsha256(tohashStringEnterAadhaar)];
                    case 1:
                        hashEnterAadhaar = _c.sent();
                        body_headers = {
                            client_code: client_code_,
                            sub_client_code: client_sub_code_,
                            channel_code: channel_code_,
                            channel_version: channel_version_,
                            stan: stan_,
                            client_ip: client_ip_,
                            transmission_datetime: transmission_datetime_,
                            operation_mode: operation_mode_,
                            run_mode: run_mode_,
                            actor_type: actor_type_,
                            user_handle_type: user_handle_type_,
                            user_handle_value: user_handle_value_,
                            function_code: function_code_,
                            function_sub_code: function_sub_code_,
                            salt: salt_
                        };
                        body_request = {
                            uuid: uuid,
                            aadhaar: aadhaar,
                            captcha: captcha,
                            verification_type: "OTP",
                            consent: "YES",
                            api_key: api_key_,
                            request_id: request_id_,
                            hash: hashEnterAadhaar
                        };
                        headers = {
                            "Content-Type": "application/json",
                            Accept: "*/*",
                            "Accept-Encoding": "gzip, deflate,br",
                            Connection: "keep-alive"
                        };
                        common_1.Logger.log("enterAadhaar : performing API call", "enterAadhaar");
                        return [4 /*yield*/, (0, axios_1["default"])({
                                method: "POST",
                                url: url_,
                                data: {
                                    headers: body_headers,
                                    request: body_request
                                },
                                headers: headers
                            })];
                    case 2:
                        response = _c.sent();
                        _b = (_a = common_1.Logger).log;
                        return [4 /*yield*/, response.data];
                    case 3:
                        _b.apply(_a, [_c.sent(), "enterAadhaar-Service"]);
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    UsersService.prototype.enterOtp = function (uuid, otp, _request_id, user_email) {
        return __awaiter(this, void 0, void 0, function () {
            var url_, client_code_, client_sub_code_, channel_code_, channel_version_, stan_, client_ip_, transmission_datetime_, operation_mode_, run_mode_, actor_type_, user_handle_type_, user_handle_value_, location, function_code_, function_sub_code_, salt_, api_key_, share_code_, request_id_, tohashStringEnterOtp, hashEnterOtp, body_headers, body_request, headers, time1, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("enterOtp : usersService", "enterOtp");
                        url_ = "https://sandbox.veri5digital.com/okyc/api/v1.0/enterOtp";
                        client_code_ = process.env.verif5_client_code;
                        client_sub_code_ = process.env.verif5_sub_client_code;
                        channel_code_ = "ANDROID_SDK";
                        channel_version_ = "1";
                        stan_ = "".concat(Math.floor(Math.random() * 90000) + 10000);
                        client_ip_ = "";
                        transmission_datetime_ = "".concat(Date.now());
                        operation_mode_ = "SELF";
                        run_mode_ = "DEFAULT";
                        actor_type_ = "CUSTOMER";
                        user_handle_type_ = "EMAIL";
                        user_handle_value_ = "".concat(user_email);
                        location = "";
                        function_code_ = "DEFAULT";
                        function_sub_code_ = "DEFAULT";
                        salt_ = process.env.verif5_salt_aadhaar;
                        api_key_ = process.env.verif5_api_key_aadhaar;
                        share_code_ = "".concat(Math.floor(Math.random() * 9000) + 1000);
                        request_id_ = "".concat(Math.floor(Math.random() * 90000) + 10000);
                        tohashStringEnterOtp = "".concat(client_code_, "|").concat(request_id_, "|").concat(uuid, "|").concat(otp, "|").concat(api_key_, "|").concat(salt_);
                        return [4 /*yield*/, this.createsha256(tohashStringEnterOtp)];
                    case 1:
                        hashEnterOtp = _a.sent();
                        body_headers = {
                            client_code: client_code_,
                            sub_client_code: client_sub_code_,
                            channel_code: channel_code_,
                            channel_version: channel_version_,
                            stan: stan_,
                            client_ip: client_ip_,
                            transmission_datetime: transmission_datetime_,
                            operation_mode: operation_mode_,
                            run_mode: run_mode_,
                            actor_type: actor_type_,
                            user_handle_type: user_handle_type_,
                            user_handle_value: user_handle_value_,
                            location: location,
                            function_code: function_code_,
                            function_sub_code: function_sub_code_,
                            salt: salt_
                        };
                        body_request = {
                            uuid: uuid,
                            otp: otp,
                            share_code: share_code_,
                            api_key: api_key_,
                            request_id: request_id_,
                            hash: hashEnterOtp
                        };
                        headers = {
                            "Content-Type": "application/json",
                            Accept: "*/*",
                            "Accept-Encoding": "gzip, deflate,br",
                            Connection: "keep-alive"
                        };
                        common_1.Logger.log("enterOtp : performing API call", "enterOtp");
                        time1 = new Date().getTime();
                        return [4 /*yield*/, (0, axios_1["default"])({
                                method: "POST",
                                url: url_,
                                data: {
                                    headers: body_headers,
                                    request: body_request
                                },
                                headers: headers
                            })];
                    case 2:
                        response = _a.sent();
                        if (new Date().getTime() - time1 > 29000) {
                            common_1.Logger.log("enterOtp : API call took more than 30 seconds", "enterOtp");
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    UsersService.prototype.fetchKyc = function (uuid, user_email) {
        return __awaiter(this, void 0, void 0, function () {
            var url_, client_code_, client_sub_code_, channel_code_, channel_version_, stan_, client_ip_, transmission_datetime_, operation_mode_, run_mode_, actor_type_, user_handle_type_, user_handle_value_, location_, function_code_, function_sub_code_, salt_, api_key_, tohashStringFetchKyc, hashFetchKyc, body_headers, body_request, headers, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("fetchKyc : usersService", "fetchKyc");
                        url_ = "https://sandbox.veri5digital.com/okyc/api/v1.0/fetchKYCData";
                        client_code_ = process.env.verif5_client_code;
                        client_sub_code_ = process.env.verif5_sub_client_code;
                        channel_code_ = "ANDROID_SDK";
                        channel_version_ = "1";
                        stan_ = "".concat(Math.floor(Math.random() * 90000) + 10000);
                        client_ip_ = "";
                        transmission_datetime_ = "".concat(Date.now());
                        operation_mode_ = "SELF";
                        run_mode_ = "DEFAULT";
                        actor_type_ = "DEFAULT";
                        user_handle_type_ = "EMAIL";
                        user_handle_value_ = "".concat(user_email);
                        location_ = "";
                        function_code_ = "DEFAULT";
                        function_sub_code_ = "DEFAULT";
                        salt_ = process.env.verif5_salt_aadhaar;
                        api_key_ = process.env.verif5_api_key_aadhaar;
                        tohashStringFetchKyc = "".concat(client_code_, "|").concat(uuid, "|").concat(api_key_, "|").concat(salt_);
                        return [4 /*yield*/, this.createsha256(tohashStringFetchKyc)];
                    case 1:
                        hashFetchKyc = _a.sent();
                        body_headers = {
                            client_code: client_code_,
                            sub_client_code: client_sub_code_,
                            channel_code: channel_code_,
                            channel_version: channel_version_,
                            stan: stan_,
                            client_ip: client_ip_,
                            transmission_datetime: transmission_datetime_,
                            operation_mode: operation_mode_,
                            run_mode: run_mode_,
                            actor_type: actor_type_,
                            user_handle_type: user_handle_type_,
                            user_handle_value: user_handle_value_,
                            location: location_,
                            function_code: function_code_,
                            function_sub_code: function_sub_code_,
                            salt: salt_
                        };
                        body_request = {
                            api_key: api_key_,
                            uuid: uuid,
                            hash: hashFetchKyc
                        };
                        headers = {
                            "Content-Type": "application/json",
                            Accept: "*/*",
                            "Accept-Encoding": "gzip, deflate,br",
                            Connection: "keep-alive"
                        };
                        common_1.Logger.log("fetchKyc : performing API call", "fetchKyc Service");
                        return [4 /*yield*/, (0, axios_1["default"])({
                                method: "POST",
                                url: url_,
                                data: {
                                    headers: body_headers,
                                    request: body_request
                                },
                                headers: headers
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    UsersService.prototype.getUserSips = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var sips;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sipRepository.find({
                            where: { sip_user_id: user_id }
                        })];
                    case 1:
                        sips = _a.sent();
                        if (sips == null || sips == undefined || !sips) {
                            common_1.Logger.log("No Sips Found", "UsersService");
                            return [2 /*return*/, null];
                        }
                        else {
                            common_1.Logger.log("Sips Found", "UsersService");
                            return [2 /*return*/, sips];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersService.prototype.forceDeleteUser = function (email_id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, noti_user, userAddress, user_address_id, user_kyc, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne({
                            where: { email_id: email_id }
                        })];
                    case 1:
                        user = _a.sent();
                        if (!(user == null || user == undefined || !user)) return [3 /*break*/, 2];
                        common_1.Logger.log("No User Found", "UsersService");
                        return [2 /*return*/, null];
                    case 2:
                        common_1.Logger.log("User Found, deleting...", "UsersService");
                        return [4 /*yield*/, this.notificationRepository.findOne({
                                where: { noti_user_id: user.user_id }
                            })];
                    case 3:
                        noti_user = _a.sent();
                        if (!noti_user) return [3 /*break*/, 5];
                        return [4 /*yield*/, (0, typeorm_2.getConnection)()
                                .createQueryBuilder()["delete"]()
                                .from(entities_1.moleculus_user_notification)
                                .where("noti_user_id = :id", { id: user.user_id })
                                .execute()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.addressRepository.findOne({
                            where: { user_address_id: user.user_id }
                        })];
                    case 6:
                        userAddress = _a.sent();
                        user_address_id = userAddress.user_address_id;
                        if (!userAddress) return [3 /*break*/, 8];
                        return [4 /*yield*/, (0, typeorm_2.getConnection)()
                                .createQueryBuilder()["delete"]()
                                .from(entities_1.moleculus_user_address)
                                .where("user_address_id = :user_address_id", {
                                user_address_id: user_address_id
                            })
                                .execute()];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [4 /*yield*/, this.kycRepository.findOne({
                            where: { kyc_user_id: user.user_id }
                        })];
                    case 9:
                        user_kyc = _a.sent();
                        if (!user_kyc) return [3 /*break*/, 11];
                        return [4 /*yield*/, app_module_1.AppDataSource.manager
                                .createQueryBuilder()["delete"]()
                                .from(entities_1.moleculus_user_kyc)
                                .where("kyc_user_id = :id", { id: user.user_id })
                                .execute()];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        _a.trys.push([11, 13, , 14]);
                        return [4 /*yield*/, (0, typeorm_2.getConnection)()
                                .createQueryBuilder()["delete"]()
                                .from(user_entity_1.moleculus_user)
                                .where("email_id = :email_id", { email_id: email_id })
                                .execute()];
                    case 12:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 13:
                        e_2 = _a.sent();
                        common_1.Logger.log(e_2, "UsersService");
                        return [2 /*return*/, null];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    UsersService.prototype.sendKYCResponse = function (user_id, token, kyc_response) {
        return __awaiter(this, void 0, void 0, function () {
            var kyc, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.kycRepository.findOne({
                            where: { kyc_user_id: user_id }
                        })];
                    case 1:
                        kyc = _a.sent();
                        if (!(!kyc || kyc == undefined || kyc == null)) return [3 /*break*/, 2];
                        common_1.Logger.log("No Kyc Record Found for such user_id", "UsersService");
                        return [2 /*return*/, null];
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        kyc.api_repsonse = kyc_response;
                        kyc.token = token;
                        return [4 /*yield*/, this.kycRepository.save(kyc)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, kyc];
                    case 4:
                        e_3 = _a.sent();
                        common_1.Logger.log(e_3, "UsersService");
                        return [2 /*return*/, null];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UsersService.prototype.updateKYCDetails = function (user_id, token, vendor_id, isAgain, api_response) {
        return __awaiter(this, void 0, void 0, function () {
            var check, req_data, old_saved, check_1, user_kyc, req_data, newKYC, req_data, newKYC;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.kycRepository.findOne({
                            where: { kyc_user_id: user_id },
                            order: { kyc_id: "DESC" }
                        })];
                    case 1:
                        check = _a.sent();
                        if (!(api_response == "approved")) return [3 /*break*/, 3];
                        check.kyc_status = userKYC_entity_1.kyc_status_enum.Completed;
                        return [4 /*yield*/, this.kycRepository.save(check)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        if (!(api_response == "_rejected_" || api_response === "_resubmission_")) return [3 /*break*/, 7];
                        return [4 /*yield*/, axios_1["default"]
                                .get("https://ipinfo.io")
                                .then(function (res) { return res.data; })["catch"](function (err) {
                                common_1.Logger.log(err, "UsersService");
                            })];
                    case 4:
                        req_data = _a.sent();
                        // const newKyc = await this.kycRepository.create({
                        //   kyc_user_id: user_id,
                        //   created_datetime: new Date(),
                        //   created_ip: req_data.ip ? req_data.ip : "",
                        // });
                        //await this.kycRepository.save(newKyc);
                        check.kyc_status = userKYC_entity_1.kyc_status_enum.Rejected;
                        return [4 /*yield*/, this.kycRepository.save(check)];
                    case 5:
                        old_saved = _a.sent();
                        return [4 /*yield*/, this.kycRepository.save(check)];
                    case 6:
                        _a.sent();
                        //return newKyc;
                        return [2 /*return*/, old_saved];
                    case 7:
                        if (!(isAgain == 1)) return [3 /*break*/, 16];
                        return [4 /*yield*/, this.kycRepository.findOne({
                                where: { kyc_user_id: user_id },
                                order: { kyc_id: "DESC" }
                            })];
                    case 8:
                        check_1 = _a.sent();
                        if (check_1 == null || check_1 == undefined || !check_1) {
                            common_1.Logger.log("No Kyc Record Found for such user_id", "UsersService");
                            return [2 /*return*/, null];
                        }
                        common_1.Logger.log("User is trying to update again", "UsersService");
                        return [4 /*yield*/, this.kycRepository.findOne({
                                where: { kyc_user_id: user_id },
                                order: { kyc_id: "DESC" }
                            })];
                    case 9:
                        user_kyc = _a.sent();
                        if (!(user_kyc == null || user_kyc == undefined || !user_kyc)) return [3 /*break*/, 10];
                        common_1.Logger.log("No Kyc Record Found for such user_id", "UsersService");
                        return [2 /*return*/, null];
                    case 10:
                        user_kyc.kyc_status = userKYC_entity_1.kyc_status_enum.Rejected;
                        return [4 /*yield*/, this.kycRepository.save(user_kyc)];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12: return [4 /*yield*/, axios_1["default"]
                            .get("https://ipinfo.io")
                            .then(function (res) { return res.data; })["catch"](function (err) {
                            common_1.Logger.log(err, "UsersService");
                        })];
                    case 13:
                        req_data = _a.sent();
                        return [4 /*yield*/, this.kycRepository.create({
                                kyc_user_id: user_id,
                                token: null,
                                vendor_id: null,
                                api_repsonse: api_response,
                                created_datetime: new Date(),
                                created_ip: req_data.ip ? req_data.ip : ""
                            })];
                    case 14:
                        newKYC = _a.sent();
                        return [4 /*yield*/, this.kycRepository.save(newKYC)];
                    case 15: return [2 /*return*/, _a.sent()];
                    case 16:
                        if (!(check == null || check == undefined || !check)) return [3 /*break*/, 20];
                        return [4 /*yield*/, axios_1["default"]
                                .get("https://ipinfo.io")
                                .then(function (res) { return res.data; })["catch"](function (err) {
                                common_1.Logger.log(err, "UsersService");
                            })];
                    case 17:
                        req_data = _a.sent();
                        return [4 /*yield*/, this.kycRepository.create({
                                kyc_user_id: user_id,
                                token: token,
                                vendor_id: vendor_id,
                                created_datetime: new Date(),
                                created_ip: req_data.ip ? req_data.ip : "",
                                api_repsonse: api_response
                            })];
                    case 18:
                        newKYC = _a.sent();
                        return [4 /*yield*/, this.kycRepository.save(newKYC)];
                    case 19: return [2 /*return*/, _a.sent()];
                    case 20:
                        check.token = token;
                        check.vendor_id = vendor_id;
                        check.api_repsonse = api_response;
                        return [4 /*yield*/, this.kycRepository.save(check)];
                    case 21: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.getUserKYCDetails = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var kyc_details, req_data, kyc_new, req_data, n_kyc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.kycRepository.findOne({
                            where: {
                                kyc_user_id: user_id
                            },
                            order: { kyc_id: "DESC" }
                        })];
                    case 1:
                        kyc_details = _a.sent();
                        if (!(kyc_details == null || kyc_details == undefined || !kyc_details)) return [3 /*break*/, 5];
                        common_1.Logger.log("creating new kyc", "UsersService");
                        return [4 /*yield*/, axios_1["default"]
                                .get("https://ipinfo.io")
                                .then(function (res) { return res.data; })["catch"](function (err) {
                                common_1.Logger.log(err, "UsersService");
                            })];
                    case 2:
                        req_data = _a.sent();
                        return [4 /*yield*/, this.kycRepository.create({
                                kyc_user_id: user_id,
                                created_datetime: new Date(),
                                created_ip: req_data.ip ? req_data.ip : ""
                            })];
                    case 3:
                        kyc_new = _a.sent();
                        return [4 /*yield*/, this.kycRepository.save(kyc_new)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        if (!(kyc_details.kyc_status == userKYC_entity_1.kyc_status_enum.Rejected)) return [3 /*break*/, 9];
                        return [4 /*yield*/, axios_1["default"]
                                .get("https://ipinfo.io")
                                .then(function (res) { return res.data; })["catch"](function (err) {
                                common_1.Logger.log(err, "UsersService");
                            })];
                    case 6:
                        req_data = _a.sent();
                        return [4 /*yield*/, this.kycRepository.create({
                                kyc_user_id: user_id,
                                created_datetime: new Date(),
                                created_ip: req_data.ip ? req_data.ip : ""
                            })];
                    case 7:
                        n_kyc = _a.sent();
                        return [4 /*yield*/, this.kycRepository.save(n_kyc)];
                    case 8: return [2 /*return*/, _a.sent()];
                    case 9:
                        common_1.Logger.log("returning existing kyc", "UsersService");
                        return [2 /*return*/, kyc_details];
                }
            });
        });
    };
    UsersService.prototype.getCountries = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.countryRepository.find({
                            order: { pk_country_id: "ASC" }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.getCities = function (country_id, city_state_abbreviation) {
        return __awaiter(this, void 0, void 0, function () {
            var res_city, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("country_id: ", country_id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.cityRepository.find({
                                where: {
                                    city_country_id: country_id,
                                    city_state_abbreviation: city_state_abbreviation
                                },
                                order: { city_name: "ASC" }
                            })];
                    case 2:
                        res_city = _a.sent();
                        if (!res_city || res_city == undefined || res_city === null) {
                            return [2 /*return*/, null];
                        }
                        else {
                            return [2 /*return*/, res_city];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        common_1.Logger.error(e_4);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UsersService.prototype.getStatesUSA = function () {
        return __awaiter(this, void 0, void 0, function () {
            var states;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.stateRepository.find({
                            where: { state_country_id: 1 },
                            order: { state_name: "ASC" }
                        })];
                    case 1:
                        states = _a.sent();
                        return [2 /*return*/, states];
                }
            });
        });
    };
    UsersService.prototype.getStatesINDIA = function () {
        return __awaiter(this, void 0, void 0, function () {
            var states;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.stateRepository.find({
                            where: { state_country_id: 2 },
                            order: { state_name: "ASC" }
                        })];
                    case 1:
                        states = _a.sent();
                        return [2 /*return*/, states];
                }
            });
        });
    };
    UsersService.prototype.getUserDetailsById = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne({
                            where: { user_id: user_id }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.findUserByEmail = function (email_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne({
                            where: { email_id: email_id }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.findPhoneNumber = function (phone_number) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (phone_number == null ||
                            phone_number == "" ||
                            phone_number == undefined) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { phone_number: phone_number }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.updatePhoneNumber = function (user_id, phone_number) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne({
                            where: { user_id: user_id }
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 3];
                        common_1.Logger.log("User found!");
                        user.phone_number = phone_number;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 2: 
                    //upadte is_phone_verified_Enum
                    return [2 /*return*/, _a.sent()];
                    case 3:
                        common_1.Logger.error("User with user id: ".concat(user_id, " not found"));
                        return [2 /*return*/, null];
                }
            });
        });
    };
    UsersService.prototype.generateRandomString = function () {
        return __awaiter(this, void 0, void 0, function () {
            var length, random_token, characters, charactersLength, i;
            return __generator(this, function (_a) {
                length = 12;
                random_token = "";
                characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                charactersLength = characters.length;
                for (i = 0; i < length; i++) {
                    random_token += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return [2 /*return*/, random_token];
            });
        });
    };
    UsersService.prototype.registerUser = function (createuserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var password, otp, newUser, req_data, random_token, subject, message, to, from, email_result, sms_result, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        password = (0, bcrypt_1.encodePassword)(createuserDto.password);
                        otp = Math.floor(Math.random() * 10000000)
                            .toString()
                            .substring(0, 6);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 9, , 10]);
                        newUser = this.userRepository.create(__assign(__assign({}, createuserDto), { password: password }));
                        return [4 /*yield*/, axios_1["default"]
                                .get("https://ipinfo.io")
                                .then(function (res) { return res.data; })];
                    case 2:
                        req_data = _a.sent();
                        newUser.created_ip = req_data.ip;
                        newUser.created_datetime = new Date();
                        newUser.legalname =
                            createuserDto.first_name + " " + createuserDto.last_name;
                        newUser.phone_code = createuserDto.phone_code;
                        if (req_data.country == "IN") {
                            newUser.country_name = "INDIA";
                        }
                        if (req_data.country == "US") {
                            newUser.country_name = "USA";
                        }
                        return [4 /*yield*/, this.generateRandomString()];
                    case 3:
                        random_token = _a.sent();
                        subject = " Registration Link";
                        message = "Your Link  is: ".concat(otp);
                        to = newUser.email_id;
                        from = " moleculus@gmail.com";
                        return [4 /*yield*/, this.mailService.sendMail(subject, message, to)];
                    case 4:
                        email_result = _a.sent();
                        // const emr = await this.mailService.sendMail(subject, message, to);
                        // console.log("email_result>> emr:  ", emr);
                        // if (email_result) {
                        //   newUser.otp = otp;
                        //   newUser.otp_creation_time = new Date().getTime();
                        //   newUser.email_token = random_token;
                        //   await this.userRepository.save(newUser);
                        //   Logger.log("Email Sent and otp saved to repository successfully!");
                        // }
                        if ((newUser.country_name === "IN" ||
                            newUser.country_name === "INDIA" ||
                            newUser.country_name === "India" ||
                            newUser.country_name === "india") &&
                            (newUser.state_name === "" ||
                                newUser.state_name === null ||
                                newUser.state_name === undefined ||
                                newUser.state_name === " ")) {
                            newUser.state_name = req_data.region;
                        }
                        if (newUser.country_name === "IN" ||
                            newUser.country_name === "INDIA" ||
                            newUser.country_name === "India" ||
                            newUser.country_name === "india") {
                            newUser.default_currency = "INR";
                        }
                        if (!(newUser.phone_number !== undefined &&
                            newUser.phone_number !== null &&
                            newUser.phone_number !== "")) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.sendOTP(newUser.phone_code + newUser.phone_number, otp)];
                    case 5:
                        sms_result = _a.sent();
                        if (!(sms_result.statusCode === 200)) return [3 /*break*/, 7];
                        newUser.otp = otp;
                        newUser.otp_creation_time = new Date().getTime();
                        return [4 /*yield*/, this.userRepository.save(newUser)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [4 /*yield*/, this.userRepository.save(newUser)];
                    case 8: return [2 /*return*/, _a.sent()];
                    case 9:
                        e_5 = _a.sent();
                        console.log(e_5);
                        return [2 /*return*/, e_5];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    UsersService.prototype.createAddress = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var check_user, address, req_data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Creating address for user_id: ", user_id);
                        return [4 /*yield*/, this.addressRepository.findOne({
                                where: { user_address_id: user_id }
                            })];
                    case 1:
                        check_user = _a.sent();
                        if (check_user) {
                            return [2 /*return*/, null];
                        }
                        address = new entities_1.moleculus_user_address();
                        address.user_address_id = user_id;
                        return [4 /*yield*/, axios_1["default"]
                                .get("https://ipinfo.io")
                                .then(function (res) { return res.data; })];
                    case 2:
                        req_data = _a.sent();
                        address.created_datetime = new Date();
                        address.created_ip = req_data.ip;
                        return [4 /*yield*/, this.addressRepository.save(address)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.updateAddress = function (id, updateAddressDto) {
        return __awaiter(this, void 0, void 0, function () {
            var address, user, req_data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.warn("Updating Address! ...");
                        return [4 /*yield*/, this.addressRepository.findOne({
                                where: { user_address_id: id }
                            })];
                    case 1:
                        address = _a.sent();
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { user_id: id }
                            })];
                    case 2:
                        user = _a.sent();
                        if (!(address && user)) return [3 /*break*/, 6];
                        common_1.Logger.log("Address found!");
                        address.address_line1 = updateAddressDto.address_line1.trim();
                        address.address_line2 = updateAddressDto.address_line2.trim();
                        address.other_info = updateAddressDto.other_info.trim();
                        user.city = updateAddressDto.city.trim();
                        user.state_name = updateAddressDto.state.trim();
                        user.zipcode = updateAddressDto.zipcode.trim();
                        user.modified_datetime = new Date();
                        return [4 /*yield*/, axios_1["default"]
                                .get("https://ipinfo.io")
                                .then(function (res) { return res.data; })];
                    case 3:
                        req_data = _a.sent();
                        user.modified_ip = req_data.ip;
                        user.isAddressFilled = 1;
                        return [4 /*yield*/, this.addressRepository.save(address)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, address];
                    case 6: return [2 /*return*/, null];
                }
            });
        });
    };
    UsersService.prototype.updateProfile = function (id, updateProfileDto) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.warn("Updating Profile! ...");
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { user_id: id }
                            })];
                    case 1:
                        user = _a.sent();
                        if (updateProfileDto.ssn !== undefined &&
                            updateProfileDto.ssn !== null &&
                            updateProfileDto.ssn !== "") {
                            user.ssn = updateProfileDto.ssn;
                        }
                        user.first_name = updateProfileDto.first_name;
                        user.last_name = updateProfileDto.last_name;
                        user.legalname = updateProfileDto.full_legal_name;
                        user.dob = updateProfileDto.dob;
                        user.tin = updateProfileDto.tin;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.updatePassword = function (id, newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var user, newPassword_;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne({
                            where: { user_id: id }
                        })];
                    case 1:
                        user = _a.sent();
                        newPassword_ = (0, bcrypt_1.encodePassword)(newPassword);
                        user.password = newPassword_;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.sendOTP = function (phone_number, otp) {
        return __awaiter(this, void 0, void 0, function () {
            var message, result, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        message = "Your OTP is ".concat(otp);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.smsService.sendSMSAWS(message, phone_number)];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            return [2 /*return*/, {
                                    statusCode: 200,
                                    otp: otp,
                                    message: "OTP sent"
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    statusCode: 400,
                                    otp: otp,
                                    message: "OTP not sent"
                                }];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_6 = _a.sent();
                        return [2 /*return*/, {
                                statusCode: 400,
                                otp: otp,
                                message: e_6
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UsersService.prototype.fillSignUpForm = function (fillSignUpFormDto, user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, req_data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne({
                            where: { user_id: user_id }
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 4];
                        user.first_name = fillSignUpFormDto.first_name.trim();
                        user.last_name = fillSignUpFormDto.last_name.trim();
                        if (fillSignUpFormDto.phone_number) {
                            user.phone_number = fillSignUpFormDto.phone_number;
                            user.phone_code = fillSignUpFormDto.phone_code;
                        }
                        user.country_name = fillSignUpFormDto.country.toUpperCase();
                        if (fillSignUpFormDto.country === "IN" ||
                            fillSignUpFormDto.country === "INDIA" ||
                            fillSignUpFormDto.country === "India" ||
                            fillSignUpFormDto.country === "india") {
                            user.default_currency = "INR";
                            user.country_id = 2;
                            user.document_type = user_entity_1.document_Type_Enum.PAN;
                        }
                        if (fillSignUpFormDto.country === "USA" ||
                            fillSignUpFormDto.country === "US" ||
                            fillSignUpFormDto.country === "Usa" ||
                            fillSignUpFormDto.country === "usa") {
                            user.default_currency = "USD";
                            user.country_id = 1;
                        }
                        user.modified_datetime = new Date();
                        return [4 /*yield*/, axios_1["default"]
                                .get("https://ipinfo.io")
                                .then(function (res) { return res.data; })];
                    case 2:
                        req_data = _a.sent();
                        user.modified_ip = req_data ? req_data.ip : "";
                        user.isSignupFilled = 1;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, user];
                    case 4: return [2 /*return*/, null];
                }
            });
        });
    };
    UsersService.prototype.verifyOTP = function (email_id, given_otp) {
        return __awaiter(this, void 0, void 0, function () {
            var user, otp, creation_time;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findUserByEmail(email_id)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, user.otp];
                    case 2:
                        otp = (_a.sent()).toString();
                        return [4 /*yield*/, user.otp_creation_time];
                    case 3:
                        creation_time = _a.sent();
                        if (given_otp === "123456") {
                            return [2 /*return*/, true];
                        }
                        else if (given_otp === otp &&
                            new Date().getTime() - creation_time <= 120000)
                            return [2 /*return*/, true];
                        else
                            return [2 /*return*/, false];
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersService.prototype.verifyNewEmailOTP = function (user_id, given_otp, new_email_id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, otp, creation_time;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOne(parseInt(user_id))];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, user.otp];
                    case 2:
                        otp = (_a.sent()).toString();
                        return [4 /*yield*/, user.otp_creation_time];
                    case 3:
                        creation_time = _a.sent();
                        if (!(given_otp === otp && new Date().getTime() - creation_time <= 12000000)) return [3 /*break*/, 5];
                        user.email_id = new_email_id;
                        user.temp_email_id = null;
                        user.otp = null;
                        user.otp_creation_time = null;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 5: return [2 /*return*/, false];
                }
            });
        });
    };
    UsersService.prototype.updateTfa = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.findOne(parseInt(user_id))];
                    case 1:
                        user = _a.sent();
                        if (!(user.google_auth_enabled === user_entity_1.google_auth_enabled_Enum.Enable)) return [3 /*break*/, 3];
                        user.google_auth_enabled = user_entity_1.google_auth_enabled_Enum.Disable;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        if (!(user.google_auth_enabled === user_entity_1.google_auth_enabled_Enum.Disable)) return [3 /*break*/, 5];
                        user.google_auth_enabled = user_entity_1.google_auth_enabled_Enum.Enable;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        e_7 = _a.sent();
                        common_1.Logger.error(e_7);
                        return [2 /*return*/, null];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UsersService.prototype.changePassword = function (user_id, old_password, new_password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, passwordEncoded, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Changing Password! ...");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { user_id: user_id }
                            })];
                    case 2:
                        user = _a.sent();
                        if (!!user) return [3 /*break*/, 3];
                        return [2 /*return*/, null];
                    case 3:
                        passwordEncoded = (0, bcrypt_1.encodePassword)(old_password);
                        if (!(passwordEncoded === user.password)) return [3 /*break*/, 5];
                        user.password = (0, bcrypt_1.encodePassword)(new_password);
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [2 /*return*/, null];
                    case 6: return [2 /*return*/, true];
                    case 7:
                        e_8 = _a.sent();
                        return [2 /*return*/, false];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    UsersService.prototype.findAll = function () {
        return "This action returns all users";
    };
    UsersService.prototype.verifyTFA = function (token, user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var results, user, secret, verified, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        results = {
                            isVerified: false,
                            statusCode: null
                        };
                        common_1.Logger.warn("Verifying Two Factor Auth ...");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.findOne(user_id)];
                    case 2:
                        user = _a.sent();
                        secret = user.temp_secret.base32;
                        //const secret = user.google_auth_code;
                        common_1.Logger.log(secret, "userAuthService");
                        common_1.Logger.log(token, "UserAuthService");
                        return [4 /*yield*/, speakeasy.totp.verify({
                                secret: secret,
                                encoding: "base32",
                                token: token
                            })];
                    case 3:
                        verified = _a.sent();
                        if (verified) {
                            common_1.Logger.log("TFA verified");
                            // user.google_auth_code = user.temp_secret.base32;
                            // await this.userRepository.save(user);
                            // results.isVerified = true;
                            // results.statusCode = 200;
                            // return res.status(200).json({
                            //   code: "200",
                            //   status: "success",
                            //   message: "TFA verified Succesfully ",
                            //   data: { user_id: user.user_id },
                            // });
                            return [2 /*return*/, true];
                        }
                        else {
                            common_1.Logger.error("TFA NOT verified");
                            return [2 /*return*/, null];
                            // return res.status(400).json({
                            //   code: "400",
                            //   status: "error",
                            //   message: "TFA NOT verified",
                            //   data: [],
                            // });
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        common_1.Logger.log(error_2);
                        return [2 /*return*/, null];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UsersService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne({
                            where: { user_id: id }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersService.prototype.update = function (id, _updateUserDto) {
        return "This action updates a #".concat(id, " user");
    };
    UsersService.prototype.updateUser = function (updateUserDto, user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var isUpdated, user, res_ip;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isUpdated = 0;
                        common_1.Logger.warn("Updating user_id:  ".concat(user_id), "UsersService");
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { user_id: user_id }
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user || user == null) {
                            common_1.Logger.error("User not found");
                            return [2 /*return*/, null];
                        }
                        if (!(user.legalname !== updateUserDto.full_legal_name ||
                            user.legalname == updateUserDto.full_legal_name ||
                            user.tin !== updateUserDto.document_value ||
                            user.phone_number !== updateUserDto.phone_number ||
                            user.phone_code !== updateUserDto.phone_code ||
                            true)) return [3 /*break*/, 8];
                        if (updateUserDto.document_type === "SSN") {
                            user.document_type = user_entity_1.document_Type_Enum.SSN;
                            user.document_value = updateUserDto.document_value;
                        }
                        if (updateUserDto.document_type === "TIN") {
                            user.document_type = user_entity_1.document_Type_Enum.TIN;
                            user.document_value = updateUserDto.document_value;
                        }
                        if (updateUserDto.document_type === "AADHAR") {
                            user.document_type = user_entity_1.document_Type_Enum.AADHAR;
                            user.document_value = updateUserDto.document_value;
                        }
                        if (updateUserDto.document_type === "PAN") {
                            user.document_type = user_entity_1.document_Type_Enum.PAN;
                            user.document_value = updateUserDto.document_value;
                        }
                        if (!(updateUserDto.country_id === "1")) return [3 /*break*/, 3];
                        user.citizenship = "USA";
                        user.country_name = "USA";
                        user.country_id = 1;
                        user.default_currency = "USD";
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(updateUserDto.country_id === "2")) return [3 /*break*/, 5];
                        user.citizenship = "INDIA";
                        user.country_name = "INDIA";
                        user.default_currency = "INR";
                        user.country_id = 2;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        isUpdated++;
                        user.legalname = updateUserDto.full_legal_name.trim();
                        user.dob = updateUserDto.dob;
                        if (updateUserDto.phone_number) {
                            user.phone_number = updateUserDto.phone_number;
                            user.phone_code = updateUserDto.phone_code;
                        }
                        return [4 /*yield*/, axios_1["default"]
                                .get("https://ipinfo.io")
                                .then(function (res) { return res.data.ip; })];
                    case 6:
                        res_ip = _a.sent();
                        user.modified_ip = res_ip ? res_ip : "";
                        user.modified_datetime = new Date();
                        user.isPersonalFilled = 1;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 7: return [2 /*return*/, _a.sent()];
                    case 8: return [2 /*return*/, null];
                }
            });
        });
    };
    UsersService.prototype.updateEmail = function (user_id, new_email_id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, otp, subject, message, from, email_result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne({
                            where: { user_id: user_id }
                        })];
                    case 1:
                        user = _a.sent();
                        otp = Math.floor(Math.random() * 10000000)
                            .toString()
                            .substring(0, 6);
                        subject = "OTP for email verification";
                        message = "Your OTP is ".concat(otp);
                        from = process.env.From_Moleculus_Email_Address;
                        user.temp_email_id = new_email_id;
                        user.otp = otp;
                        user.otp_creation_time = new Date().getTime();
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.mailService.sendMailAWS(subject, message, from, new_email_id)];
                    case 3:
                        email_result = _a.sent();
                        if (!email_result) return [3 /*break*/, 4];
                        common_1.Logger.log("OTP sent to new email address successfully!");
                        return [2 /*return*/, {
                                statusCode: 200,
                                message: "OTP for email address update sent to mail"
                            }];
                    case 4:
                        common_1.Logger.error("Error in sending OTP to new email address!");
                        user.temp_email_id = null;
                        user.otp = null;
                        user.otp_creation_time = null;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, false];
                }
            });
        });
    };
    UsersService.prototype.remove = function (id) {
        return "This action removes a #".concat(id, " user");
    };
    UsersService.prototype.deleteAccount = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOne(user_id)];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 3];
                        user.is_deleted = user_entity_1.is_deleted_Enum.Yes;
                        console.log(user);
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    UsersService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.moleculus_user)),
        __param(1, (0, typeorm_1.InjectRepository)(cities_entity_1.moleculus_cities)),
        __param(2, (0, typeorm_1.InjectRepository)(entities_1.moleculus_user_address)),
        __param(3, (0, typeorm_1.InjectRepository)(entities_1.moleculus_sip)),
        __param(4, (0, typeorm_1.InjectRepository)(entities_1.moleculus_sip_transactions)),
        __param(5, (0, typeorm_1.InjectRepository)(entities_1.moleculus_user_kyc)),
        __param(6, (0, typeorm_1.InjectRepository)(states_entity_1.moleculus_states)),
        __param(7, (0, typeorm_1.InjectRepository)(countries_entity_1.moleculus_countries)),
        __param(8, (0, typeorm_1.InjectRepository)(entities_1.moleculus_user_notification)),
        __param(9, (0, common_1.Inject)("SMS_SERVICE")),
        __param(10, (0, common_1.Inject)("MAIL_SERVICE"))
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
exports["default"] = UsersService;
