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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("@nestjs/typeorm");
const axios_1 = require("axios");
const FillSignupForm_dto_1 = require("../../dto/FillSignupForm.dto");
const UpdateAddress_dto_1 = require("../../dto/UpdateAddress.dto");
const UpdatePhoneNumber_dto_1 = require("../../dto/UpdatePhoneNumber.dto");
const UpdateProfile_dto_1 = require("../../dto/UpdateProfile.dto");
const typeorm_2 = require("typeorm");
const user_notifications_service_1 = require("../../../modules/controllers/user-noti-controller/user-notifications.service");
const Create_user_dto_1 = require("../../dto/Create-user.dto");
const Update_user_dto_1 = require("../../dto/Update-user.dto");
const PaytmCheckSum_1 = require("../../../utils/PaytmCheckSum.ts/PaytmCheckSum");
const mail_service_1 = require("../../../utils/mail/mail.service");
const entities_1 = require("../../entities");
const siptransactions_entity_1 = require("../../entities/siptransactions.entity");
const user_entity_1 = require("../../entities/user.entity");
const userKYC_entity_1 = require("../../entities/userKYC.entity");
const users_service_1 = require("./users.service");
const speakeasy = require("speakeasy");
require("dotenv").config({ debug: false });
let UsersController = class UsersController {
    constructor(indexTokenRepository, userRepository, sipTransactionsRepository, kycRepository, emailRepository, usersService, mailService, userNotificationsService) {
        this.indexTokenRepository = indexTokenRepository;
        this.userRepository = userRepository;
        this.sipTransactionsRepository = sipTransactionsRepository;
        this.kycRepository = kycRepository;
        this.emailRepository = emailRepository;
        this.usersService = usersService;
        this.mailService = mailService;
        this.userNotificationsService = userNotificationsService;
    }
    async test2(res, body) {
        var stripeSecretKey = "sk_test_51LLfv8LMjeInNMeHeRkmwv2hdCr6r2z6YoJl3pOZBWvg7vlxBbQHjbKbNf8ZxLKFsvKMdsbOCsxnyyXb4Zk8gq5O00QG8yG6N3";
        const Stripe = require("stripe");
        const stripe = Stripe(stripeSecretKey);
        var { mentioned_currency, mentioned_amount } = body;
        mentioned_currency = mentioned_currency.toLowerCase();
        try {
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        name: "Test",
                        description: "Test",
                        amount: mentioned_amount * 100,
                        currency: mentioned_currency,
                        quantity: 1,
                    },
                ],
                mode: "payment",
                success_url: "http://localhost:3006/dashboard",
                cancel_url: "http://localhost:3006/",
            });
            console.log(session);
            return res.status(200).json({
                sessionId: session.id,
                url: session.url,
            });
        }
        catch (e) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured",
                data: e,
            });
        }
    }
    async confirmpayment(res) {
        const stripeSecretKey = "sk_test_51K5Es9SEil7NXEZmQ8bmsL26XMaZwmdOcHwf6wkSrP77sTYYzThAYOK9G0XqqLRHC6LR4pL57vZFDPML6peIAkZS003v85mNE4";
        const Stripe = require("stripe");
        const stripe = Stripe(stripeSecretKey);
        const paymentIntent = await stripe.paymentIntents.confirm("pi_3LPPJMSEil7NXEZm1FpCgjww", { payment_method: "pm_card_visa" });
        return res.status(200).json({
            code: "200",
            status: "success",
            message: "Payment Successful",
            data: paymentIntent,
        });
    }
    async paytmSignatureGeneration(res, req_body) {
        var body_ = req_body.body;
        var signature_ = await PaytmCheckSum_1.PaytmChecksum.generateSignature(JSON.stringify(body_), "GPmd3eUbWb6QUJ22");
        return res.status(200).json({
            code: "200",
            status: "success",
            message: "Paytm Signature Generated",
            data: signature_,
        });
    }
    async testUserQuery(res) {
        var time_st = `${new Date().getTime()}`;
        const paytm_host = "https://securegw-stage.paytm.in/";
        var time_st = `${new Date().getTime()}`;
        const paytm_url = `${paytm_host}/subscription/create?mid=WQYSrm75379129120709&orderId=PYTM_ORDR_${time_st}`;
        const merchant_key = "GPmd3eUbWb6QUJ22";
        const paytm_body = {
            requestType: "NATIVE_SUBSCRIPTION",
            mid: "WQYSrm75379129120709",
            websiteName: "WEBSTAGING",
            orderId: `PYTM_ORDR_${time_st}`,
            subscriptionAmountType: "FIX",
            subscriptionEnableRetry: "1",
            subscriptionFrequency: "1",
            subscriptionFrequencyUnit: "DAY",
            subscriptionExpiryDate: "2023-12-31",
            txnAmount: {
                value: "1.00",
                currency: "INR",
            },
            userInfo: {
                custId: "CUST_001",
                email: "rishabh210798@gmail.com",
            },
        };
        var signature_ = await PaytmCheckSum_1.PaytmChecksum.generateSignature(JSON.stringify(paytm_body), merchant_key);
        console.log(await signature_);
        const paytm_head = { signature: signature_ };
        const headers = {
            "Content-Type": "application/json",
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
        };
        const res_paytm = await (0, axios_1.default)({
            method: "post",
            url: paytm_url,
            headers: headers,
            data: {
                body: paytm_body,
                head: paytm_head,
            },
        });
        return res.status(200).json({
            code: "200",
            status: "success",
            message: "Create Subscription - Paytm Response ",
            data: res_paytm.data,
        });
    }
    async getSIPByTokenCode(res, body) {
        const { token_code, user_id } = body;
        const required_sip = await this.sipTransactionsRepository.find({
            where: { token_code: token_code, tra_user_id: user_id },
        });
        if (!required_sip || required_sip == undefined || required_sip == null) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, No SIP found for given index token! ",
                data: [],
            });
        }
        else {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "SIP fetched for the user successfully",
                data: required_sip,
            });
        }
    }
    async getKycDetails(req, res) {
        const user_id = parseInt(req.body.user_id);
        const user_ = await this.usersService.findOne(user_id);
        if (!user_) {
            return res.status(400).json({
                conde: "400",
                status: "error",
                message: "User not found",
                data: null,
            });
        }
        const kyc = await this.kycRepository.findOne({
            where: {
                kyc_user_id: user_.user_id,
            },
            order: { kyc_id: "DESC" },
        });
        if (kyc === null || kyc === undefined) {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "KYC not done",
                data: [],
            });
        }
        if (kyc.kyc_status === userKYC_entity_1.kyc_status_enum.Pending) {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "KYC Pending",
                data: {
                    isKYCDone: false,
                    isKYCPending: true,
                },
            });
        }
        else {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "KYC done for the user",
                data: { isKYCDone: true, KYCDetails: kyc },
            });
        }
    }
    async getUserDetails(req, res) {
        const user_id = parseInt(req.body.user_id);
        const user_ = await this.usersService.findOne(user_id);
        if (!user_) {
            return res.status(400).json({
                conde: "400",
                status: "error",
                message: "User not found",
                data: null,
            });
        }
        user_.password = undefined;
        if (user_.temp_secret) {
            user_.temp_secret.hex =
                user_.temp_secret.ascii =
                    user_.temp_secret.base32 =
                        undefined;
        }
        user_.auth_o_response = user_.auth_o_response_decrypted;
        user_.auth_o_response_decrypted = undefined;
        var verified_on = "";
        const kyc_details = await this.kycRepository.findOne({
            where: { kyc_user_id: user_.user_id },
            order: { kyc_id: "DESC" },
        });
        if (kyc_details && kyc_details.kyc_status === userKYC_entity_1.kyc_status_enum.Completed) {
            verified_on = `87`;
        }
        res.status(200).json({
            code: "200",
            status: "success",
            message: "User fetched successfully",
            data: Object.assign(Object.assign({}, user_), { verified_on: verified_on ? verified_on : null }),
        });
    }
    async getIndexTokens(res) {
        const indexTokens = await this.indexTokenRepository.find({
            order: { token_code: "ASC" },
        });
        if (!indexTokens || indexTokens == null || indexTokens === undefined) {
            return res.status(400).json({
                conde: "400",
                status: "error",
                message: "Index tokens not found",
                data: [],
            });
        }
        else {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Index tokens fetched successfully",
                data: indexTokens,
            });
        }
    }
    async getIndexTokensuser(res) {
        const indexTokens = await this.indexTokenRepository.find({
            order: { token_code: "ASC" },
        });
        if (!indexTokens || indexTokens == null || indexTokens === undefined) {
            return res.status(400).json({
                conde: "400",
                status: "error",
                message: "Index tokens not found",
                data: [],
            });
        }
        else {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Index tokens fetched successfully",
                data: indexTokens,
            });
        }
    }
    create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    async registerUser(createUserDto, res) {
        try {
            const user_check_email = await this.usersService.findUserByEmail(createUserDto.email_id);
            const user_check_phone = await this.usersService.findPhoneNumber(createUserDto.phone_number);
            if (user_check_email || user_check_phone) {
                return res.status(400).json({
                    code: "400",
                    status: "Error",
                    message: "Error Occured User with such phone / email already exists",
                    data: [],
                });
            }
            const user_ = await this.usersService.registerUser(createUserDto);
            const temp_secret = await speakeasy.generateSecret();
            if (user_) {
                const adress_confirmation = await this.usersService.createAddress(user_.user_id);
                if (adress_confirmation == null || adress_confirmation == undefined) {
                    common_1.Logger.error("New Address not created, Address for the user exists");
                }
                user_.temp_secret = temp_secret;
                user_.google_auth_code = temp_secret.base32;
                const noti = await this.userNotificationsService.createNotification(user_.user_id);
                if (noti == null || noti == undefined) {
                    common_1.Logger.error(" User Id already exists in the Users Notification table");
                }
                await this.userRepository.save(user_);
                user_.temp_secret.hex = undefined;
                user_.temp_secret.ascii = undefined;
                user_.temp_secret.base32 = undefined;
                user_.password = undefined;
                common_1.Logger.log("User created Succesfully");
                if (adress_confirmation) {
                    common_1.Logger.log("Address created Succesfully");
                }
                if (noti) {
                    common_1.Logger.log("User Notifications Created Succesfully");
                }
                return res.status(201).json({
                    code: "200",
                    status: "success",
                    message: "User has been created successfully",
                    data: null,
                });
            }
            else {
                common_1.Logger.log("User not created!");
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Error Occured",
                    data: null,
                });
            }
        }
        catch (e) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured",
                data: e,
            });
        }
    }
    async getStates(res, body) {
        if (body.country === "USA" ||
            body.country === "US" ||
            body.country === "United States" ||
            body.country === "Usa" ||
            body.country === "usa") {
            const countries = await this.usersService.getStatesUSA();
            if (countries) {
                return res.status(200).json({
                    code: "200",
                    status: "success",
                    message: "States fetched successfully",
                    data: countries,
                });
            }
            else if (countries === null || countries === undefined) {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Error Occured while fetching states",
                    data: [],
                });
            }
        }
        else if (body.countrty === "India" ||
            body.country === "INDIA" ||
            body.country === "india") {
            const countries = await this.usersService.getStatesINDIA();
            if (countries) {
                return res.status(200).json({
                    code: "200",
                    status: "success",
                    message: "States fetched successfully",
                    data: countries,
                });
            }
            else if (countries === null || countries === undefined) {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Error Occured",
                    data: [],
                });
            }
        }
        else {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured in fetching states",
                data: [],
            });
        }
    }
    async getCountries(res) {
        const countries = await this.usersService.getCountries();
        if (countries) {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Countries fetched successfully",
                data: countries,
            });
        }
        else if (countries === null || countries === undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured",
                data: [],
            });
        }
    }
    async sendOTP(res, body) {
        const { email_id, phone_number } = body;
        const results = {
            is_sms_sent: false,
            sms_info: null,
            is_email_sent: false,
            email_info: null,
        };
        try {
            const user__ = await this.usersService.findUserByEmail(email_id);
            if (user__) {
                if (phone_number) {
                    user__.otp = "123456";
                    await this.userRepository.save(user__);
                    results.is_sms_sent = true;
                    results.sms_info = "SMS otp sent";
                }
                if (email_id) {
                    user__.otp = "123456";
                    await this.userRepository.save(user__);
                    results.is_email_sent = true;
                    results.email_info = "email otp sent";
                }
                if ((!email_id && !phone_number) ||
                    (email_id === undefined && phone_number === undefined) ||
                    (email_id === null && phone_number === null)) {
                    return res.status(400).json({
                        code: "400",
                        status: "error",
                        message: "Error Occured, neither phone not email Provided! ",
                        data: null,
                    });
                }
                if (results.is_sms_sent || results.is_email_sent) {
                    return res.status(200).json({
                        code: "200",
                        status: "success",
                        message: "OTP Sending details as follows:",
                        data: results,
                    });
                }
                else {
                    return res.status(400).json({
                        code: "400",
                        status: "error",
                        message: "Some Unknown Error Occured",
                        data: null,
                    });
                }
            }
            else {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Unknown Error Occured",
                    data: null,
                });
            }
        }
        catch (e) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Server error , try later ",
                data: e,
            });
        }
    }
    async resendOTP(res, body) {
        let user_;
        const results = {
            is_sms_sent: false,
            sms_info: null,
            is_email_sent: false,
            email_info: null,
        };
        const { email_id, phone_number } = body;
        if ((!email_id && !phone_number) ||
            (email_id == null && phone_number == null) ||
            (email_id == undefined && phone_number == undefined) ||
            (email_id == "" && phone_number == "") ||
            (email_id == null && phone_number == undefined) ||
            (email_id == undefined && phone_number == null) ||
            (email_id == "" && phone_number == undefined)) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, No email and phone number",
                data: null,
            });
        }
        if (email_id) {
            user_ = await this.usersService.findUserByEmail(email_id);
        }
        if (phone_number) {
            user_ = await this.usersService.findPhoneNumber(phone_number);
        }
        if (!user_ || user_ == undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error occured , No such user",
                data: null,
            });
        }
        try {
            if (phone_number) {
                user_.otp = "123456";
                user_.otp_creation_time = null;
                await this.userRepository.save(user_);
                results.is_sms_sent = true;
                results.sms_info = "sms otp sent";
            }
            if (email_id) {
                user_.otp = "123456";
                user_.otp_creation_time = null;
                await this.userRepository.save(user_);
                results.is_email_sent = true;
                results.email_info = "Email otp sent !";
            }
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "OTP Sending details as follows:",
                data: results,
            });
        }
        catch (e) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: " Error occured",
                data: e,
            });
        }
    }
    async softDeleteAccount(res, body) {
        const user_id = parseInt(body.user_id);
        const check_account = await this.usersService.findOne(user_id);
        if (!check_account || check_account == undefined || check_account == null) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured ",
                data: null,
            });
        }
        const result = await this.usersService.deleteAccount(user_id);
        if (result) {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Account has been deleted successfully",
                data: result,
            });
        }
    }
    async updateKYCDetails(res, body) {
        const { user_id, token, vendor_id, isAgain, api_response } = body;
        const user_ = await this.usersService.findOne(user_id);
        if (!user_ || user_ == undefined || user_ == null) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, No such user",
                data: null,
            });
        }
        else {
            const kyc = await this.usersService.updateKYCDetails(user_id, token, vendor_id, parseInt(isAgain), api_response);
            if (!kyc || kyc == undefined || kyc == null) {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Error Occured, No KYC Rcord Found",
                    data: null,
                });
            }
            else {
                console.log("KYC:", kyc);
                return res.status(200).json({
                    code: "200",
                    status: "success",
                    message: "KYC details updated successfully",
                    data: kyc,
                });
            }
        }
    }
    async sendKYCResponse(res, sendKYCResponse) {
        const { user_id, token, kyc_response } = sendKYCResponse;
        const user_ = await this.usersService.findOne(user_id);
        if (!user_ || user_ == undefined || user_ == null) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, No such user",
                data: [],
            });
        }
        else {
            const kyc_result = await this.usersService.sendKYCResponse(user_id, token, kyc_response);
            if (!kyc_result || kyc_result == undefined || kyc_result == null) {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Error Occured in saving the KYC Response",
                    data: null,
                });
            }
            else {
                return res.status(200).json({
                    code: "200",
                    status: "success",
                    message: "KYC details sent successfully",
                    data: kyc_result,
                });
            }
        }
    }
    async getUserKYCDetails(res, body) {
        const { user_id } = body;
        const user_ = await this.usersService.findOne(user_id);
        if (!user_ || user_ == undefined || user_ == null) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured , No such user",
                data: null,
            });
        }
        else {
            const kyc_result = await this.usersService.getUserKYCDetails(user_id);
            if (!kyc_result || kyc_result == undefined || kyc_result == null) {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Database Error Occured in Getting Kyc Details, try later",
                    data: null,
                });
            }
            else {
                return res.status(200).json({
                    code: "200",
                    status: "success",
                    message: "KYC Details: ",
                    data: kyc_result,
                });
            }
        }
    }
    async verifyOTP(res, body) {
        const given_otp = body.otp;
        const email_id = body.email_id;
        const phone_number = body.phone_number;
        let user;
        let type;
        if (email_id) {
            user = await this.usersService.findUserByEmail(email_id);
            type = "email";
        }
        else if (phone_number) {
            user = await this.usersService.findPhoneNumber(phone_number);
            type = "phone";
        }
        else {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, neither email nor phon Number",
                data: null,
            });
        }
        if (!user || user == undefined || user.otp == null) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, No such user exists",
                data: null,
            });
        }
        const result = await this.usersService.verifyOTP(email_id, given_otp);
        if (result) {
            if (type == "phone") {
                user.is_phone_verify = user_entity_1.is_phone_verified_Enum.Yes;
            }
            else if (type == "email") {
                user.is_email_verify = user_entity_1.is_email_verified_Enum.Yes;
            }
            await this.userRepository.save(user);
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "OTP verified Succesfully ",
                data: { user_id: user.user_id, user_email: user.email_id },
            });
        }
        else if (result == false) {
            return res.status(401).json({
                code: "400",
                status: "error",
                message: "Error Occured ",
                data: null,
            });
        }
    }
    async verifyTFA(res, body) {
        const results = {
            isVerified: false,
            statusCode: null,
        };
        const { token, user_id } = body;
        try {
            const user = await this.usersService.findOne(parseInt(user_id));
            const secret = user.temp_secret.base32;
            const verified = speakeasy.totp.verify({
                secret,
                encoding: "base32",
                token,
            });
            if (verified) {
                common_1.Logger.log("TFA verified");
                user.google_auth_code = user.temp_secret.base32;
                await this.userRepository.save(user);
                results.isVerified = true;
                results.statusCode = 200;
                user.temp_secret = null;
                return res.status(200).json({
                    code: "200",
                    status: "success",
                    message: "TFA verified Succesfully ",
                    data: Object.assign({ user_id: user.user_id }, user),
                });
            }
            else {
                common_1.Logger.error("TFA NOT verified");
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "TFA NOT verified",
                    data: [],
                });
            }
        }
        catch (error) {
            common_1.Logger.log(error);
            return res.status(400).json({
                code: "400",
                status: "error",
                message: " Error occured in verifying TFA",
                data: error,
            });
        }
    }
    async verifyEmailChange(res, body) {
        const { new_email_id, otp, user_id } = body;
        const user = await this.usersService.findOne(parseInt(user_id));
        if (!user || user == undefined || user.otp == null) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured ",
                data: null,
            });
        }
        const result = await this.usersService.verifyNewEmailOTP(user_id, otp, new_email_id);
        if (result) {
            common_1.Logger.log("OTP for new Email verified");
            user.email_id = new_email_id;
            user.is_email_verify = user_entity_1.is_email_verified_Enum.Yes;
            await this.userRepository.save(user);
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Email verified successfully!",
                data: { user_id: user.user_id, user_email: user.email_id },
            });
        }
        else {
            user.temp_email_id = null;
            await this.userRepository.save(user);
            return res.status(401).json({
                code: "400",
                status: "error",
                message: "Error Occured ",
                data: null,
            });
        }
    }
    findAll() {
        return this.usersService.findAll();
    }
    async getNotification(res, body) {
        const { user_id } = body;
        const user = await this.usersService.findOne(parseInt(user_id));
        if (!user || user == undefined || user === null) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, No such user exists",
                data: null,
            });
        }
        const notification = await this.userNotificationsService.getNotification(parseInt(user_id));
        return res.status(200).json({
            code: "200",
            status: "success",
            message: "Notification fetched successfully!",
            data: notification,
        });
    }
    findOne(id) {
        return this.usersService.findOne(+id);
    }
    update(id, updateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }
    async updateProfile(res, updateProfileDto) {
        const { user_id } = updateProfileDto;
        if (updateProfileDto.ssn != null &&
            updateProfileDto.ssn != undefined &&
            updateProfileDto.ssn != "") {
            if (updateProfileDto.ssn.length != 9) {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "SSN should be 9 digits",
                    data: null,
                });
            }
        }
        const user = await this.usersService.findOne(parseInt(user_id));
        if (!user || user == undefined || user === null) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured ",
                data: null,
            });
        }
        const result = await this.usersService.updateProfile(parseInt(user_id), updateProfileDto);
        if (result) {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Profile updated successfully!",
                data: result,
            });
        }
        else {
            return res.status(401).json({
                code: "400",
                status: "error",
                message: "Error Occured ",
                data: null,
            });
        }
    }
    async checkDocument(document_type_, document_value, user_id) {
        var document_type = document_type_.toLowerCase();
        var aadhaar_check, pan_check, ssn_check, tin_check = false;
        if (document_type == "aadhaar" || document_type == "aadhar") {
            aadhaar_check = await this.usersService.checkDocument("AADHAR", document_value, user_id);
        }
        if (document_type == "pan") {
            pan_check = await this.usersService.checkDocument("PAN", document_value, user_id);
        }
        if (document_type == "ssn") {
            ssn_check = await this.usersService.checkDocument("SSN", document_value, user_id);
        }
        if (document_type == "tin") {
            tin_check = await this.usersService.checkDocument("TIN", document_value, user_id);
        }
        if (aadhaar_check || pan_check || ssn_check || tin_check) {
            return true;
        }
    }
    async updateUser(updateUserDto, res) {
        const user_id = parseInt(updateUserDto.user_id);
        const user_check = await this.usersService.findOne(user_id);
        if (!user_check) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured , No such user exists",
                data: null,
            });
        }
        const isPhoneTaken = await this.usersService.findPhoneNumber(updateUserDto.phone_number);
        if (isPhoneTaken) {
            if (isPhoneTaken.user_id != user_id) {
                console.log("isPhone_userid : ", isPhoneTaken.user_id);
                console.log("user_id: ", user_id);
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Error Occured , Phone number already taken",
                    data: null,
                });
            }
        }
        var is_document_exist = await this.checkDocument(updateUserDto.document_type, updateUserDto.document_value, user_id);
        if (is_document_exist) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "The Given Document already exists for another User",
                data: null,
            });
        }
        const user_email = user_check.email_id;
        if (updateUserDto.document_type == "PAN" ||
            updateUserDto.document_type == "pan") {
            const is_new_document_valid_pan = await this.usersService.checkPanValidity(updateUserDto.document_value, user_email, updateUserDto.full_legal_name);
            if (is_new_document_valid_pan == null) {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: " UIDAI error, Unable to check authenticity of PAN, Personal Information NOT updated",
                    data: null,
                });
            }
            if (is_new_document_valid_pan == false) {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: " Invalid PAN Entered, Personal Information NOT updated",
                    data: null,
                });
            }
        }
        if (updateUserDto.document_type == "AADHAAR" ||
            updateUserDto.document_type == "AADHAR" ||
            updateUserDto.document_type == "aadhaar" ||
            updateUserDto.document_type == "aadhar") {
            const is_new_document_valid_aadhaar = await this.usersService.checkAadhaarValidity(updateUserDto.document_value, user_email);
            if (is_new_document_valid_aadhaar == null) {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: " UIDAI error, Unable to check authenticity of AADHAAR entered ",
                    data: null,
                });
            }
            if (is_new_document_valid_aadhaar == false) {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Invalid AADHAAR Entered, Personal Information NOT updated",
                    data: null,
                });
            }
        }
        const user_ = await this.usersService.updateUser(updateUserDto, user_id);
        if (user_) {
            user_.password = undefined;
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Personal Information updated successfully! ",
                data: null,
            });
        }
        else if (!user_ || user_ == undefined || user_ === null) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, cannot update user personal info ",
                data: null,
            });
        }
    }
    async verifyUserDocument(res, body) {
        const { user_id, pan } = body;
        var document_value = pan;
        var document_type = "PAN";
        const user = await this.usersService.findOne(parseInt(user_id));
        if (document_value == "" ||
            document_value == null ||
            document_value.length != 10) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "PAN should be 10 digits",
                data: null,
            });
        }
        if (!user || user == undefined || user === null) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, No such user ",
                data: null,
            });
        }
        else {
            var legal_name = user.legalname.toUpperCase();
            var user_email = user.email_id;
            const verif_res = await this.usersService.verifyUserDocumentPAN(legal_name, user_email, document_type, document_value);
            if (!verif_res || verif_res == undefined || verif_res === null) {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Unable to get response from Income tax database",
                    data: null,
                });
            }
            if (verif_res.response_status.code === "333") {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Invalid PAN entered, No Data Found",
                    data: null,
                });
            }
            if (verif_res.verification_code === "400103" ||
                verif_res.verification_code === "410005") {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Given PAN is not valid",
                    data: null,
                });
            }
            if (verif_res.verification_code === "410007" ||
                verif_res.verification_code === "400099") {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "PAN Verification from UIDAI Service Not Available",
                    data: null,
                });
            }
            if (verif_res.verification_code === "000" &&
                verif_res.verification_status === "SUCCESS") {
                var full_name_pan = verif_res.full_name;
                const name_string = verif_res.verified_data;
                const a = name_string.split('name":')[1].split(",")[0];
                var len = a.length;
                console.log("Our DATABASE:", legal_name);
                const name_verfied = a.substring(1, len - 1);
                console.log("PAN DATABASE:", name_verfied);
                if (name_verfied == legal_name || legal_name == full_name_pan) {
                    common_1.Logger.log("PAN Verified Successfully");
                    var user_kyc = await this.kycRepository.findOne({
                        where: { kyc_user_id: user_id },
                        order: { kyc_id: "DESC" },
                    });
                    if (!user_kyc || user_kyc == null || user_kyc == undefined) {
                        const new_kyc = await this.kycRepository.create({
                            kyc_user_id: user_id,
                        });
                        const req_data = await axios_1.default
                            .get("https://ipinfo.io")
                            .then((res) => res.data)
                            .catch(() => {
                            req_data: "";
                        });
                        new_kyc.kyc_status = userKYC_entity_1.kyc_status_enum.Completed;
                        new_kyc.api_repsonse = JSON.stringify(verif_res);
                        new_kyc.token = verif_res.txn_id;
                        new_kyc.created_ip = req_data.ip ? req_data.ip : " ";
                        new_kyc.acknowledgement_number = `${Math.random()
                            .toString(36)
                            .substring(12, 20)}`;
                        await this.kycRepository.save(new_kyc);
                    }
                    else {
                        user_kyc.api_repsonse = JSON.stringify(verif_res);
                        user_kyc.token = verif_res.txn_id;
                        user_kyc.acknowledgement_number = `${Math.random()
                            .toString(36)
                            .substring(2, 10)}`;
                        user_kyc.kyc_status = userKYC_entity_1.kyc_status_enum.Completed;
                        user_kyc.created_ip = "";
                        await this.kycRepository.save(user_kyc);
                    }
                    const user_info_update = await this.userRepository.findOne({
                        where: { user_id: user_id },
                    });
                    if (user_info_update) {
                        user_info_update.document_type = user_entity_1.document_Type_Enum.PAN;
                        user_info_update.document_value = document_value;
                        await this.userRepository.save(user_info_update);
                    }
                    var email_subject, email_body;
                    const email_format = await this.emailRepository.findOne({
                        where: { email_keyword: "KYCSUCCESSFUL" },
                    });
                    var user_first_name = user_info_update.first_name;
                    if (email_format) {
                        email_subject = email_format.subject.concat(": PAN");
                        email_body = email_format.description
                            .toString()
                            .replace(/first name/g, `${user_first_name}`)
                            .replace(/\(/g, "")
                            .replace(/\)/g, "")
                            .replace(/\{/g, "")
                            .replace(/\}/g, "")
                            .replace(/url_customer_support/g, "https://www.moleculus.network/");
                    }
                    var e_res = await this.mailService
                        .sendMail(email_subject, email_body, user.email_id)
                        .then((res) => {
                        console.log("Email sent successfully ", res);
                        common_1.Logger.log("Email sent successfully", "verifyuserpan");
                    })
                        .catch((err) => {
                        console.log("Error in sending email", err);
                    });
                    console.log("Email sent successfully ", e_res);
                    return res.status(200).json({
                        code: "200",
                        status: "success",
                        message: "Document Verified Successfully!",
                        data: null,
                    });
                }
                if (name_verfied !== legal_name) {
                    common_1.Logger.log("PAN Verification Failed, Name Mismatch");
                    var user_ = await this.userRepository.findOne({
                        where: { user_id: user_id },
                    });
                    user_.isPersonalFilled = 0;
                    user_.isAddressFilled = 0;
                    user.legalname = null;
                    user.dob = null;
                    user.document_type = user_entity_1.document_Type_Enum.PAN;
                    user.phone_number = null;
                    user_.document_value = null;
                    await this.userRepository.save(user_);
                    var user_kyc = await this.kycRepository.findOne({
                        where: { kyc_user_id: user_id },
                        order: { kyc_id: "DESC" },
                    });
                    if (user_kyc) {
                        user_kyc.kyc_status = userKYC_entity_1.kyc_status_enum.Rejected;
                        await this.kycRepository.save(user_kyc);
                    }
                    user_.isPersonalFilled = 0;
                    user_.isAddressFilled = 0;
                    user.legalname = null;
                    user.dob = null;
                    user.document_type = user_entity_1.document_Type_Enum.PAN;
                    user.phone_number = null;
                    user_.document_value = null;
                    await this.userRepository.save(user_);
                    return res.status(400).json({
                        code: "400",
                        status: "error",
                        message: "Document Verification Failed, The Income Tax Database has different data for the given PAN",
                        data: null,
                    });
                }
            }
        }
        return res.status(400).json({
            code: "400",
            status: "error",
            message: "Unable to get response from Income tax database",
            data: null,
        });
    }
    async getCaptcha(res, body) {
        common_1.Logger.log("Inside getCaptcha", "getCaptcha");
        const { user_id } = body;
        const user = await this.usersService.findOne(parseInt(user_id));
        if (!user || user == undefined || user === null) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, No such user exists",
                data: null,
            });
        }
        else {
            common_1.Logger.log("Inside getCaptcha:userController", "getCaptcha");
            const user_email = user.email_id;
            const captcha_res = await this.usersService.getCaptcha(user_email);
            if (!captcha_res) {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Error Occured, unable to contact to server",
                    data: null,
                });
            }
            if (captcha_res.response_status.code === "000" &&
                captcha_res.response_data.captcha.length > 0) {
                return res.status(200).json({
                    code: "200",
                    status: "success",
                    message: "Captcha fetched successfully!",
                    data: {
                        uuid: captcha_res.response_data.uuid,
                        captcha: captcha_res.response_data.captcha,
                    },
                });
            }
            if (captcha_res.response_status.code === "000" &&
                captcha_res.response_data.captcha.length == 0) {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Captcha fetching Failed! UIDAI Server Error",
                    data: [],
                });
            }
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "UIDAI Server Error   ",
                data: [],
            });
        }
    }
    async enterAadhaar(res, body) {
        const { uuid, aadhaar, captcha, user_id } = body;
        const request_id = `requestId${Math.floor(Math.random() * 10000)}`;
        const user = await this.usersService.findOne(parseInt(user_id));
        if (!user || user == undefined || user === null) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, No such user exists",
                data: null,
            });
        }
        else {
            common_1.Logger.log("Inside enterAadhaar: userController", "enterAadhaar");
            const user_email = user.email_id;
            if (aadhaar.length != 12) {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Aadhaar Number is not valid",
                    data: null,
                });
            }
            if (captcha == "" ||
                captcha == undefined ||
                captcha == null ||
                !captcha) {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Captcha is required",
                    data: null,
                });
            }
            if (uuid == "" || uuid == undefined || uuid == null || !uuid) {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "UUID is required",
                    data: null,
                });
            }
            const aadhaar_res = await this.usersService.enterAadhaar(uuid, aadhaar, captcha, request_id, user_email);
            if (!aadhaar_res ||
                aadhaar_res == undefined ||
                aadhaar_res === null ||
                aadhaar_res.response_status == null) {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Error Occured, unable to contact to server",
                    data: null,
                });
            }
            if (aadhaar_res.response_status.code === "000") {
                return res.status(200).json({
                    code: "200",
                    status: "success",
                    message: "OTP sent to your Registered Mobile number!",
                    data: [],
                });
            }
            if (aadhaar_res.response_status.code === "470049") {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "UUID is required",
                    data: null,
                });
            }
            if (aadhaar_res.response_status.code === "470043" ||
                aadhaar_res.response_status.code === "470051") {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Captcha is invalid",
                    data: null,
                });
            }
            if (aadhaar_res.response_status.code === "470081") {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "UUID Invalid or Session Does not exist",
                    data: null,
                });
            }
            if (aadhaar_res.response_status.code === "470043") {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Aadhaar is invalid",
                    data: null,
                });
            }
            if (aadhaar_res.response_status.code === "333") {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "UIDAI Error, try later",
                    data: null,
                });
            }
            if (aadhaar_res.response_status.code === "470171" ||
                aadhaar_res.response_status.code === "470172" ||
                aadhaar_res.response_status.code === "470046") {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Cannot be processed from UIDAI server, Please try after Sometime",
                    data: null,
                });
            }
            if (aadhaar_res.response_status.code === "470046" ||
                aadhaar_res.response_status.code === "470047" ||
                aadhaar_res.response_status.code === "470167" ||
                aadhaar_res.response_status.code === "470168") {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Aadhaar Number is not valid",
                    data: null,
                });
            }
            if (aadhaar_res.response_status.code === "470048") {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Session Expired, try again",
                    data: null,
                });
            }
            if (aadhaar_res.response_status.code === "470165") {
                return res.status(403).json({
                    code: "403",
                    status: "error",
                    message: "Incorrect Captcha",
                    data: [],
                });
            }
            if (aadhaar_res.response_status.code === "000" &&
                aadhaar_res.response_data.message == null) {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "OTP sending Failed! UIDAI Server Error",
                    data: [],
                });
            }
            if (aadhaar_res.response_status.code !== "000") {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Some Unknown Error Occured in sending OTP, Please restart the process ",
                    data: [],
                });
            }
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Some Error Occured From UIDAI server, try again",
                data: [],
            });
        }
    }
    async enterOtp(res, body) {
        var { uuid, otp, request_id, user_id } = body;
        request_id = `requestId${new Date().getTime().toString().substring(8, 13)}`;
        const user = await this.usersService.findOne(parseInt(user_id));
        if (otp.length != 6 || otp == undefined || otp == null) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "OTP is not valid",
                data: null,
            });
        }
        if (!user || user == undefined || user === null) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, No such user exists",
                data: null,
            });
        }
        else {
            common_1.Logger.log("Inside enterOtp: userController", "enterOtp");
            const user_email = user.email_id;
            const otp_res = await this.usersService.enterOtp(uuid, otp, request_id, user_email);
            if (!otp_res || otp_res == undefined || otp_res === null) {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Error Occured, unable to contact to server",
                    data: null,
                });
            }
            if (otp_res.response_status.code === "470170" ||
                otp_res.response_status.code === "470168") {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "No mobile number is linked with this Aadhaar Number",
                    data: null,
                });
            }
            if (otp_res.response_status.code === "470066" ||
                otp_res.response_status.code === "470052") {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Server Error occured during API call to UIDAI, try again",
                    data: null,
                });
            }
            if (otp_res.response_status.code === "470084") {
                return res.status(403).json({
                    code: "403",
                    status: "error",
                    message: "OTP Invalid, try again",
                    data: null,
                });
            }
            if (otp_res.response_status.code === "470048" ||
                otp_res.response_status.code === "470169") {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "The Session has expired, try again",
                    data: null,
                });
            }
            if (otp_res.response_status.code === "470021" ||
                otp_res.response_status.code === "470022" ||
                otp_res.response_status.code === "470023" ||
                otp_res.response_status.code === "470024") {
                return res.status(403).json({
                    code: "403",
                    status: "error",
                    message: `OTP Invalid  ${otp_res.response_status.message}`,
                    data: [],
                });
            }
            if (otp_res.response_status.code === "000") {
                return res.status(200).json({
                    code: "200",
                    status: "success",
                    message: "KYC Details fetched successfully",
                    data: null,
                });
            }
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Some Server Error from UIDAI ",
                data: null,
            });
        }
    }
    async fetchKyc(res, body) {
        const { user_id, uuid, aadhaar } = body;
        const user = await this.usersService.findOne(parseInt(user_id));
        if (!uuid || uuid == undefined || uuid == null || uuid.length < 20) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "UUID is not valid",
                data: null,
            });
        }
        if (!user || user == undefined || user === null) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, No such user exists",
                data: null,
            });
        }
        else {
            common_1.Logger.log("Inside fetchKyc: userController", "fetchKyc");
            const user_email = user.email_id;
            const kyc_res = await this.usersService.fetchKyc(uuid, user_email);
            if (!kyc_res || kyc_res == undefined || kyc_res === null) {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Error Occured, unable to contact to server",
                    data: null,
                });
            }
            if (kyc_res.response_status.code === "470028" ||
                kyc_res.response_status.code === "470042") {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Server Error occured during API call to UIDAI, try again",
                    data: null,
                });
            }
            if (kyc_res.response_status.code === "470156" ||
                kyc_res.response_status.code === "470030") {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Invalid UUID ",
                    data: null,
                });
            }
            if (kyc_res.response_status.code === "470032") {
                return res.status(403).json({
                    code: "403",
                    status: "error",
                    message: "OKYC Data does not exist",
                    data: null,
                });
            }
            if (kyc_res.response_status.code == "000" &&
                kyc_res.response_data !== null) {
                const given_legalname = user.legalname.toUpperCase();
                const name = kyc_res.response_data.name.toString().toUpperCase();
                var dob1 = kyc_res.response_data.dob
                    .replace(/\D/g, "")
                    .toString()
                    .trim();
                var dob2 = user.dob.replace(/\D/g, "").toString().trim();
                if (name == given_legalname && dob1 != dob2) {
                    user.document_value = null;
                    user.isPersonalFilled = 0;
                    user.isAddressFilled = 0;
                    user.document_type = user_entity_1.document_Type_Enum.PAN;
                    user.legalname = null;
                    user.dob = null;
                    user.phone_number = null;
                    await this.userRepository.save(user);
                    const user_kyc = await this.kycRepository.findOne({
                        where: { kyc_user_id: user_id },
                        order: { kyc_id: "DESC" },
                    });
                    if (user_kyc) {
                        user_kyc.kyc_status = userKYC_entity_1.kyc_status_enum.Rejected;
                        await this.kycRepository.save(user_kyc);
                    }
                    common_1.Logger.log("Inside fetchKyc: DATABASE DOB & AADHAAR DOB NOT MATCHED ", "fetchKyc");
                    return res.status(400).json({
                        code: "400",
                        status: "error",
                        message: "Inavlid Date Of Birth OR Name Or Aadhaar Number ",
                        data: null,
                    });
                }
                if (name !== given_legalname && dob1 != dob2) {
                    user.document_value = null;
                    user.document_type = user_entity_1.document_Type_Enum.PAN;
                    user.legalname = null;
                    user.dob = null;
                    user.isAddressFilled = 0;
                    user.isPersonalFilled = 0;
                    user.phone_number = null;
                    await this.userRepository.save(user);
                    const user_kyc = await this.kycRepository.findOne({
                        where: { kyc_user_id: user_id },
                        order: { kyc_id: "DESC" },
                    });
                    if (user_kyc) {
                        user_kyc.kyc_status = userKYC_entity_1.kyc_status_enum.Rejected;
                        await this.kycRepository.save(user_kyc);
                    }
                    common_1.Logger.log("Inside fetchKyc: DATABASE And AADHAAR NAME NOT MATCHED ", "fetchKyc");
                    return res.status(400).json({
                        code: "400",
                        status: "error",
                        message: "Inavlid Date Of Birth Or Name Or Aadhaar Number",
                        data: [],
                    });
                }
                if (name === given_legalname && dob1 === dob2) {
                    common_1.Logger.log("Inside fetchKyc: DATABASE And AADHAAR NAME & DOB MATCHED ", "fetchKyc");
                    const user_kyc = await this.kycRepository.findOne({
                        where: { kyc_user_id: user_id },
                        order: { kyc_id: "DESC" },
                    });
                    if (!user_kyc || user_kyc == undefined || user_kyc === null) {
                        var new_user_kyc = await this.kycRepository.create({
                            kyc_user_id: user_id,
                        });
                        new_user_kyc.kyc_status = userKYC_entity_1.kyc_status_enum.Completed;
                        new_user_kyc.acknowledgement_number =
                            kyc_res.response_data.reference_id;
                        new_user_kyc.api_repsonse = JSON.stringify(kyc_res);
                        new_user_kyc.vendor_id = `${user_id}`;
                        new_user_kyc.token =
                            uuid != null
                                ? uuid
                                : `${Math.random()
                                    .toString(36)
                                    .substring(2, 10)}-${Math.random()
                                    .toString(36)
                                    .substring(2, 10)}`;
                        await this.kycRepository.save(new_user_kyc);
                    }
                    else {
                        user_kyc.kyc_status = userKYC_entity_1.kyc_status_enum.Completed;
                        user_kyc.acknowledgement_number =
                            kyc_res.response_data.reference_id;
                        user_kyc.api_repsonse = JSON.stringify(kyc_res);
                        await this.kycRepository.save(user_kyc);
                    }
                    const user_info_update = await this.userRepository.findOne({
                        where: { user_id: user_id },
                    });
                    if (user_info_update) {
                        user_info_update.document_type = user_entity_1.document_Type_Enum.AADHAR;
                        user_info_update.document_value = aadhaar;
                        await this.userRepository.save(user_info_update);
                    }
                    var email_subject, email_body;
                    const email_format = await this.emailRepository.findOne({
                        where: { email_keyword: "KYCSUCCESSFUL" },
                    });
                    if (email_format) {
                        email_subject = email_format.subject.concat(": AADHAAR : Dep_App_Version");
                        email_body = email_format.description
                            .toString()
                            .replace(/first name/g, `${user_info_update.first_name}`)
                            .replace(/\(/g, "")
                            .replace(/\)/g, "")
                            .replace(/\{/g, "")
                            .replace(/\}/g, "")
                            .replace(/url_customer_support/g, "https://www.moleculus.network/");
                    }
                    return res.status(200).json({
                        code: "200",
                        status: "success",
                        message: "KYC Details matched, user verified",
                        data: [],
                    });
                }
                else {
                    user.document_value = null;
                    user.document_type = user_entity_1.document_Type_Enum.PAN;
                    user.legalname = null;
                    user.dob = null;
                    user.isAddressFilled = 0;
                    user.isPersonalFilled = 0;
                    user.phone_number = null;
                    await this.userRepository.save(user);
                    const user_kyc = await this.kycRepository.findOne({
                        where: { kyc_user_id: user_id },
                        order: { kyc_id: "DESC" },
                    });
                    if (user_kyc) {
                        user_kyc.kyc_status = userKYC_entity_1.kyc_status_enum.Rejected;
                        await this.kycRepository.save(user_kyc);
                    }
                    common_1.Logger.log("Inside fetchKyc: DATABASE And AADHAAR NAME NOT MATCHED ", "fetchKyc");
                    return res.status(400).json({
                        code: "400",
                        status: "error",
                        message: "Inavlid Date Of Birth Or Name Or Aadhaar Number",
                        data: [],
                    });
                }
            }
            else if (kyc_res.response_status.code !== "000") {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Could Not verify KYC Details, UIDAI Server error, try again later",
                    data: [],
                });
            }
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "UIDAI Server Error, Please try again later",
                data: [],
            });
        }
    }
    async fillSignUpForm(fillSignUpFormDto, res) {
        var isPhoneNumberEntered = false;
        var email_body = "";
        var email_subject = "";
        const user_id = parseInt(fillSignUpFormDto.user_id);
        const phone_number = fillSignUpFormDto.phone_number;
        const user_check = await this.usersService.findOne(user_id);
        const user_email_format = await this.emailRepository.findOne({
            where: { email_keyword: "WELCOMEVERIFIEDACCOUNT" },
        });
        if (user_email_format) {
            email_body = user_email_format.description
                .toString()
                .replace(/first name/g, `${fillSignUpFormDto.first_name}`)
                .replace(/\(/g, "")
                .replace(/\)/g, "")
                .replace(/\{/g, "")
                .replace(/\}/g, "")
                .replace(/url_customer_support/g, "https://www.moleculus.network/");
            email_subject = user_email_format.subject;
        }
        if (!user_check) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, No such User! ",
                data: null,
            });
        }
        const user_email = user_check.email_id;
        if (phone_number !== null &&
            phone_number !== undefined &&
            phone_number !== "") {
            if (phone_number.length < 9) {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Phone number length invalid!",
                    data: [],
                });
            }
            const isPhoneTaken = await this.usersService.findPhoneNumber(phone_number);
            if (isPhoneTaken) {
                if (isPhoneTaken.user_id != user_id) {
                    common_1.Logger.log("Inside fillSignUpForm: PHONE NUMBER ALREADY TAKEN ", "fillSignUpForm");
                    return res.status(400).json({
                        code: "400",
                        status: "error",
                        message: "Error Occured , Phone number already taken",
                        data: null,
                    });
                }
            }
            isPhoneNumberEntered = true;
        }
        const filled_form_user = await this.usersService.fillSignUpForm(fillSignUpFormDto, user_id);
        if (filled_form_user) {
            const mail_response = await this.mailService
                .sendMail(email_subject, email_body, user_email)
                .then((res) => {
                console.log("Signup_mail_sent_successfully: ", res);
                console.log("Email_Body: ", email_body);
                console.log("Email_Subject: ", email_subject);
            })
                .catch((err) => {
                console.log("Error_Sending _mail: ", err);
            });
            console.log("user_email_description_respo: ", mail_response);
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Signup successful ",
                data: {
                    user_id: filled_form_user.user_id,
                    isPhoneNumberEntered: isPhoneNumberEntered,
                },
            });
        }
        else {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, in signup form fill",
                data: null,
            });
        }
    }
    async updatePhoneNumber(updatePhoneNumberDto, res) {
        const { phone_number, user_id } = updatePhoneNumberDto;
        try {
            const result = await this.usersService.updatePhoneNumber(user_id, phone_number);
            if (result) {
                result.password = undefined;
                return res.status(200).json({
                    code: "200",
                    status: "success",
                    message: "Phone number has been updated successfully!",
                    data: null,
                });
            }
            else {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Error Occured !",
                    data: result,
                });
            }
        }
        catch (error) {
            common_1.Logger.error("Error: ", error);
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured !",
                data: error,
            });
        }
    }
    async deleteUserByEmail(body, res) {
        const user = await this.userRepository.findOne({
            where: { email_id: body.email_id },
        });
        if (!user || user == undefined || user === null) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, No such User found! ",
                data: null,
            });
        }
        else {
            const delete_user = await this.usersService.forceDeleteUser(body.email_id);
            if (!delete_user || delete_user == undefined || delete_user === null) {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Error Occured, User not deleted ",
                    data: null,
                });
            }
            else {
                return res.status(200).json({
                    code: "200",
                    status: "success",
                    message: "User deleted successfully!",
                    data: null,
                });
            }
        }
    }
    async updateAddress(updateAddressDto, req, res) {
        const user_id_ = parseInt(req.body.user_id);
        const user_check = await this.usersService.findOne(user_id_);
        if (!user_check) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, No such User! ",
                data: null,
            });
        }
        const user_address = await this.usersService.updateAddress(user_id_, updateAddressDto);
        if (user_address) {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Address Updated Successfully",
                data: user_address,
            });
        }
        else {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, No such user in User Address Table ",
                data: null,
            });
        }
    }
    async updateEmail(body, res) {
        const { new_email_id, existing_email_id, user_id } = body;
        if (new_email_id == existing_email_id) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured ",
                data: null,
            });
        }
        const user = await this.usersService.findOne(parseInt(user_id));
        const user2 = await this.usersService.findUserByEmail(existing_email_id);
        if (user2.user_id !== user.user_id) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured ",
                data: null,
            });
        }
        if (!user) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured ",
                data: null,
            });
        }
        const email_update = await this.usersService.updateEmail(user_id, new_email_id);
        if (email_update) {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Email OTP has been sent successfully, please verfiy now.. ",
                data: null,
            });
        }
        else {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured ",
                data: null,
            });
        }
    }
    async changePassword(body, res) {
        const { user_id, old_password, new_password } = body;
        if (old_password === new_password) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, please Provide different passwords ",
                data: null,
            });
        }
        if (!old_password || !new_password || !user_id) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, please provide  old, new Passwords and email_id ",
                data: null,
            });
        }
        else {
            const result = await this.usersService.changePassword(parseInt(user_id), old_password, new_password);
            if (!result || result === undefined || result === null) {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Error Occured, please provide correct password ",
                    data: null,
                });
            }
            else {
                return res.status(200).json({
                    code: "200",
                    status: "success",
                    message: "Password has been changed successfully ",
                    data: null,
                });
            }
        }
    }
    async resetPassword(res, body) {
        const { newPassword } = body;
        const user_id = parseInt(body.user_id);
        let email_id;
        const user = await this.usersService.findOne(user_id);
        if (user === null || user === undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured ",
                data: null,
            });
        }
        try {
            email_id = user.email_id;
            const user_ = await this.usersService.updatePassword(user_id, newPassword);
            if (user_) {
                user_.password = undefined;
                return res.status(200).json({
                    code: "200",
                    status: "success",
                    message: "User's Password has been updated successfully",
                    data: user_.user_id,
                });
            }
        }
        catch (e) {
            console.log(e);
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured ",
                data: e.message,
            });
        }
    }
    async updateTfa(Body, res) {
        const { user_id, otp } = Body;
        const user = await this.usersService.findOne(parseInt(user_id));
        console.log(user);
        if (!user) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured",
                data: null,
            });
        }
        const result = await this.usersService.verifyTFA(otp, parseInt(user_id));
        if (result === true) {
            const user_ = await this.usersService.updateTfa(user_id);
            if (user_) {
                user_.password = undefined;
                return res.status(200).json({
                    code: "200",
                    status: "success",
                    message: "TFA status has been updated successfully",
                    data: user_,
                });
            }
            else {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Error Occured",
                    data: user_,
                });
            }
        }
        else {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Errror Occured, Invalid OTP",
                data: null,
            });
        }
    }
    async getGraphData(res, body) {
        if (body == null || body.user_id == undefined || body.user_id == "") {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, empty body",
                data: null,
            });
        }
        console.log(body);
        const balanceArrayMonths = [
            "200.34",
            "310.64",
            "370.34",
            "323.34",
            "440.49",
            "576.64",
            "597.64",
            "600.23",
            "598.83",
            "610.30",
            "612.23",
            "640.12",
        ];
        const balanceUsdCoin = "85.67896509";
        return res.status(200).json({
            code: "200",
            status: "success",
            message: "Graph Data has been fetched successfully",
            data: Object.assign(Object.assign({}, balanceArrayMonths), { balanceUsdCoin }),
        });
    }
    remove(id) {
        return this.usersService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)("/create-checkout-session"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "test2", null);
