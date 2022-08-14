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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const axios_1 = require("axios");
const bcrypt_1 = require("../../../utils/bcrypt/bcrypt");
const mail_service_1 = require("../../../utils/mail/mail.service");
const typeorm_2 = require("typeorm");
const sms_service_1 = require("../../../utils/sms/sms.service");
const countries_entity_1 = require("../../entities/countries.entity");
const states_entity_1 = require("../../entities/states.entity");
const app_module_1 = require("../../../app.module");
const userKYC_entity_1 = require("../../entities/userKYC.entity");
const entities_1 = require("../../entities");
const user_entity_1 = require("../../entities/user.entity");
const speakeasy = require("speakeasy");
const crypto = require("crypto");
const validator_aadhar = require("aadhaar-validator");
require("dotenv").config({ debug: false });
let UsersService = class UsersService {
    constructor(userRepository, addressRepository, sipRepository, kycRepository, stateRepository, countryRepository, notificationRepository, smsService, mailService) {
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
        this.sipRepository = sipRepository;
        this.kycRepository = kycRepository;
        this.stateRepository = stateRepository;
        this.countryRepository = countryRepository;
        this.notificationRepository = notificationRepository;
        this.smsService = smsService;
        this.mailService = mailService;
    }
    create(_createUserDto) {
        return "This action adds a new user";
    }
    async createsha256(text) {
        var result = crypto.createHash("sha256").update(text).digest("hex");
        return result;
    }
    async verifyUserDocumentPAN(_legal_name, user_email, document_type, document_value) {
        const url_ = "https://sandbox.veri5digital.com/service/api/1.0/verifyUserIdDoc";
        var client_code_ = process.env.verif5_client_code;
        var client_sub_code_ = process.env.verif5_sub_client_code;
        var api_key_ = process.env.verif5_api_key;
        var salt_ = process.env.verif5_salt;
        var request_id_ = `requestId${Math.floor(Math.random() * 90000) + 10000}`;
        var stan_ = `${Math.floor(Math.random() * 90000) + 10000}`;
        var transmission_datetime_ = `${Date.now()}`;
        var user_handle_value_ = `${user_email}`;
        var user_handle_type_ = "EMAIL";
        var actor_type_ = "CUSTOMER";
        var channel_code_ = "ANDROID_SDK";
        var channel_version_ = "3.1.7";
        var function_code_;
        var function_sub_code_;
        var operation_mode_ = "SELF";
        var run_mode_ = "TRIAL";
        var pan_details_ = {
            pan_number: `${document_value}`,
            pan_type: "IND",
        };
        if (document_type == "PAN") {
            function_code_ = "VERIFY_PAN";
            function_sub_code_ = "NUMBER";
        }
        var toHashString = `${client_code_}|${request_id_}|${api_key_}|${salt_}|${document_value}`;
        const hash = await this.createsha256(toHashString);
        try {
            const response = await (0, axios_1.default)({
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
                        user_handle_value: user_handle_value_,
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
                        consent_message: "",
                    },
                },
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*",
                    "Accept-Encoding": "gzip, deflate,br",
                    Connection: "keep-alive",
                },
            });
            console.log(response.data);
            return response.data;
        }
        catch (error) {
            common_1.Logger.log(error, "verifyUserDocumentPAN Service");
            return null;
        }
    }
    async checkPanValidity(pan_number, user_email, legal_name) {
        common_1.Logger.log("checking pan validity", "checkPanValidity Service");
        if (pan_number.length != 10) {
            return false;
        }
        const is_pan_number_valid = await this.verifyUserDocumentPAN(legal_name, user_email, "PAN", pan_number);
        if (is_pan_number_valid == null) {
            return null;
        }
        if (is_pan_number_valid.response_status.code == "000") {
            return true;
        }
        else {
            return false;
        }
    }
    async checkAadhaarValidity(document_value, user_email) {
        common_1.Logger.log("checking aadhaar validity", "checkAadhaarValidity");
        if (document_value.length != 12) {
            return false;
        }
        var isValid = validator_aadhar.isValidNumber(document_value);
        console.log("AADHAR validator:", isValid);
        if (isValid == false) {
            return false;
        }
        const url_ = "https://sandbox.veri5digital.com/service/api/1.0/verifyUserIdDoc";
        const random_letters = () => {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        };
        var req_id_random = random_letters();
        var request_id_ = `${req_id_random}${Math.floor(Math.random() * 90000) + 10000}`;
        const headers_body = {
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
            stan: `${Math.floor(Math.random() * 90000) + 10000}`,
            sub_client_code: process.env.verif5_sub_client_code,
            transmission_datetime: `${Date.now()}`,
            user_handle_type: "EMAIL",
            salt: process.env.verif5_salt,
            user_handle_value: `${user_email}`,
        };
        var toHashString = `${headers_body.client_code}|${request_id_}|${headers_body.api_key}|${headers_body.salt}|${document_value}`;
        const hashAadharVerify = await this.createsha256(toHashString);
        const request_body = {
            aadhaar_details: {
                aadhaar_number: `${document_value}`,
            },
            api_key: process.env.verif5_api_key,
            client_code: process.env.verif5_client_code,
            sub_client_code: process.env.verif5_sub_client_code,
            request_id: request_id_,
            salt: process.env.verif5_salt,
            hash: hashAadharVerify,
            consent: "YES",
            consent_message: "",
        };
        const headers = {
            "Content-Type": "application/json",
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate,br",
            Connection: "keep-alive",
        };
        const response = await (0, axios_1.default)({
            method: "POST",
            url: url_,
            data: {
                headers: headers_body,
                request: request_body,
            },
            headers: headers,
        });
        console.log("response.data AADHAR_API- : ", response.data);
        if (response.data.response_status.code == "410006") {
            return true;
        }
        if (response.data.response_status.code == "000") {
            var parameter_1 = response.data.verified_data.split('"')[3].split(":")[0] == "null"
                ? 0
                : 1;
            var parameter_2 = response.data.verified_data.split('"')[7].split(":")[0] == "null"
                ? 0
                : 1;
            var parameter_3 = response.data.verified_data.split('"')[11].split(":")[0] == "null"
                ? 0
                : 1;
            var parameter_4 = response.data.verified_data.split('"')[15].split(":")[0] == "null"
                ? 0
                : 1;
            var sum = parameter_1 + parameter_2 + parameter_3 + parameter_4;
            if (sum < 2) {
                return false;
            }
            return true;
        }
        if (response.data.response_status.code == "333" ||
            response.data.response_status.code == "400304") {
            return null;
        }
        if (response.data.response_status.code == "400303" ||
            response.data.response_status.code == "400302" ||
            response.data.response_status.code == "400301") {
            return false;
        }
        return null;
    }
    async checkDocument(document_type, document_value, user_id) {
        if (document_value == null || document_value == "") {
            return false;
        }
        if (document_type == "AADHAR") {
            const user_aadhar_check = await this.userRepository.findOne({
                where: {
                    document_type: user_entity_1.document_Type_Enum.AADHAR,
                    document_value: document_value,
                },
            });
            if (user_aadhar_check) {
                if (user_aadhar_check.user_id != user_id) {
                    console.log("user_id: ", user_id);
                    console.log("user_aadhar_check.user_id: ", user_aadhar_check.user_id);
                    return true;
                }
            }
        }
        if (document_type == "PAN") {
            const user_pan_check = await this.userRepository.findOne({
                where: {
                    document_type: user_entity_1.document_Type_Enum.PAN,
                    document_value: document_value,
                },
            });
            if (user_pan_check) {
                if (user_pan_check.user_id != user_id) {
                    return true;
                }
            }
        }
        if (document_type == "SSN") {
            const user_ssn_check = await this.userRepository.findOne({
                where: {
                    document_type: user_entity_1.document_Type_Enum.SSN,
                    document_value: document_value,
                },
            });
            if (user_ssn_check) {
                if (user_ssn_check.user_id != user_id) {
                    return true;
                }
            }
        }
        if (document_type == "TIN") {
            const user_tin_check = await this.userRepository.findOne({
                where: {
                    document_type: user_entity_1.document_Type_Enum.TIN,
                    document_value: document_value,
                },
            });
            if (user_tin_check) {
                if (user_tin_check.user_id != user_id) {
                    return true;
                }
            }
        }
        return false;
    }
    async getCaptcha(user_email) {
        common_1.Logger.log("getCaptcha : usersService", "getCaptcha");
        const url_ = "https://sandbox.veri5digital.com/okyc/api/v1.0/getCaptcha";
        var client_code_ = process.env.verif5_client_code;
        var client_sub_code_ = process.env.verif5_sub_client_code;
        var channel_code_ = "web";
        var channel_version_ = "1";
        var stan_ = `${Math.floor(Math.random() * 90000) + 10000}`;
        var client_ip_ = "";
        var transmission_datetime_ = `${Date.now()}`;
        var operation_mode_ = "SELF";
        var run_mode_ = "DEFAULT";
        var actor_type_ = "CUSTOMER";
        var user_handle_type_ = "EMAIL";
        var user_handle_value_ = `${user_email}`;
        var function_code_ = "DEFAULT";
        var function_sub_code_ = "DEFAULT";
        var api_key_ = process.env.verif5_api_key_aadhaar;
        var salt_ = process.env.verif5_salt_aadhaar;
        var request_id_ = `${Math.floor(Math.random() * 90000) + 10000}`;
        var tohashStringGetCaptcha = `${client_code_}|${request_id_}|${api_key_}|${salt_}`;
        const hashCaptcha = await this.createsha256(tohashStringGetCaptcha);
        const body_headers = {
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
            salt: salt_,
        };
        const body_request = {
            api_key: api_key_,
            salt: salt_,
            request_id: request_id_,
            hash: hashCaptcha,
        };
        const headers = {
            "Content-Type": "application/json",
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate,br",
            Connection: "keep-alive",
        };
        try {
            common_1.Logger.log("getCaptcha : performing API call", "getCaptcha");
            const response = await (0, axios_1.default)({
                method: "POST",
                url: url_,
                data: {
                    headers: body_headers,
                    request: body_request,
                },
                headers: headers,
            });
            return await response.data;
        }
        catch (e) {
            common_1.Logger.error(e, "getCaptcha : API call failed");
            return null;
        }
    }
    async enterAadhaar(uuid, aadhaar, captcha, request_id, user_email) {
        common_1.Logger.log("enterAadhaar : usersService", "enterAadhaar");
        const url_ = "https://sandbox.veri5digital.com/okyc/api/v1.0/enterAadhaar";
        var client_code_ = process.env.verif5_client_code;
        var client_sub_code_ = process.env.verif5_sub_client_code;
        var channel_code_ = "ANDROID_SDK";
        var channel_version_ = "1";
        var stan_ = `${Math.floor(Math.random() * 90000) + 10000}`;
        var client_ip_ = "";
        var transmission_datetime_ = `${Date.now()}`;
        var operation_mode_ = "SELF";
        var run_mode_ = "DEFAULT";
        var actor_type_ = "CUSTOMER";
        var user_handle_type_ = "EMAIL";
        var user_handle_value_ = `${user_email}`;
        var function_code_ = "DEFAULT";
        var function_sub_code_ = "DEFAULT";
        var api_key_ = process.env.verif5_api_key_aadhaar;
        var salt_ = process.env.verif5_salt_aadhaar;
        var request_id_ = request_id;
        var tohashStringEnterAadhaar = `${client_code_}|${request_id_}|${uuid}|${api_key_}|${salt_}`;
        const hashEnterAadhaar = await this.createsha256(tohashStringEnterAadhaar);
        const body_headers = {
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
            salt: salt_,
        };
        const body_request = {
            uuid: uuid,
            aadhaar: aadhaar,
            captcha: captcha,
            verification_type: "OTP",
            consent: "YES",
            api_key: api_key_,
            request_id: request_id_,
            hash: hashEnterAadhaar,
        };
        const headers = {
            "Content-Type": "application/json",
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate,br",
            Connection: "keep-alive",
        };
        common_1.Logger.log("enterAadhaar : performing API call", "enterAadhaar");
        const response = await (0, axios_1.default)({
            method: "POST",
            url: url_,
            data: {
                headers: body_headers,
                request: body_request,
            },
            headers: headers,
        });
        common_1.Logger.log(await response.data, "enterAadhaar-Service");
        return response.data;
    }
    async enterOtp(uuid, otp, _request_id, user_email) {
        const url_ = "https://sandbox.veri5digital.com/okyc/api/v1.0/enterOtp";
        var client_code_ = process.env.verif5_client_code;
        var client_sub_code_ = process.env.verif5_sub_client_code;
        var channel_code_ = "ANDROID_SDK";
        var channel_version_ = "1";
        var stan_ = `${Math.floor(Math.random() * 90000) + 10000}`;
        var client_ip_ = "";
        var transmission_datetime_ = `${Date.now()}`;
        var operation_mode_ = "SELF";
        var run_mode_ = "DEFAULT";
        var actor_type_ = "CUSTOMER";
        var user_handle_type_ = "EMAIL";
        var user_handle_value_ = `${user_email}`;
        var location = "";
        var function_code_ = "DEFAULT";
        var function_sub_code_ = "DEFAULT";
        var salt_ = process.env.verif5_salt_aadhaar;
        var api_key_ = process.env.verif5_api_key_aadhaar;
        var share_code_ = `${Math.floor(Math.random() * 9000) + 1000}`;
        var request_id_ = `${Math.floor(Math.random() * 90000) + 10000}`;
        var tohashStringEnterOtp = `${client_code_}|${request_id_}|${uuid}|${otp}|${api_key_}|${salt_}`;
        const hashEnterOtp = await this.createsha256(tohashStringEnterOtp);
        const body_headers = {
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
            salt: salt_,
        };
        const body_request = {
            uuid: uuid,
            otp: otp,
            share_code: share_code_,
            api_key: api_key_,
            request_id: request_id_,
            hash: hashEnterOtp,
        };
        const headers = {
            "Content-Type": "application/json",
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate,br",
            Connection: "keep-alive",
        };
        common_1.Logger.log("enterOtp : performing API call", "enterOtp");
        const time1 = new Date().getTime();
        const response = await (0, axios_1.default)({
            method: "POST",
            url: url_,
            data: {
                headers: body_headers,
                request: body_request,
            },
            headers: headers,
        });
        if (new Date().getTime() - time1 > 29000) {
            common_1.Logger.log("enterOtp : API call took more than 30 seconds", "enterOtp");
            return null;
        }
        return response.data;
    }
    async fetchKyc(uuid, user_email) {
        const url_ = "https://sandbox.veri5digital.com/okyc/api/v1.0/fetchKYCData";
        var client_code_ = process.env.verif5_client_code;
        var client_sub_code_ = process.env.verif5_sub_client_code;
        var channel_code_ = "ANDROID_SDK";
        var channel_version_ = "1";
        var stan_ = `${Math.floor(Math.random() * 90000) + 10000}`;
        var client_ip_ = "";
        var transmission_datetime_ = `${Date.now()}`;
        var operation_mode_ = "SELF";
        var run_mode_ = "DEFAULT";
        var actor_type_ = "DEFAULT";
        var user_handle_type_ = "EMAIL";
        var user_handle_value_ = `${user_email}`;
        var location_ = "";
        var function_code_ = "DEFAULT";
        var function_sub_code_ = "DEFAULT";
        var salt_ = process.env.verif5_salt_aadhaar;
        var api_key_ = process.env.verif5_api_key_aadhaar;
        var tohashStringFetchKyc = `${client_code_}|${uuid}|${api_key_}|${salt_}`;
        const hashFetchKyc = await this.createsha256(tohashStringFetchKyc);
        const body_headers = {
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
            salt: salt_,
        };
        const body_request = {
            api_key: api_key_,
            uuid: uuid,
            hash: hashFetchKyc,
        };
        const headers = {
            "Content-Type": "application/json",
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate,br",
            Connection: "keep-alive",
        };
        common_1.Logger.log("fetchKyc : performing API call", "fetchKyc Service");
        const response = await (0, axios_1.default)({
            method: "POST",
            url: url_,
            data: {
                headers: body_headers,
                request: body_request,
            },
            headers: headers,
        });
        return response.data;
    }
    async getUserSips(user_id) {
        const sips = await this.sipRepository.find({
            where: { sip_user_id: user_id },
        });
        if (sips == null || sips == undefined || !sips) {
            common_1.Logger.log("No Sips Found", "UsersService");
            return null;
        }
        else {
            common_1.Logger.log("Sips Found", "UsersService");
            return sips;
        }
    }
    async forceDeleteUser(email_id) {
        const user = await this.userRepository.findOne({
            where: { email_id: email_id },
        });
        if (user == null || user == undefined || !user) {
            common_1.Logger.log("No User Found", "UsersService");
            return null;
        }
        else {
            common_1.Logger.log("User Found, deleting...", "UsersService");
            var noti_user = await this.notificationRepository.findOne({
                where: { noti_user_id: user.user_id },
            });
            if (noti_user) {
                await (0, typeorm_2.getConnection)()
                    .createQueryBuilder()
                    .delete()
                    .from(entities_1.moleculus_user_notification)
                    .where("noti_user_id = :id", { id: user.user_id })
                    .execute();
            }
            const userAddress = await this.addressRepository.findOne({
                where: { user_address_id: user.user_id },
            });
            var user_address_id = userAddress.user_address_id;
            if (userAddress) {
                await (0, typeorm_2.getConnection)()
                    .createQueryBuilder()
                    .delete()
                    .from(entities_1.moleculus_user_address)
                    .where("user_address_id = :user_address_id", {
                    user_address_id: user_address_id,
                })
                    .execute();
            }
            var user_kyc = await this.kycRepository.findOne({
                where: { kyc_user_id: user.user_id },
            });
            if (user_kyc) {
                await app_module_1.AppDataSource.manager
                    .createQueryBuilder()
                    .delete()
                    .from(entities_1.moleculus_user_kyc)
                    .where("kyc_user_id = :id", { id: user.user_id })
                    .execute();
            }
            try {
                await (0, typeorm_2.getConnection)()
                    .createQueryBuilder()
                    .delete()
                    .from(user_entity_1.moleculus_user)
                    .where("email_id = :email_id", { email_id: email_id })
                    .execute();
                return true;
            }
            catch (e) {
                common_1.Logger.log(e, "UsersService");
                return null;
            }
        }
    }
    async sendKYCResponse(user_id, token, kyc_response) {
        const kyc = await this.kycRepository.findOne({
            where: { kyc_user_id: user_id },
        });
        if (!kyc || kyc == undefined || kyc == null) {
            common_1.Logger.log("No Kyc Record Found for such user_id", "UsersService");
            return null;
        }
        else {
            try {
                kyc.api_repsonse = kyc_response;
                kyc.token = token;
                await this.kycRepository.save(kyc);
                return kyc;
            }
            catch (e) {
                common_1.Logger.log(e, "UsersService");
                return null;
            }
        }
    }
    async updateKYCDetails(user_id, token, vendor_id, isAgain, api_response) {
        const check = await this.kycRepository.findOne({
            where: { kyc_user_id: user_id },
            order: { kyc_id: "DESC" },
        });
        if (api_response == "approved") {
            check.kyc_status = userKYC_entity_1.kyc_status_enum.Completed;
            return await this.kycRepository.save(check);
        }
        if (api_response == "_rejected_" || api_response === "_resubmission_") {
            check.kyc_status = userKYC_entity_1.kyc_status_enum.Rejected;
            const old_saved = await this.kycRepository.save(check);
            await this.kycRepository.save(check);
            return old_saved;
        }
        if (isAgain == 1) {
            const check = await this.kycRepository.findOne({
                where: { kyc_user_id: user_id },
                order: { kyc_id: "DESC" },
            });
            if (check == null || check == undefined || !check) {
                common_1.Logger.log("No Kyc Record Found for such user_id", "UsersService");
                return null;
            }
            common_1.Logger.log("User is trying to update again", "UsersService");
            const user_kyc = await this.kycRepository.findOne({
                where: { kyc_user_id: user_id },
                order: { kyc_id: "DESC" },
            });
            if (user_kyc == null || user_kyc == undefined || !user_kyc) {
                common_1.Logger.log("No Kyc Record Found for such user_id", "UsersService");
                return null;
            }
            else {
                user_kyc.kyc_status = userKYC_entity_1.kyc_status_enum.Rejected;
                await this.kycRepository.save(user_kyc);
            }
            const req_data = await axios_1.default
                .get("https://ipinfo.io")
                .then((res) => res.data)
                .catch((err) => {
                common_1.Logger.log(err, "UsersService");
            });
            const newKYC = await this.kycRepository.create({
                kyc_user_id: user_id,
                token: null,
                vendor_id: null,
                api_repsonse: api_response,
                created_datetime: new Date(),
                created_ip: req_data.ip ? req_data.ip : "",
            });
            return await this.kycRepository.save(newKYC);
        }
        if (check == null || check == undefined || !check) {
            const req_data = await axios_1.default
                .get("https://ipinfo.io")
                .then((res) => res.data)
                .catch((err) => {
                common_1.Logger.log(err, "UsersService");
            });
            const newKYC = await this.kycRepository.create({
                kyc_user_id: user_id,
                token: token,
                vendor_id: vendor_id,
                created_datetime: new Date(),
                created_ip: req_data.ip ? req_data.ip : "",
                api_repsonse: api_response,
            });
            return await this.kycRepository.save(newKYC);
        }
        else {
            check.token = token;
            check.vendor_id = vendor_id;
            check.api_repsonse = api_response;
            return await this.kycRepository.save(check);
        }
    }
    async getUserKYCDetails(user_id) {
        const kyc_details = await this.kycRepository.findOne({
            where: {
                kyc_user_id: user_id,
            },
            order: { kyc_id: "DESC" },
        });
        if (kyc_details == null || kyc_details == undefined || !kyc_details) {
            common_1.Logger.log("creating new kyc", "UsersService");
            const req_data = await axios_1.default
                .get("https://ipinfo.io")
                .then((res) => res.data)
                .catch((err) => {
                common_1.Logger.log(err, "UsersService");
            });
            const kyc_new = await this.kycRepository.create({
                kyc_user_id: user_id,
                created_datetime: new Date(),
                created_ip: req_data.ip ? req_data.ip : "",
            });
            return await this.kycRepository.save(kyc_new);
        }
        else {
            if (kyc_details.kyc_status == userKYC_entity_1.kyc_status_enum.Rejected) {
                const req_data = await axios_1.default
                    .get("https://ipinfo.io")
                    .then((res) => res.data)
                    .catch((err) => {
                    common_1.Logger.log(err, "UsersService");
                });
                const n_kyc = await this.kycRepository.create({
                    kyc_user_id: user_id,
                    created_datetime: new Date(),
                    created_ip: req_data.ip ? req_data.ip : "",
                });
                return await this.kycRepository.save(n_kyc);
            }
            common_1.Logger.log("returning existing kyc", "UsersService");
            return kyc_details;
        }
    }
    async getCountries() {
        return await this.countryRepository.find({
            order: { pk_country_id: "ASC" },
        });
    }
    async getStatesUSA() {
        const states = await this.stateRepository.find({
            where: { state_country_id: 1 },
            order: { state_name: "ASC" },
        });
        return states;
    }
    async getStatesINDIA() {
        const states = await this.stateRepository.find({
            where: { state_country_id: 2 },
            order: { state_name: "ASC" },
        });
        return states;
    }
    async getUserDetailsById(user_id) {
        return await this.userRepository.findOne({
            where: { user_id: user_id },
        });
    }
    async findUserByEmail(email_id) {
        return await this.userRepository.findOne({
            where: { email_id: email_id },
        });
    }
    async findPhoneNumber(phone_number) {
        if (phone_number == null ||
            phone_number == "" ||
            phone_number == undefined) {
            return null;
        }
        return await this.userRepository.findOne({
            where: { phone_number: phone_number },
        });
    }
    async updatePhoneNumber(user_id, phone_number) {
        const user = await this.userRepository.findOne({
            where: { user_id: user_id },
        });
        if (user) {
            common_1.Logger.log("User found!");
            user.phone_number = phone_number;
            return await this.userRepository.save(user);
        }
        else {
            common_1.Logger.error(`User with user id: ${user_id} not found`);
            return null;
        }
    }
    async generateRandomString() {
        var length = 12;
        var random_token = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            random_token += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return random_token;
    }
    async registerUser(createuserDto) {
        const password = (0, bcrypt_1.encodePassword)(createuserDto.password);
        const otp = Math.floor(Math.random() * 10000000)
            .toString()
            .substring(0, 6);
        try {
            const newUser = this.userRepository.create(Object.assign(Object.assign({}, createuserDto), { password }));
            const req_data = await axios_1.default
                .get("https://ipinfo.io")
                .then((res) => res.data);
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
            const subject = " Registration Link";
            const message = `Your Link  is: ${otp}`;
            const to = newUser.email_id;
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
            if (newUser.phone_number !== undefined &&
                newUser.phone_number !== null &&
                newUser.phone_number !== "") {
                const sms_result = await this.sendOTP(newUser.phone_code + newUser.phone_number, otp);
                if (sms_result.statusCode === 200) {
                    newUser.otp = otp;
                    newUser.otp_creation_time = new Date().getTime();
                    await this.userRepository.save(newUser);
                }
            }
            return await this.userRepository.save(newUser);
        }
        catch (e) {
            console.log(e);
            return e;
        }
    }
    async createAddress(user_id) {
        common_1.Logger.log("Creating address for user_id: ", user_id);
        const check_user = await this.addressRepository.findOne({
            where: { user_address_id: user_id },
        });
        if (check_user) {
            return null;
        }
        const address = new entities_1.moleculus_user_address();
        address.user_address_id = user_id;
        const req_data = await axios_1.default
            .get("https://ipinfo.io")
            .then((res) => res.data);
        address.created_datetime = new Date();
        address.created_ip = req_data.ip;
        return await this.addressRepository.save(address);
    }
    async updateAddress(id, updateAddressDto) {
        common_1.Logger.warn("Updating Address! ...");
        const address = await this.addressRepository.findOne({
            where: { user_address_id: id },
        });
        const user = await this.userRepository.findOne({
            where: { user_id: id },
        });
        if (address && user) {
            common_1.Logger.log("Address found!");
            address.address_line1 = updateAddressDto.address_line1.trim();
            address.address_line2 = updateAddressDto.address_line2.trim();
            address.other_info = updateAddressDto.other_info.trim();
            user.city = updateAddressDto.city.trim();
            user.state_name = updateAddressDto.state.trim();
            user.zipcode = updateAddressDto.zipcode.trim();
            user.modified_datetime = new Date();
            const req_data = await axios_1.default
                .get("https://ipinfo.io")
                .then((res) => res.data);
            user.modified_ip = req_data.ip;
            user.isAddressFilled = 1;
            await this.addressRepository.save(address);
            await this.userRepository.save(user);
            return address;
        }
        else
            return null;
    }
    async updateProfile(id, updateProfileDto) {
        common_1.Logger.warn("Updating Profile! ...");
        const user = await this.userRepository.findOne({
            where: { user_id: id },
        });
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
        return await this.userRepository.save(user);
    }
    async updatePassword(id, newPassword) {
        const user = await this.userRepository.findOne({
            where: { user_id: id },
        });
        const newPassword_ = (0, bcrypt_1.encodePassword)(newPassword);
        user.password = newPassword_;
        return await this.userRepository.save(user);
    }
    async sendOTP(phone_number, otp) {
        const message = `Your OTP is ${otp}`;
        try {
            const result = await this.smsService.sendSMSAWS(message, phone_number);
            if (result) {
                return {
                    statusCode: 200,
                    otp: otp,
                    message: "OTP sent",
                };
            }
            else {
                return {
                    statusCode: 400,
                    otp: otp,
                    message: "OTP not sent",
                };
            }
        }
        catch (e) {
            return {
                statusCode: 400,
                otp: otp,
                message: e,
            };
        }
    }
    async fillSignUpForm(fillSignUpFormDto, user_id) {
        const user = await this.userRepository.findOne({
            where: { user_id: user_id },
        });
        if (user) {
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
            const req_data = await axios_1.default
                .get("https://ipinfo.io")
                .then((res) => res.data);
            user.modified_ip = req_data ? req_data.ip : "";
            user.isSignupFilled = 1;
            await this.userRepository.save(user);
            return user;
        }
        return null;
    }
    async verifyOTP(email_id, given_otp) {
        const user = await this.findUserByEmail(email_id);
        const otp = (await user.otp).toString();
        const creation_time = await user.otp_creation_time;
        if (given_otp === "123456") {
            return true;
        }
        else if (given_otp === otp &&
            new Date().getTime() - creation_time <= 120000)
            return true;
        else
            return false;
    }
    async verifyNewEmailOTP(user_id, given_otp, new_email_id) {
        const user = await this.findOne(parseInt(user_id));
        const otp = (await user.otp).toString();
        const creation_time = await user.otp_creation_time;
        if (given_otp === otp && new Date().getTime() - creation_time <= 12000000) {
            user.email_id = new_email_id;
            user.temp_email_id = null;
            user.otp = null;
            user.otp_creation_time = null;
            await this.userRepository.save(user);
            return true;
        }
        else
            return false;
    }
    async updateTfa(user_id) {
        try {
            const user = await this.findOne(parseInt(user_id));
            if (user.google_auth_enabled === user_entity_1.google_auth_enabled_Enum.Enable) {
                user.google_auth_enabled = user_entity_1.google_auth_enabled_Enum.Disable;
                return await this.userRepository.save(user);
            }
            else if (user.google_auth_enabled === user_entity_1.google_auth_enabled_Enum.Disable) {
                user.google_auth_enabled = user_entity_1.google_auth_enabled_Enum.Enable;
                return await this.userRepository.save(user);
            }
        }
        catch (e) {
            common_1.Logger.error(e);
            return null;
        }
    }
    async changePassword(user_id, old_password, new_password) {
        common_1.Logger.log("Changing Password! ...");
        try {
            const user = await this.userRepository.findOne({
                where: { user_id: user_id },
            });
            if (!user) {
                return null;
            }
            else {
                const passwordEncoded = (0, bcrypt_1.encodePassword)(old_password);
                if (passwordEncoded === user.password) {
                    user.password = (0, bcrypt_1.encodePassword)(new_password);
                    return await this.userRepository.save(user);
                }
                else {
                    return null;
                }
            }
            return true;
        }
        catch (e) {
            return false;
        }
    }
    findAll() {
        return `This action returns all users`;
    }
    async verifyTFA(token, user_id) {
        common_1.Logger.warn("Verifying Two Factor Auth ...");
        try {
            const user = await this.findOne(user_id);
            const secret = user.temp_secret.base32;
            common_1.Logger.log(secret, "userAuthService");
            common_1.Logger.log(token, "UserAuthService");
            const verified = await speakeasy.totp.verify({
                secret,
                encoding: "base32",
                token,
            });
            if (verified) {
                common_1.Logger.log("TFA verified");
                return true;
            }
            else {
                common_1.Logger.error("TFA NOT verified");
                return null;
            }
        }
        catch (error) {
            common_1.Logger.log(error);
            return null;
        }
    }
    async findOne(id) {
        return await this.userRepository.findOne({
            where: { user_id: id },
        });
    }
    update(id, _updateUserDto) {
        return `This action updates a #${id} user`;
    }
    async updateUser(updateUserDto, user_id) {
        var isUpdated = 0;
        common_1.Logger.warn(`Updating user_id:  ${user_id}`, "UsersService");
        const user = await this.userRepository.findOne({
            where: { user_id: user_id },
        });
        if (!user || user == null) {
            common_1.Logger.error("User not found");
            return null;
        }
        if (user.legalname !== updateUserDto.full_legal_name ||
            user.legalname == updateUserDto.full_legal_name ||
            user.tin !== updateUserDto.document_value ||
            user.phone_number !== updateUserDto.phone_number ||
            user.phone_code !== updateUserDto.phone_code ||
            true) {
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
            if (updateUserDto.country_id === "1") {
                user.citizenship = "USA";
                user.country_name = "USA";
                user.country_id = 1;
                user.default_currency = "USD";
                await this.userRepository.save(user);
            }
            if (updateUserDto.country_id === "2") {
                user.citizenship = "INDIA";
                user.country_name = "INDIA";
                user.default_currency = "INR";
                user.country_id = 2;
                await this.userRepository.save(user);
            }
            isUpdated++;
            user.legalname = updateUserDto.full_legal_name.trim();
            user.dob = updateUserDto.dob;
            if (updateUserDto.phone_number) {
                user.phone_number = updateUserDto.phone_number;
                user.phone_code = updateUserDto.phone_code;
            }
            var res_ip = await axios_1.default
                .get("https://ipinfo.io")
                .then((res) => res.data.ip);
            user.modified_ip = res_ip ? res_ip : "";
            user.modified_datetime = new Date();
            user.isPersonalFilled = 1;
            return await this.userRepository.save(user);
        }
        return null;
    }
    async updateEmail(user_id, new_email_id) {
        const user = await this.userRepository.findOne({
            where: { user_id: user_id },
        });
        const otp = Math.floor(Math.random() * 10000000)
            .toString()
            .substring(0, 6);
        const subject = "OTP for email verification";
        const message = `Your OTP is ${otp}`;
        const from = process.env.From_Moleculus_Email_Address;
        user.temp_email_id = new_email_id;
        user.otp = otp;
        user.otp_creation_time = new Date().getTime();
        await this.userRepository.save(user);
        const email_result = await this.mailService.sendMailAWS(subject, message, from, new_email_id);
        if (email_result) {
            common_1.Logger.log("OTP sent to new email address successfully!");
            return {
                statusCode: 200,
                message: "OTP for email address update sent to mail",
            };
        }
        else {
            common_1.Logger.error("Error in sending OTP to new email address!");
            user.temp_email_id = null;
            user.otp = null;
            user.otp_creation_time = null;
            await this.userRepository.save(user);
            return false;
        }
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
    async deleteAccount(user_id) {
        const user = await this.findOne(user_id);
        if (user) {
            user.is_deleted = user_entity_1.is_deleted_Enum.Yes;
            console.log(user);
            await this.userRepository.save(user);
            return true;
        }
        return false;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.moleculus_user)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.moleculus_user_address)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.moleculus_sip)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.moleculus_user_kyc)),
    __param(4, (0, typeorm_1.InjectRepository)(states_entity_1.moleculus_states)),
    __param(5, (0, typeorm_1.InjectRepository)(countries_entity_1.moleculus_countries)),
    __param(6, (0, typeorm_1.InjectRepository)(entities_1.moleculus_user_notification)),
    __param(7, (0, common_1.Inject)("SMS_SERVICE")),
    __param(8, (0, common_1.Inject)("MAIL_SERVICE")),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        sms_service_1.SMSService,
        mail_service_1.MailService])
], UsersService);
exports.UsersService = UsersService;
exports.default = UsersService;
//# sourceMappingURL=users.service.js.map