__decorate([
    (0, common_1.Post)("/confirmpayment"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "confirmpayment", null);
__decorate([
    (0, common_1.Post)("/paytmsignaturegeneration"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "paytmSignatureGeneration", null);
__decorate([
    (0, common_1.Post)("/testuserquery"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "testUserQuery", null);
__decorate([
    (0, common_1.Post)("/getsipbytokencode"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getSIPByTokenCode", null);
__decorate([
    (0, common_1.Post)("/kyc/status"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getKycDetails", null);
__decorate([
    (0, common_1.Post)("/details"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserDetails", null);
__decorate([
    (0, common_1.Post)("/getallindextokens"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getIndexTokens", null);
__decorate([
    (0, common_1.Get)("/getallindextokensuser"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getIndexTokensuser", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("register"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Post)("/getstates"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getStates", null);
__decorate([
    (0, common_1.Post)("/getcountries"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getCountries", null);
__decorate([
    (0, common_1.Post)("sendotp"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "sendOTP", null);
__decorate([
    (0, common_1.Post)("resendotp"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "resendOTP", null);
__decorate([
    (0, common_1.Post)("delete/account"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "softDeleteAccount", null);
__decorate([
    (0, common_1.Post)("update/userkycdetails"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateKYCDetails", null);
__decorate([
    (0, common_1.Post)("/sendkycresponse"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "sendKYCResponse", null);
__decorate([
    (0, common_1.Post)("userkycdetails"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserKYCDetails", null);
__decorate([
    (0, common_1.Post)("verify/otp"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "verifyOTP", null);
__decorate([
    (0, common_1.Post)("verify/tfa"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "verifyTFA", null);
__decorate([
    (0, common_1.Post)("verify/email/change"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "verifyEmailChange", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)("notifications"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getNotification", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("/updateprofile"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UpdateProfile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Post)("/update/personalinfo"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Post)("/verifyuserpan"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "verifyUserDocument", null);
__decorate([
    (0, common_1.Post)("/getcaptcha"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getCaptcha", null);
__decorate([
    (0, common_1.Post)("/enteraadhaar"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "enterAadhaar", null);
__decorate([
    (0, common_1.Post)("/enterotp"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "enterOtp", null);
__decorate([
    (0, common_1.Post)("/fetchkyc"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "fetchKyc", null);
__decorate([
    (0, common_1.Post)("/fillsignupform"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FillSignupForm_dto_1.FillSignUpFormDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "fillSignUpForm", null);
__decorate([
    (0, common_1.Post)("/update/phonenumber"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdatePhoneNumber_dto_1.UpdatePhoneNumberDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updatePhoneNumber", null);
__decorate([
    (0, common_1.Post)("deleteusermbyemail"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUserByEmail", null);
__decorate([
    (0, common_1.Post)("/update/address"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateAddress_dto_1.UpdateAddressDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateAddress", null);
__decorate([
    (0, common_1.Put)("update/email"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateEmail", null);
__decorate([
    (0, common_1.Put)("change/password"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Put)("reset/password"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)("update/tfastatus"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateTfa", null);
__decorate([
    (0, common_1.Post)("/getgraphdata"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getGraphData", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
UsersController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)("users"),
    (0, common_1.Controller)("users"),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.moleculus_index_tokens)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.moleculus_user)),
    __param(2, (0, typeorm_1.InjectRepository)(siptransactions_entity_1.moleculus_sip_transactions)),
    __param(3, (0, typeorm_1.InjectRepository)(userKYC_entity_1.moleculus_user_kyc)),
    __param(4, (0, typeorm_1.InjectRepository)(entities_1.moleculus_email_template)),
    __param(5, (0, common_1.Inject)("USER_SERVICE")),
    __param(6, (0, common_1.Inject)("MAIL_SERVICE")),
    __param(7, (0, common_1.Inject)("NOTIFICATIONS_SERVICE")),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        users_service_1.UsersService,
        mail_service_1.MailService,
        user_notifications_service_1.UserNotificationsService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map