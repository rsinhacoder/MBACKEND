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
exports.UsersController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var typeorm_1 = require("@nestjs/typeorm");
var axios_1 = require("axios");
var paytmchecksum_1 = require("paytmchecksum");
var entities_1 = require("../../entities");
var siptransactions_entity_1 = require("../../entities/siptransactions.entity");
var user_entity_1 = require("../../entities/user.entity");
var userKYC_entity_1 = require("../../entities/userKYC.entity");
var speakeasy = require("speakeasy");
require("dotenv").config({ debug: false });
var UsersController = /** @class */ (function () {
    function UsersController(indexTokenRepository, userRepository, sipTransactionsRepository, kycRepository, usersService, userNotificationsService // private readonly usersService: UsersService
    ) {
        this.indexTokenRepository = indexTokenRepository;
        this.userRepository = userRepository;
        this.sipTransactionsRepository = sipTransactionsRepository;
        this.kycRepository = kycRepository;
        this.usersService = usersService;
        this.userNotificationsService = userNotificationsService;
    }
    UsersController.prototype.test2 = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var stripeSecretKey, Stripe, stripe, mentioned_currency, mentioned_amount, session, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stripeSecretKey = "sk_test_51LLfv8LMjeInNMeHeRkmwv2hdCr6r2z6YoJl3pOZBWvg7vlxBbQHjbKbNf8ZxLKFsvKMdsbOCsxnyyXb4Zk8gq5O00QG8yG6N3";
                        Stripe = require("stripe");
                        stripe = Stripe(stripeSecretKey);
                        mentioned_currency = body.mentioned_currency, mentioned_amount = body.mentioned_amount;
                        mentioned_currency = mentioned_currency.toLowerCase();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, stripe.checkout.sessions.create({
                                // payment_method_types: ["card"],
                                line_items: [
                                    {
                                        name: "Test",
                                        description: "Test",
                                        amount: mentioned_amount * 100,
                                        currency: mentioned_currency,
                                        quantity: 1
                                    },
                                ],
                                mode: "payment",
                                // automatic_payment_methods: ["card"],
                                success_url: "http://localhost:3006/dashboard",
                                cancel_url: "http://localhost:3006/"
                            })];
                    case 2:
                        session = _a.sent();
                        console.log(session);
                        return [2 /*return*/, res.status(200).json({
                                sessionId: session.id,
                                url: session.url
                            })];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "Error Occured",
                                data: e_1
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.confirmpayment = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var stripeSecretKey, Stripe, stripe, paymentIntent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stripeSecretKey = "sk_test_51K5Es9SEil7NXEZmQ8bmsL26XMaZwmdOcHwf6wkSrP77sTYYzThAYOK9G0XqqLRHC6LR4pL57vZFDPML6peIAkZS003v85mNE4";
                        Stripe = require("stripe");
                        stripe = Stripe(stripeSecretKey);
                        return [4 /*yield*/, stripe.paymentIntents.confirm("pi_3LPPJMSEil7NXEZm1FpCgjww", { payment_method: "pm_card_visa" })];
                    case 1:
                        paymentIntent = _a.sent();
                        // const paymentIntent = await stripe.paymentIntents.capture(
                        //   'pi_3LPPJMSEil7NXEZm1FpCgjww'
                        // );
                        return [2 /*return*/, res.status(200).json({
                                code: "200",
                                status: "success",
                                message: "Payment Successful",
                                data: paymentIntent
                            })];
                }
            });
        });
    };
    UsersController.prototype.testUserQuery = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            var paytm_host, paytm_mid, paytm_url, merchant_key, paytm_body, signature_, paytm_head, headers, res_paytm;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        paytm_host = "https://securegw-stage.paytm.in/";
                        paytm_mid = "WQYSrm75379129120709";
                        paytm_url = "".concat(paytm_host, "/subscription/create?mid=").concat(paytm_mid, "&orderId=PYTM_ORDR_9327954");
                        merchant_key = "GPmd3eUbWb6QUJ22";
                        paytm_body = {
                            requestType: "NATIVE_SUBSCRIPTION",
                            mid: "WQYSrm75379129120709",
                            websiteName: "WEBSTAGING",
                            orderId: "PYTM_ORDR_9327954",
                            subscriptionAmountType: "FIX",
                            subscriptionEnableRetry: "2",
                            subscriptionFrequency: "1",
                            subscriptionFrequencyUnit: "MONTH",
                            subscriptionExpiryDate: "2031-12-31",
                            txnAmount: {
                                value: "1.00",
                                currency: "INR"
                            },
                            userInfo: {
                                custId: "CUST_001"
                            }
                        };
                        signature_ = paytmchecksum_1["default"].generateSignature(paytm_body, merchant_key);
                        paytm_head = { signature: signature_ };
                        headers = {
                            "Content-Type": "application/json",
                            Accept: "*/*",
                            "Accept-Encoding": "gzip, deflate, br",
                            Connection: "keep-alive"
                        };
                        return [4 /*yield*/, (0, axios_1["default"])({
                                method: "post",
                                url: paytm_url,
                                headers: headers,
                                data: {
                                    body: paytm_body,
                                    head: paytm_head
                                }
                            })];
                    case 1:
                        res_paytm = _a.sent();
                        console.log(res_paytm, "/n");
                        console.log(res_paytm.data);
                        return [2 /*return*/, res.status(200).json({
                                code: "200",
                                message: "success",
                                data: ""
                            })];
                }
            });
        });
    };
    UsersController.prototype.getSIPByTokenCode = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var token_code, user_id, required_sip;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token_code = body.token_code, user_id = body.user_id;
                        return [4 /*yield*/, this.sipTransactionsRepository.find({
                                where: { token_code: token_code, tra_user_id: user_id }
                            })];
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
    UsersController.prototype.getKycDetails = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, user_, kyc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = parseInt(req.body.user_id);
                        return [4 /*yield*/, this.usersService.findOne(user_id)];
                    case 1:
                        user_ = _a.sent();
                        if (!user_) {
                            return [2 /*return*/, res.status(400).json({
                                    conde: "400",
                                    status: "error",
                                    message: "User not found",
                                    data: null
                                })];
                        }
                        return [4 /*yield*/, this.kycRepository.findOne({
                                where: {
                                    kyc_user_id: user_.user_id
                                },
                                order: { kyc_id: "DESC" }
                            })];
                    case 2:
                        kyc = _a.sent();
                        if (kyc === null || kyc === undefined) {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "KYC not done",
                                    data: []
                                })];
                        }
                        if (kyc.kyc_status === userKYC_entity_1.kyc_status_enum.Pending) {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "KYC Pending",
                                    data: {
                                        isKYCDone: false,
                                        isKYCPending: true
                                    }
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "KYC done for the user",
                                    data: { isKYCDone: true, KYCDetails: kyc }
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.getUserDetails = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, user_, verified_on, kyc_details;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = parseInt(req.body.user_id);
                        return [4 /*yield*/, this.usersService.findOne(user_id)];
                    case 1:
                        user_ = _a.sent();
                        if (!user_) {
                            return [2 /*return*/, res.status(400).json({
                                    conde: "400",
                                    status: "error",
                                    message: "User not found",
                                    data: null
                                })];
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
                        verified_on = "";
                        return [4 /*yield*/, this.kycRepository.findOne({
                                where: { kyc_user_id: user_.user_id },
                                order: { kyc_id: "DESC" }
                            })];
                    case 2:
                        kyc_details = _a.sent();
                        if (kyc_details && kyc_details.kyc_status === userKYC_entity_1.kyc_status_enum.Completed) {
                            verified_on = "87";
                        }
                        res.status(200).json({
                            code: "200",
                            status: "success",
                            message: "User fetched successfully",
                            data: __assign(__assign({}, user_), { verified_on: verified_on ? verified_on : null })
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    //Get all User's Sip
    // @Get("getusersips/:id")
    // async getUserSipsbyAdmin(@Res() res: Response, @Param("id") id: string) {
    //   const user_id = parseInt(id);
    //   const user = await this.usersService.findOne(user_id);
    //   if (!user || user == null || user == undefined) {
    //     return res.status(400).json({
    //       code: "400",
    //       status: "error",
    //       message: "Error occured , No such user",
    //       data: null,
    //     });
    //   } else {
    //     const user_sips = await this.usersService.getUserSips(user_id);
    //     if (!user_sips || user_sips == null || user_sips == undefined) {
    //       return res.status(400).json({
    //         code: "400",
    //         status: "error",
    //         message: "Error occured , No Sips found",
    //         data: null,
    //       });
    //     } else {
    //       return res.status(200).json({
    //         code: "200",
    //         status: "success",
    //         message: "User SIPs",
    //         data: user_sips,
    //       });
    //     }
    //   }
    // }
    UsersController.prototype.getIndexTokens = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            var indexTokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.indexTokenRepository.find({
                            order: { token_code: "ASC" }
                        })];
                    case 1:
                        indexTokens = _a.sent();
                        if (!indexTokens || indexTokens == null || indexTokens === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    conde: "400",
                                    status: "error",
                                    message: "Index tokens not found",
                                    data: []
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Index tokens fetched successfully",
                                    data: indexTokens
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.create = function (createUserDto) {
        return this.usersService.create(createUserDto);
    };
    UsersController.prototype.registerUser = function (createUserDto, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user_check_email, user_check_phone, user_, temp_secret, adress_confirmation, noti, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, , 11]);
                        return [4 /*yield*/, this.usersService.findUserByEmail(createUserDto.email_id)];
                    case 1:
                        user_check_email = _a.sent();
                        return [4 /*yield*/, this.usersService.findPhoneNumber(createUserDto.phone_number)];
                    case 2:
                        user_check_phone = _a.sent();
                        if (user_check_email || user_check_phone) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "Error",
                                    message: "Error Occured User with such phone / email already exists",
                                    data: []
                                })];
                        }
                        return [4 /*yield*/, this.usersService.registerUser(createUserDto)];
                    case 3:
                        user_ = _a.sent();
                        return [4 /*yield*/, speakeasy.generateSecret()];
                    case 4:
                        temp_secret = _a.sent();
                        if (!user_) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.usersService.createAddress(user_.user_id)];
                    case 5:
                        adress_confirmation = _a.sent();
                        if (adress_confirmation == null || adress_confirmation == undefined) {
                            common_1.Logger.error("New Address not created, Address for the user exists");
                        }
                        user_.temp_secret = temp_secret;
                        user_.google_auth_code = temp_secret.base32;
                        return [4 /*yield*/, this.userNotificationsService.createNotification(user_.user_id)];
                    case 6:
                        noti = _a.sent();
                        if (noti == null || noti == undefined) {
                            common_1.Logger.error(" User Id already exists in the Users Notification table");
                        }
                        return [4 /*yield*/, this.userRepository.save(user_)];
                    case 7:
                        _a.sent();
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
                        return [2 /*return*/, res.status(201).json({
                                code: "200",
                                status: "success",
                                message: "User has been created successfully",
                                data: null
                            })];
                    case 8:
                        common_1.Logger.log("User not created!");
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "Error Occured",
                                data: null
                            })];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        e_2 = _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "Error Occured",
                                data: e_2
                            })];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    // @Post("getcities")
    // async getCities(@Body() body: any, @Res() res: Response) {
    //   Logger.log("Get Cities Requested");
    //   const { country_id, state_abbreviation } = body;
    //   try {
    //     const cities = await this.usersService.getCities(
    //       country_id,
    //       state_abbreviation
    //     );
    //     if (!cities || cities == null || cities == undefined) {
    //       return res.status(200).json({
    //         code: "400",
    //         status: "error",
    //         message: "Cities Not fetched ",
    //         data: [],
    //       });
    //     } else {
    //       return res.status(400).json({
    //         code: "200",
    //         status: "Succes",
    //         message: "Cities fetched successfully",
    //         data: cities,
    //       });
    //     }
    //   } catch (e) {
    //     return res.status(400).json({
    //       code: "400",
    //       status: "error",
    //       message: "Error Occured",
    //       data: [],
    //     });
    //   }
    // }
    UsersController.prototype.getStates = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var countries, countries;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(body.country === "USA" ||
                            body.country === "US" ||
                            body.country === "United States" ||
                            body.country === "Usa" ||
                            body.country === "usa")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.usersService.getStatesUSA()];
                    case 1:
                        countries = _a.sent();
                        if (countries) {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "States fetched successfully",
                                    data: countries
                                })];
                        }
                        else if (countries === null || countries === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured while fetching states",
                                    data: []
                                })];
                        }
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(body.countrty === "India" ||
                            body.country === "INDIA" ||
                            body.country === "india")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.usersService.getStatesINDIA()];
                    case 3:
                        countries = _a.sent();
                        if (countries) {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "States fetched successfully",
                                    data: countries
                                })];
                        }
                        else if (countries === null || countries === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured",
                                    data: []
                                })];
                        }
                        return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, res.status(400).json({
                            code: "400",
                            status: "error",
                            message: "Error Occured in fetching states",
                            data: []
                        })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.getCountries = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            var countries;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.getCountries()];
                    case 1:
                        countries = _a.sent();
                        if (countries) {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Countries fetched successfully",
                                    data: countries
                                })];
                        }
                        else if (countries === null || countries === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured",
                                    data: []
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.sendOTP = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var email_id, phone_number, results, user__, otp, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email_id = body.email_id, phone_number = body.phone_number;
                        results = {
                            is_sms_sent: false,
                            sms_info: null,
                            is_email_sent: false,
                            email_info: null
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 9, , 10]);
                        return [4 /*yield*/, this.usersService.findUserByEmail(email_id)];
                    case 2:
                        user__ = _a.sent();
                        if (!user__) return [3 /*break*/, 7];
                        otp = Math.floor(Math.random() * 10000000)
                            .toString()
                            .substring(0, 6);
                        if (!phone_number) return [3 /*break*/, 4];
                        // const sms_result = await this.usersService.sendOTP(
                        //   phone_code + phone_number,
                        //   otp
                        // );
                        // Logger.log("Sms-Result: ", sms_result);
                        // if (sms_result.statusCode === 200) {
                        //   user__.otp = sms_result.otp;
                        //   user__.otp_creation_time = new Date().getTime();
                        //   await this.userRepository.save(user__);
                        //   results.is_sms_sent = true;
                        //   results.sms_info = sms_result;
                        // } else if (sms_result.statusCode === 400) {
                        //   results.is_sms_sent = false;
                        //   results.sms_info = sms_result;
                        // }
                        user__.otp = "123456";
                        return [4 /*yield*/, this.userRepository.save(user__)];
                    case 3:
                        _a.sent();
                        results.is_sms_sent = true;
                        results.sms_info = "SMS otp sent";
                        _a.label = 4;
                    case 4:
                        if (!email_id) return [3 /*break*/, 6];
                        // const mail_result = await this.mailService.sendMailAWS(
                        // const mail_result = await this.mailService.sendMail(
                        //   subject,
                        //   mail_body,
                        //   email_id
                        // );
                        // if (mail_result) {
                        //   results.is_email_sent = true;
                        //   results.email_info = mail_result;
                        // } else {
                        //   results.is_email_sent = false;
                        //   results.email_info = mail_result;
                        // }
                        user__.otp = "123456";
                        return [4 /*yield*/, this.userRepository.save(user__)];
                    case 5:
                        _a.sent();
                        results.is_email_sent = true;
                        results.email_info = "email otp sent";
                        _a.label = 6;
                    case 6:
                        if ((!email_id && !phone_number) ||
                            (email_id === undefined && phone_number === undefined) ||
                            (email_id === null && phone_number === null)) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured*",
                                    data: null
                                })];
                        }
                        if (results.is_sms_sent || results.is_email_sent) {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "OTP Sending details as follows:",
                                    data: results
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured",
                                    data: null
                                })];
                        }
                        return [3 /*break*/, 8];
                    case 7: return [2 /*return*/, res.status(400).json({
                            code: "400",
                            status: "error",
                            message: "Error Occured",
                            data: null
                        })];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        e_3 = _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "Error occured",
                                data: e_3
                            })];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.resendOTP = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var user_, results, email_id, phone_number, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        results = {
                            is_sms_sent: false,
                            sms_info: null,
                            is_email_sent: false,
                            email_info: null
                        };
                        email_id = body.email_id, phone_number = body.phone_number;
                        if ((!email_id && !phone_number) ||
                            (email_id == null && phone_number == null) ||
                            (email_id == undefined && phone_number == undefined) ||
                            (email_id == "" && phone_number == "") ||
                            (email_id == null && phone_number == undefined) ||
                            (email_id == undefined && phone_number == null) ||
                            (email_id == "" && phone_number == undefined)) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured, No email and phone number",
                                    data: null
                                })];
                        }
                        if (!email_id) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.usersService.findUserByEmail(email_id)];
                    case 1:
                        user_ = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!phone_number) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.usersService.findPhoneNumber(phone_number)];
                    case 3:
                        user_ = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!user_ || user_ == undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error occured , No such user",
                                    data: null
                                })];
                        }
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 10, , 11]);
                        if (!phone_number) return [3 /*break*/, 7];
                        user_.otp = "123456";
                        user_.otp_creation_time = null;
                        return [4 /*yield*/, this.userRepository.save(user_)];
                    case 6:
                        _a.sent();
                        results.is_sms_sent = true;
                        results.sms_info = "sms otp sent";
                        _a.label = 7;
                    case 7:
                        if (!email_id) return [3 /*break*/, 9];
                        user_.otp = "123456";
                        user_.otp_creation_time = null;
                        return [4 /*yield*/, this.userRepository.save(user_)];
                    case 8:
                        _a.sent();
                        results.is_email_sent = true;
                        results.email_info = "Email otp sent !";
                        _a.label = 9;
                    case 9: return [2 /*return*/, res.status(200).json({
                            code: "200",
                            status: "success",
                            message: "OTP Sending details as follows:",
                            data: results
                        })];
                    case 10:
                        e_4 = _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: " Error occured",
                                data: e_4
                            })];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    // @Get("getusersips/:id")
    // async getUserSips(@Res() res: Response, @Param("id") id: string) {
    //   const user_id = parseInt(id);
    //   const user = await this.usersService.findOne(user_id);
    //   if (!user || user == null || user == undefined) {
    //     return res.status(400).json({
    //       code: "400",
    //       status: "error",
    //       message: "Error occured , No such user",
    //       data: null,
    //     });
    //   } else {
    //     const user_sips = await this.usersService.getUserSips(user_id);
    //     if (!user_sips || user_sips == null || user_sips == undefined) {
    //       return res.status(400).json({
    //         code: "400",
    //         status: "error",
    //         message: "Error occured , No Sips found",
    //         data: null,
    //       });
    //     } else {
    //       return res.status(200).json({
    //         code: "200",
    //         status: "success",
    //         message: "User SIPs",
    //         data: user_sips,
    //       });
    //     }
    //   }
    // }
    //Soft deleting the Account:
    UsersController.prototype.softDeleteAccount = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, check_account, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = parseInt(body.user_id);
                        return [4 /*yield*/, this.usersService.findOne(user_id)];
                    case 1:
                        check_account = _a.sent();
                        if (!check_account || check_account == undefined || check_account == null) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured ",
                                    data: null
                                })];
                        }
                        return [4 /*yield*/, this.usersService.deleteAccount(user_id)];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Account has been deleted successfully",
                                    data: result
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.updateKYCDetails = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, token, vendor_id, isAgain, api_response, user_, kyc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = body.user_id, token = body.token, vendor_id = body.vendor_id, isAgain = body.isAgain, api_response = body.api_response;
                        return [4 /*yield*/, this.usersService.findOne(user_id)];
                    case 1:
                        user_ = _a.sent();
                        if (!(!user_ || user_ == undefined || user_ == null)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "Error Occured, No such user",
                                data: null
                            })];
                    case 2: return [4 /*yield*/, this.usersService.updateKYCDetails(user_id, token, vendor_id, parseInt(isAgain), api_response)];
                    case 3:
                        kyc = _a.sent();
                        if (!kyc || kyc == undefined || kyc == null) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured, No KYC Rcord Found",
                                    data: null
                                })];
                        }
                        else {
                            console.log("KYC:", kyc);
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "KYC details updated successfully",
                                    data: kyc
                                })];
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.sendKYCResponse = function (res, sendKYCResponse) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, token, kyc_response, user_, kyc_result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = sendKYCResponse.user_id, token = sendKYCResponse.token, kyc_response = sendKYCResponse.kyc_response;
                        return [4 /*yield*/, this.usersService.findOne(user_id)];
                    case 1:
                        user_ = _a.sent();
                        if (!(!user_ || user_ == undefined || user_ == null)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "Error Occured, No such user",
                                data: []
                            })];
                    case 2: return [4 /*yield*/, this.usersService.sendKYCResponse(user_id, token, kyc_response)];
                    case 3:
                        kyc_result = _a.sent();
                        if (!kyc_result || kyc_result == undefined || kyc_result == null) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured in saving the KYC Response",
                                    data: null
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "KYC details sent successfully",
                                    data: kyc_result
                                })];
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.getUserKYCDetails = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, user_, kyc_result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = body.user_id;
                        return [4 /*yield*/, this.usersService.findOne(user_id)];
                    case 1:
                        user_ = _a.sent();
                        if (!(!user_ || user_ == undefined || user_ == null)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "Error Occured , No such user",
                                data: null
                            })];
                    case 2: return [4 /*yield*/, this.usersService.getUserKYCDetails(user_id)];
                    case 3:
                        kyc_result = _a.sent();
                        if (!kyc_result || kyc_result == undefined || kyc_result == null) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured in Getting Kyc Details",
                                    data: null
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "KYC Details: ",
                                    data: kyc_result
                                })];
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.verifyOTP = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var given_otp, email_id, phone_number, user, type, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        given_otp = body.otp;
                        email_id = body.email_id;
                        phone_number = body.phone_number;
                        if (!email_id) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.usersService.findUserByEmail(email_id)];
                    case 1:
                        user = _a.sent();
                        type = "email";
                        return [3 /*break*/, 5];
                    case 2:
                        if (!phone_number) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.usersService.findPhoneNumber(phone_number)];
                    case 3:
                        user = _a.sent();
                        type = "phone";
                        return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, res.status(400).json({
                            code: "400",
                            status: "error",
                            message: "Error Occured, neither email nor phon Number",
                            data: null
                        })];
                    case 5:
                        if (!user || user == undefined || user.otp == null) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured, No such user exists",
                                    data: null
                                })];
                        }
                        return [4 /*yield*/, this.usersService.verifyOTP(email_id, given_otp)];
                    case 6:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 8];
                        //user.otp = null;
                        //user.otp_creation_time = null;
                        if (type == "phone") {
                            user.is_phone_verify = user_entity_1.is_phone_verified_Enum.Yes;
                        }
                        else if (type == "email") {
                            user.is_email_verify = user_entity_1.is_email_verified_Enum.Yes;
                        }
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                code: "200",
                                status: "success",
                                message: "OTP verified Succesfully ",
                                data: { user_id: user.user_id, user_email: user.email_id }
                            })];
                    case 8:
                        if (result == false) {
                            return [2 /*return*/, res.status(401).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured ",
                                    data: null
                                })];
                        }
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.verifyTFA = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var results, token, user_id, user, secret, verified, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        results = {
                            isVerified: false,
                            statusCode: null
                        };
                        token = body.token, user_id = body.user_id;
                        common_1.Logger.warn("Verifying Two Factor Auth ...");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.usersService.findOne(parseInt(user_id))];
                    case 2:
                        user = _a.sent();
                        secret = user.temp_secret.base32;
                        verified = speakeasy.totp.verify({
                            secret: secret,
                            encoding: "base32",
                            token: token
                        });
                        if (!verified) return [3 /*break*/, 4];
                        common_1.Logger.log("TFA verified");
                        user.google_auth_code = user.temp_secret.base32;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 3:
                        _a.sent();
                        results.isVerified = true;
                        results.statusCode = 200;
                        return [2 /*return*/, res.status(200).json({
                                code: "200",
                                status: "success",
                                message: "TFA verified Succesfully ",
                                data: { user_id: user.user_id }
                            })];
                    case 4:
                        common_1.Logger.error("TFA NOT verified");
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "TFA NOT verified",
                                data: []
                            })];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        common_1.Logger.log(error_1);
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: " Error occured in verifying TFA",
                                data: error_1
                            })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.verifyEmailChange = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var new_email_id, otp, user_id, user, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        new_email_id = body.new_email_id, otp = body.otp, user_id = body.user_id;
                        return [4 /*yield*/, this.usersService.findOne(parseInt(user_id))];
                    case 1:
                        user = _a.sent();
                        if (!user || user == undefined || user.otp == null) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured ",
                                    data: null
                                })];
                        }
                        return [4 /*yield*/, this.usersService.verifyNewEmailOTP(user_id, otp, new_email_id)];
                    case 2:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 4];
                        common_1.Logger.log("OTP for new Email verified");
                        user.email_id = new_email_id;
                        user.is_email_verify = user_entity_1.is_email_verified_Enum.Yes;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                code: "200",
                                status: "success",
                                message: "Email verified successfully!",
                                data: { user_id: user.user_id, user_email: user.email_id }
                            })];
                    case 4:
                        user.temp_email_id = null;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, res.status(401).json({
                                code: "400",
                                status: "error",
                                message: "Error Occured ",
                                data: null
                            })];
                }
            });
        });
    };
    UsersController.prototype.findAll = function () {
        return this.usersService.findAll();
    };
    UsersController.prototype.getNotification = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, user, notification;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = body.user_id;
                        return [4 /*yield*/, this.usersService.findOne(parseInt(user_id))];
                    case 1:
                        user = _a.sent();
                        if (!user || user == undefined || user === null) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured, No such user exists",
                                    data: null
                                })];
                        }
                        return [4 /*yield*/, this.userNotificationsService.getNotification(parseInt(user_id))];
                    case 2:
                        notification = _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                code: "200",
                                status: "success",
                                message: "Notification fetched successfully!",
                                data: notification
                            })];
                }
            });
        });
    };
    UsersController.prototype.findOne = function (id) {
        return this.usersService.findOne(+id);
    };
    UsersController.prototype.update = function (id, updateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    };
    UsersController.prototype.updateProfile = function (res, updateProfileDto) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, user, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = updateProfileDto.user_id;
                        if (updateProfileDto.ssn != null &&
                            updateProfileDto.ssn != undefined &&
                            updateProfileDto.ssn != "") {
                            if (updateProfileDto.ssn.length != 9) {
                                return [2 /*return*/, res.status(400).json({
                                        code: "400",
                                        status: "error",
                                        message: "SSN should be 9 digits",
                                        data: null
                                    })];
                            }
                        }
                        return [4 /*yield*/, this.usersService.findOne(parseInt(user_id))];
                    case 1:
                        user = _a.sent();
                        if (!user || user == undefined || user === null) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured ",
                                    data: null
                                })];
                        }
                        return [4 /*yield*/, this.usersService.updateProfile(parseInt(user_id), updateProfileDto)];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Profile updated successfully!",
                                    data: result
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(401).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured ",
                                    data: null
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.checkDocument = function (document_type_, document_value, user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var document_type, aadhaar_check, pan_check, ssn_check, tin_check;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        document_type = document_type_.toLowerCase();
                        tin_check = false;
                        if (!(document_type == "aadhaar" || document_type == "aadhar")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.usersService.checkDocument("AADHAR", document_value, user_id)];
                    case 1:
                        aadhaar_check = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(document_type == "pan")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.usersService.checkDocument("PAN", document_value, user_id)];
                    case 3:
                        pan_check = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(document_type == "ssn")) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.usersService.checkDocument("SSN", document_value, user_id)];
                    case 5:
                        ssn_check = _a.sent();
                        _a.label = 6;
                    case 6:
                        if (!(document_type == "tin")) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.usersService.checkDocument("TIN", document_value, user_id)];
                    case 7:
                        tin_check = _a.sent();
                        _a.label = 8;
                    case 8:
                        if (aadhaar_check || pan_check || ssn_check || tin_check) {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.updateUser = function (updateUserDto, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, user_check, isPhoneTaken, is_document_exist, user_email, is_new_document_valid_pan, is_new_document_valid_aadhaar, user_;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = parseInt(updateUserDto.user_id);
                        return [4 /*yield*/, this.usersService.findOne(user_id)];
                    case 1:
                        user_check = _a.sent();
                        if (!user_check) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured , No such user exists",
                                    data: null
                                })];
                        }
                        return [4 /*yield*/, this.usersService.findPhoneNumber(updateUserDto.phone_number)];
                    case 2:
                        isPhoneTaken = _a.sent();
                        if (isPhoneTaken) {
                            if (isPhoneTaken.user_id != user_id) {
                                console.log("isPhone_userid : ", isPhoneTaken.user_id);
                                console.log("user_id: ", user_id);
                                return [2 /*return*/, res.status(400).json({
                                        code: "400",
                                        status: "error",
                                        message: "Error Occured , Phone number already taken",
                                        data: null
                                    })];
                            }
                        }
                        return [4 /*yield*/, this.checkDocument(updateUserDto.document_type, updateUserDto.document_value, user_id)];
                    case 3:
                        is_document_exist = _a.sent();
                        if (is_document_exist) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "The Given Document already exists for another User",
                                    data: null
                                })];
                        }
                        user_email = user_check.email_id;
                        if (!(updateUserDto.document_type == "PAN" ||
                            updateUserDto.document_type == "pan")) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.usersService.checkPanValidity(updateUserDto.document_value, user_email, updateUserDto.full_legal_name)];
                    case 4:
                        is_new_document_valid_pan = _a.sent();
                        if (is_new_document_valid_pan == null) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: " UIDAI error, Unable to check authenticity of PAN, Personal Information NOT updated",
                                    data: null
                                })];
                        }
                        if (is_new_document_valid_pan == false) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: " Invalid PAN Entered, Personal Information NOT updated",
                                    data: null
                                })];
                        }
                        _a.label = 5;
                    case 5:
                        if (!(updateUserDto.document_type == "AADHAAR" ||
                            updateUserDto.document_type == "AADHAR" ||
                            updateUserDto.document_type == "aadhaar" ||
                            updateUserDto.document_type == "aadhar")) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.usersService.checkAadhaarValidity(updateUserDto.document_value, user_email)];
                    case 6:
                        is_new_document_valid_aadhaar = _a.sent();
                        if (is_new_document_valid_aadhaar == null) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: " UIDAI error, Unable to check authenticity of AADHAAR entered ",
                                    data: null
                                })];
                        }
                        if (is_new_document_valid_aadhaar == false) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Invalid AADHAAR Entered, Personal Information NOT updated",
                                    data: null
                                })];
                        }
                        _a.label = 7;
                    case 7: return [4 /*yield*/, this.usersService.updateUser(updateUserDto, user_id)];
                    case 8:
                        user_ = _a.sent();
                        if (user_) {
                            user_.password = undefined;
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Personal Information updated successfully! ",
                                    data: null
                                })];
                        }
                        else if (!user_ || user_ == undefined || user_ === null) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured, cannot update user personal info ",
                                    data: null
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.verifyUserDocument = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, pan, document_value, document_type, user, legal_name, user_email, verif_res, full_name_pan, name_string, a, len, name_verfied, user_kyc, new_kyc, req_data, user_info_update, user_, user_kyc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = body.user_id, pan = body.pan;
                        document_value = pan;
                        document_type = "PAN";
                        return [4 /*yield*/, this.usersService.findOne(parseInt(user_id))];
                    case 1:
                        user = _a.sent();
                        if (document_value == "" ||
                            document_value == null ||
                            document_value.length != 10) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "PAN should be 10 digits",
                                    data: null
                                })];
                        }
                        if (!(!user || user == undefined || user === null)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "Error Occured, No such user ",
                                data: null
                            })];
                    case 2:
                        legal_name = user.legalname.toUpperCase();
                        user_email = user.email_id;
                        return [4 /*yield*/, this.usersService.verifyUserDocumentPAN(legal_name, user_email, document_type, document_value)];
                    case 3:
                        verif_res = _a.sent();
                        if (!verif_res || verif_res == undefined || verif_res === null) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Unable to get response from Income tax database",
                                    data: null
                                })];
                        }
                        if (verif_res.response_status.code === "333") {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Invalid PAN entered, No Data Found",
                                    data: null
                                })];
                        }
                        if (verif_res.verification_code === "400103" ||
                            verif_res.verification_code === "410005") {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Given PAN is not valid",
                                    data: null
                                })];
                        }
                        if (verif_res.verification_code === "410007" ||
                            verif_res.verification_code === "400099") {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "PAN Verification from UIDAI Service Not Available",
                                    data: null
                                })];
                        }
                        if (!(verif_res.verification_code === "000" &&
                            verif_res.verification_status === "SUCCESS")) return [3 /*break*/, 21];
                        full_name_pan = verif_res.full_name;
                        name_string = verif_res.verified_data;
                        a = name_string.split('name":')[1].split(",")[0];
                        len = a.length;
                        console.log("Our DATABASE:", legal_name);
                        name_verfied = a.substring(1, len - 1);
                        console.log("PAN DATABASE:", name_verfied);
                        if (!(name_verfied == legal_name || legal_name == full_name_pan)) return [3 /*break*/, 14];
                        common_1.Logger.log("PAN Verified Successfully");
                        return [4 /*yield*/, this.kycRepository.findOne({
                                where: { kyc_user_id: user_id },
                                order: { kyc_id: "DESC" }
                            })];
                    case 4:
                        user_kyc = _a.sent();
                        if (!(!user_kyc || user_kyc == null || user_kyc == undefined)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.kycRepository.create({
                                kyc_user_id: user_id
                            })];
                    case 5:
                        new_kyc = _a.sent();
                        return [4 /*yield*/, axios_1["default"]
                                .get("https://ipinfo.io")
                                .then(function (res) { return res.data; })["catch"](function (err) {
                                req_data: "";
                            })];
                    case 6:
                        req_data = _a.sent();
                        new_kyc.kyc_status = userKYC_entity_1.kyc_status_enum.Completed;
                        new_kyc.api_repsonse = JSON.stringify(verif_res);
                        new_kyc.token = verif_res.txn_id;
                        //new_kyc.created_datetime = new Date();
                        new_kyc.created_ip = req_data.ip ? req_data.ip : " ";
                        new_kyc.acknowledgement_number = "".concat(Math.random()
                            .toString(36)
                            .substring(12, 20));
                        return [4 /*yield*/, this.kycRepository.save(new_kyc)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 8:
                        user_kyc.api_repsonse = JSON.stringify(verif_res);
                        user_kyc.token = verif_res.txn_id;
                        user_kyc.acknowledgement_number = "".concat(Math.random()
                            .toString(36)
                            .substring(2, 10));
                        user_kyc.kyc_status = userKYC_entity_1.kyc_status_enum.Completed;
                        //user_kyc.created_datetime = new Date();
                        user_kyc.created_ip = "";
                        return [4 /*yield*/, this.kycRepository.save(user_kyc)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [4 /*yield*/, this.userRepository.findOne({
                            where: { user_id: user_id }
                        })];
                    case 11:
                        user_info_update = _a.sent();
                        if (!user_info_update) return [3 /*break*/, 13];
                        user_info_update.document_type = user_entity_1.document_Type_Enum.PAN;
                        user_info_update.document_value = document_value;
                        return [4 /*yield*/, this.userRepository.save(user_info_update)];
                    case 12:
                        _a.sent();
                        _a.label = 13;
                    case 13: return [2 /*return*/, res.status(200).json({
                            code: "200",
                            status: "success",
                            message: "Document Verified Successfully!",
                            data: null
                        })];
                    case 14:
                        if (!(name_verfied !== legal_name)) return [3 /*break*/, 21];
                        common_1.Logger.log("PAN Verification Failed, Name Mismatch");
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { user_id: user_id }
                            })];
                    case 15:
                        user_ = _a.sent();
                        user_.isPersonalFilled = 0;
                        user_.isAddressFilled = 0;
                        user.legalname = null;
                        user.dob = null;
                        user.document_type = user_entity_1.document_Type_Enum.PAN;
                        user.phone_number = null;
                        user_.document_value = null;
                        return [4 /*yield*/, this.userRepository.save(user_)];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, this.kycRepository.findOne({
                                where: { kyc_user_id: user_id },
                                order: { kyc_id: "DESC" }
                            })];
                    case 17:
                        user_kyc = _a.sent();
                        if (!user_kyc) return [3 /*break*/, 19];
                        user_kyc.kyc_status = userKYC_entity_1.kyc_status_enum.Rejected;
                        // user_kyc.api_repsonse = `Rejected at ${new Date().toLocaleString()}`;
                        return [4 /*yield*/, this.kycRepository.save(user_kyc)];
                    case 18:
                        // user_kyc.api_repsonse = `Rejected at ${new Date().toLocaleString()}`;
                        _a.sent();
                        _a.label = 19;
                    case 19:
                        user_.isPersonalFilled = 0;
                        user_.isAddressFilled = 0;
                        user.legalname = null;
                        user.dob = null;
                        user.document_type = user_entity_1.document_Type_Enum.PAN;
                        user.phone_number = null;
                        user_.document_value = null;
                        return [4 /*yield*/, this.userRepository.save(user_)];
                    case 20:
                        _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "Document Verification Failed, The Income Tax Database has different data for the given PAN",
                                data: null
                            })];
                    case 21: return [2 /*return*/, res.status(400).json({
                            code: "400",
                            status: "error",
                            message: "Unable to get response from Income tax database",
                            data: null
                        })];
                }
            });
        });
    };
    //getCaptcha for aadhaar verification:
    UsersController.prototype.getCaptcha = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, user, user_email, captcha_res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Inside getCaptcha", "getCaptcha");
                        user_id = body.user_id;
                        return [4 /*yield*/, this.usersService.findOne(parseInt(user_id))];
                    case 1:
                        user = _a.sent();
                        if (!(!user || user == undefined || user === null)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "Error Occured, No such user exists",
                                data: null
                            })];
                    case 2:
                        common_1.Logger.log("Inside getCaptcha:userController", "getCaptcha");
                        user_email = user.email_id;
                        return [4 /*yield*/, this.usersService.getCaptcha(user_email
                            // request_id
                            )];
                    case 3:
                        captcha_res = _a.sent();
                        console.log("captcha_res: ", captcha_res);
                        if (!captcha_res) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured, unable to contact to server",
                                    data: null
                                })];
                        }
                        if (captcha_res.response_status.code === "000" &&
                            captcha_res.response_data.captcha.length > 0) {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Captcha fetched successfully!",
                                    data: {
                                        uuid: captcha_res.response_data.uuid,
                                        captcha: captcha_res.response_data.captcha
                                    }
                                })];
                        }
                        if (captcha_res.response_status.code === "000" &&
                            captcha_res.response_data.captcha.length == 0) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Captcha fetching Failed! UIDAI Server Error",
                                    data: []
                                })];
                        }
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "UIDAI Server Error   ",
                                data: []
                            })];
                }
            });
        });
    };
    //enter aadhaar number:
    UsersController.prototype.enterAadhaar = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var uuid, aadhaar, captcha, user_id, request_id, user, user_email, aadhaar_res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uuid = body.uuid, aadhaar = body.aadhaar, captcha = body.captcha, user_id = body.user_id;
                        request_id = "requestId".concat(Math.floor(Math.random() * 10000));
                        return [4 /*yield*/, this.usersService.findOne(parseInt(user_id))];
                    case 1:
                        user = _a.sent();
                        if (!(!user || user == undefined || user === null)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "Error Occured, No such user exists",
                                data: null
                            })];
                    case 2:
                        common_1.Logger.log("Inside enterAadhaar: userController", "enterAadhaar");
                        user_email = user.email_id;
                        if (aadhaar.length != 12) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Aadhaar Number is not valid",
                                    data: null
                                })];
                        }
                        if (captcha == "" ||
                            captcha == undefined ||
                            captcha == null ||
                            !captcha) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Captcha is required",
                                    data: null
                                })];
                        }
                        if (uuid == "" || uuid == undefined || uuid == null || !uuid) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "UUID is required",
                                    data: null
                                })];
                        }
                        return [4 /*yield*/, this.usersService.enterAadhaar(uuid, aadhaar, captcha, request_id, user_email)];
                    case 3:
                        aadhaar_res = _a.sent();
                        console.log("aadhaar: ", aadhaar_res);
                        if (!aadhaar_res ||
                            aadhaar_res == undefined ||
                            aadhaar_res === null ||
                            aadhaar_res.response_status == null) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured, unable to contact to server",
                                    data: null
                                })];
                        }
                        if (aadhaar_res.response_status.code === "000") {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "OTP sent to your Registered Mobile number!",
                                    data: []
                                })];
                        }
                        if (aadhaar_res.response_status.code === "470049") {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "UUID is required",
                                    data: null
                                })];
                        }
                        if (aadhaar_res.response_status.code === "470043" ||
                            aadhaar_res.response_status.code === "470051") {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Captcha is invalid",
                                    data: null
                                })];
                        }
                        if (aadhaar_res.response_status.code === "470081") {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "UUID Invalid or Session Does not exist",
                                    data: null
                                })];
                        }
                        if (aadhaar_res.response_status.code === "470043") {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Aadhaar is invalid",
                                    data: null
                                })];
                        }
                        if (aadhaar_res.response_status.code === "333") {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "UIDAI Error, try later",
                                    data: null
                                })];
                        }
                        if (aadhaar_res.response_status.code === "470171" ||
                            aadhaar_res.response_status.code === "470172" ||
                            aadhaar_res.response_status.code === "470046") {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Cannot be processed from UIDAI server, Please try after Sometime",
                                    data: null
                                })];
                        }
                        if (aadhaar_res.response_status.code === "470046" ||
                            aadhaar_res.response_status.code === "470047" ||
                            aadhaar_res.response_status.code === "470167" ||
                            aadhaar_res.response_status.code === "470168") {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Aadhaar Number is not valid",
                                    data: null
                                })];
                        }
                        if (aadhaar_res.response_status.code === "470048") {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Session Expired, try again",
                                    data: null
                                })];
                        }
                        if (aadhaar_res.response_status.code === "470165") {
                            return [2 /*return*/, res.status(403).json({
                                    code: "403",
                                    status: "error",
                                    message: "Incorrect Captcha",
                                    data: []
                                })];
                        }
                        if (aadhaar_res.response_status.code === "000" &&
                            aadhaar_res.response_data.message == null) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "OTP sending Failed! UIDAI Server Error",
                                    data: []
                                })];
                        }
                        if (aadhaar_res.response_status.code !== "000") {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Some Unknown Error Occured in sending OTP, PLease restart the process ",
                                    data: []
                                })];
                        }
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "Some Error Occured From UIDAI server, try again",
                                data: []
                            })];
                }
            });
        });
    };
    //enterAadhaar OTP:
    UsersController.prototype.enterOtp = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var uuid, otp, request_id, user_id, user, user_email, otp_res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uuid = body.uuid, otp = body.otp, request_id = body.request_id, user_id = body.user_id;
                        request_id = "requestId".concat(new Date().getTime().toString().substring(8, 13));
                        return [4 /*yield*/, this.usersService.findOne(parseInt(user_id))];
                    case 1:
                        user = _a.sent();
                        if (otp.length != 6 || otp == undefined || otp == null) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "OTP is not valid",
                                    data: null
                                })];
                        }
                        if (!(!user || user == undefined || user === null)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "Error Occured, No such user exists",
                                data: null
                            })];
                    case 2:
                        common_1.Logger.log("Inside enterOtp: userController", "enterOtp");
                        user_email = user.email_id;
                        return [4 /*yield*/, this.usersService.enterOtp(uuid, otp, request_id, user_email)];
                    case 3:
                        otp_res = _a.sent();
                        console.log("otp_res: ", otp_res);
                        if (!otp_res || otp_res == undefined || otp_res === null) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured, unable to contact to server",
                                    data: null
                                })];
                        }
                        if (otp_res.response_status.code === "470170" ||
                            otp_res.response_status.code === "470168") {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "No mobile number is linked with this Aadhaar Number",
                                    data: null
                                })];
                        }
                        if (otp_res.response_status.code === "470066" ||
                            otp_res.response_status.code === "470052") {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Server Error occured during API call to UIDAI, try again",
                                    data: null
                                })];
                        }
                        if (otp_res.response_status.code === "470084") {
                            return [2 /*return*/, res.status(403).json({
                                    code: "403",
                                    status: "error",
                                    message: "OTP Invalid, try again",
                                    data: null
                                })];
                        }
                        if (otp_res.response_status.code === "470048" ||
                            otp_res.response_status.code === "470169") {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "The Session has expired, try again",
                                    data: null
                                })];
                        }
                        //invalid otp entered:
                        if (otp_res.response_status.code === "470021" ||
                            otp_res.response_status.code === "470022" ||
                            otp_res.response_status.code === "470023" ||
                            otp_res.response_status.code === "470024") {
                            return [2 /*return*/, res.status(403).json({
                                    code: "403",
                                    status: "error",
                                    message: "OTP Invalid  ".concat(otp_res.response_status.message),
                                    data: []
                                })];
                        }
                        if (otp_res.response_status.code === "000") {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "KYC Details File Fetched successfully",
                                    data: null
                                })];
                        }
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "Some Server Error from UIDAI ",
                                data: null
                            })];
                }
            });
        });
    };
    UsersController.prototype.fetchKyc = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, uuid, aadhaar, user, user_email, kyc_res, given_legalname, name_1, dob1, dob2, user_kyc, user_kyc, user_kyc, new_user_kyc, req_data, user_info_update, user_kyc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = body.user_id, uuid = body.uuid, aadhaar = body.aadhaar;
                        return [4 /*yield*/, this.usersService.findOne(parseInt(user_id))];
                    case 1:
                        user = _a.sent();
                        if (!uuid || uuid == undefined || uuid == null || uuid.length < 20) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "UUID is not valid",
                                    data: null
                                })];
                        }
                        if (!(!user || user == undefined || user === null)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "Error Occured, No such user exists",
                                data: null
                            })];
                    case 2:
                        common_1.Logger.log("Inside fetchKyc: userController", "fetchKyc");
                        user_email = user.email_id;
                        return [4 /*yield*/, this.usersService.fetchKyc(uuid, user_email)];
                    case 3:
                        kyc_res = _a.sent();
                        console.log("kyc_res: ", kyc_res);
                        if (!kyc_res || kyc_res == undefined || kyc_res === null) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured, unable to contact to server",
                                    data: null
                                })];
                        }
                        if (kyc_res.response_status.code === "470028" ||
                            kyc_res.response_status.code === "470042") {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Server Error occured during API call to UIDAI, try again",
                                    data: null
                                })];
                        }
                        if (kyc_res.response_status.code === "470156" ||
                            kyc_res.response_status.code === "470030") {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Invalid UUID ",
                                    data: null
                                })];
                        }
                        if (kyc_res.response_status.code === "470032") {
                            return [2 /*return*/, res.status(403).json({
                                    code: "403",
                                    status: "error",
                                    message: "OKYC Data does not exist",
                                    data: null
                                })];
                        }
                        if (!(kyc_res.response_status.code == "000" &&
                            kyc_res.response_data !== null)) return [3 /*break*/, 30];
                        given_legalname = user.legalname.toUpperCase();
                        name_1 = kyc_res.response_data.name.toString().toUpperCase();
                        dob1 = kyc_res.response_data.dob
                            .replace(/\D/g, "")
                            .toString()
                            .trim();
                        dob2 = user.dob.replace(/\D/g, "").toString().trim();
                        console.log("dob_UIDAI: ", dob1);
                        console.log("dob_database: ", dob2);
                        console.log("name_UIDAI: ", name_1);
                        console.log("name_database: ", given_legalname);
                        if (!(name_1 == given_legalname && dob1 != dob2)) return [3 /*break*/, 8];
                        user.document_value = null;
                        user.isPersonalFilled = 0;
                        user.isAddressFilled = 0;
                        user.document_type = user_entity_1.document_Type_Enum.PAN;
                        user.legalname = null;
                        user.dob = null;
                        user.phone_number = null;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.kycRepository.findOne({
                                where: { kyc_user_id: user_id },
                                order: { kyc_id: "DESC" }
                            })];
                    case 5:
                        user_kyc = _a.sent();
                        if (!user_kyc) return [3 /*break*/, 7];
                        user_kyc.kyc_status = userKYC_entity_1.kyc_status_enum.Rejected;
                        return [4 /*yield*/, this.kycRepository.save(user_kyc)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        common_1.Logger.log("Inside fetchKyc: DATABASE DOB & AADHAAR DOB NOT MATCHED ", "fetchKyc");
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "Inavlid Date Of Birth OR Name Or Aadhaar Number ",
                                data: null
                            })];
                    case 8:
                        if (!(name_1 !== given_legalname && dob1 != dob2)) return [3 /*break*/, 13];
                        user.document_value = null;
                        user.document_type = user_entity_1.document_Type_Enum.PAN;
                        user.legalname = null;
                        user.dob = null;
                        user.isAddressFilled = 0;
                        user.isPersonalFilled = 0;
                        user.phone_number = null;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, this.kycRepository.findOne({
                                where: { kyc_user_id: user_id },
                                order: { kyc_id: "DESC" }
                            })];
                    case 10:
                        user_kyc = _a.sent();
                        if (!user_kyc) return [3 /*break*/, 12];
                        user_kyc.kyc_status = userKYC_entity_1.kyc_status_enum.Rejected;
                        //user_kyc.api_repsonse = `Rejected at:  ${Date.now().toLocaleString()} by uuid: ${uuid}`;
                        return [4 /*yield*/, this.kycRepository.save(user_kyc)];
                    case 11:
                        //user_kyc.api_repsonse = `Rejected at:  ${Date.now().toLocaleString()} by uuid: ${uuid}`;
                        _a.sent();
                        _a.label = 12;
                    case 12:
                        common_1.Logger.log("Inside fetchKyc: DATABASE And AADHAAR NAME NOT MATCHED ", "fetchKyc");
                        // user.document_value = "";
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "Inavlid Date Of Birth Or Name Or Aadhaar Number",
                                data: []
                            })];
                    case 13:
                        if (!(name_1 === given_legalname && dob1 === dob2)) return [3 /*break*/, 24];
                        common_1.Logger.log("Inside fetchKyc: DATABASE And AADHAAR NAME & DOB MATCHED ", "fetchKyc");
                        return [4 /*yield*/, this.kycRepository.findOne({
                                where: { kyc_user_id: user_id },
                                order: { kyc_id: "DESC" }
                            })];
                    case 14:
                        user_kyc = _a.sent();
                        if (!(!user_kyc || user_kyc == undefined || user_kyc === null)) return [3 /*break*/, 18];
                        return [4 /*yield*/, this.kycRepository.create({
                                kyc_user_id: user_id
                            })];
                    case 15:
                        new_user_kyc = _a.sent();
                        new_user_kyc.kyc_status = userKYC_entity_1.kyc_status_enum.Completed;
                        new_user_kyc.acknowledgement_number =
                            kyc_res.response_data.reference_id;
                        new_user_kyc.api_repsonse = JSON.stringify(kyc_res);
                        new_user_kyc.vendor_id = "".concat(user_id);
                        new_user_kyc.token =
                            uuid != null
                                ? uuid
                                : "".concat(Math.random()
                                    .toString(36)
                                    .substring(2, 10), "-").concat(Math.random()
                                    .toString(36)
                                    .substring(2, 10));
                        return [4 /*yield*/, axios_1["default"]
                                .get("https://ipinfo.io")
                                .then(function (res) { return res.data; })];
                    case 16:
                        req_data = _a.sent();
                        //user_kyc.created_ip = req_data.ip ? req_data.ip : "";
                        // user_kyc.created_datetime = new Date();
                        return [4 /*yield*/, this.kycRepository.save(new_user_kyc)];
                    case 17:
                        //user_kyc.created_ip = req_data.ip ? req_data.ip : "";
                        // user_kyc.created_datetime = new Date();
                        _a.sent();
                        return [3 /*break*/, 20];
                    case 18:
                        user_kyc.kyc_status = userKYC_entity_1.kyc_status_enum.Completed;
                        user_kyc.acknowledgement_number =
                            kyc_res.response_data.reference_id;
                        user_kyc.api_repsonse = JSON.stringify(kyc_res);
                        return [4 /*yield*/, this.kycRepository.save(user_kyc)];
                    case 19:
                        _a.sent();
                        _a.label = 20;
                    case 20: return [4 /*yield*/, this.userRepository.findOne({
                            where: { user_id: user_id }
                        })];
                    case 21:
                        user_info_update = _a.sent();
                        if (!user_info_update) return [3 /*break*/, 23];
                        user_info_update.document_type = user_entity_1.document_Type_Enum.AADHAR;
                        user_info_update.document_value = aadhaar;
                        return [4 /*yield*/, this.userRepository.save(user_info_update)];
                    case 22:
                        _a.sent();
                        _a.label = 23;
                    case 23: return [2 /*return*/, res.status(200).json({
                            code: "200",
                            status: "success",
                            message: "KYC Details matched, user verified",
                            data: []
                        })];
                    case 24:
                        user.document_value = null;
                        user.document_type = user_entity_1.document_Type_Enum.PAN;
                        user.legalname = null;
                        user.dob = null;
                        user.isAddressFilled = 0;
                        user.isPersonalFilled = 0;
                        user.phone_number = null;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 25:
                        _a.sent();
                        return [4 /*yield*/, this.kycRepository.findOne({
                                where: { kyc_user_id: user_id },
                                order: { kyc_id: "DESC" }
                            })];
                    case 26:
                        user_kyc = _a.sent();
                        if (!user_kyc) return [3 /*break*/, 28];
                        user_kyc.kyc_status = userKYC_entity_1.kyc_status_enum.Rejected;
                        //user_kyc.api_repsonse = `Rejected at:  ${Date.now().toLocaleString()} by uuid: ${uuid}`;
                        return [4 /*yield*/, this.kycRepository.save(user_kyc)];
                    case 27:
                        //user_kyc.api_repsonse = `Rejected at:  ${Date.now().toLocaleString()} by uuid: ${uuid}`;
                        _a.sent();
                        _a.label = 28;
                    case 28:
                        common_1.Logger.log("Inside fetchKyc: DATABASE And AADHAAR NAME NOT MATCHED ", "fetchKyc");
                        // user.document_value = "";
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "Inavlid Date Of Birth Or Name Or Aadhaar Number",
                                data: []
                            })];
                    case 29: return [3 /*break*/, 31];
                    case 30:
                        if (kyc_res.response_status.code !== "000") {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Could Not verify KYC Details, UIDAI Server error, try again later",
                                    data: []
                                })];
                        }
                        _a.label = 31;
                    case 31: return [2 /*return*/, res.status(400).json({
                            code: "400",
                            status: "error",
                            message: "UIDAI Server Error, Please try again later",
                            data: []
                        })];
                }
            });
        });
    };
    UsersController.prototype.fillSignUpForm = function (fillSignUpFormDto, res) {
        return __awaiter(this, void 0, void 0, function () {
            var isPhoneNumberEntered, user_id, phone_number, user_check, isPhoneTaken, filled_form_user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isPhoneNumberEntered = false;
                        user_id = parseInt(fillSignUpFormDto.user_id);
                        phone_number = fillSignUpFormDto.phone_number;
                        return [4 /*yield*/, this.usersService.findOne(user_id)];
                    case 1:
                        user_check = _a.sent();
                        if (!user_check) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured, No such User! ",
                                    data: null
                                })];
                        }
                        if (!(phone_number !== null &&
                            phone_number !== undefined &&
                            phone_number !== "")) return [3 /*break*/, 3];
                        if (phone_number.length < 9) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Phone number length invalid!",
                                    data: []
                                })];
                        }
                        return [4 /*yield*/, this.usersService.findPhoneNumber(phone_number)];
                    case 2:
                        isPhoneTaken = _a.sent();
                        if (isPhoneTaken) {
                            if (isPhoneTaken.user_id != user_id) {
                                common_1.Logger.log("Inside fillSignUpForm: PHONE NUMBER ALREADY TAKEN ", "fillSignUpForm");
                                return [2 /*return*/, res.status(400).json({
                                        code: "400",
                                        status: "error",
                                        message: "Error Occured , Phone number already taken",
                                        data: null
                                    })];
                            }
                        }
                        //TODO: OTP Logic Here:
                        isPhoneNumberEntered = true;
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.usersService.fillSignUpForm(fillSignUpFormDto, user_id)];
                    case 4:
                        filled_form_user = _a.sent();
                        if (filled_form_user) {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Signup successful ",
                                    data: {
                                        user_id: filled_form_user.user_id,
                                        isPhoneNumberEntered: isPhoneNumberEntered
                                    }
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured, in signup form fill",
                                    data: null
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.updatePhoneNumber = function (updatePhoneNumberDto, res) {
        return __awaiter(this, void 0, void 0, function () {
            var phone_number, user_id, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        phone_number = updatePhoneNumberDto.phone_number, user_id = updatePhoneNumberDto.user_id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.usersService.updatePhoneNumber(user_id, phone_number)];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            result.password = undefined;
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Phone number has been updated successfully!",
                                    data: null
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured !",
                                    data: result
                                })];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        common_1.Logger.error("Error: ", error_2);
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "Error Occured !",
                                data: error_2
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.deleteUserByEmail = function (body, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, delete_user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne({
                            where: { email_id: body.email_id }
                        })];
                    case 1:
                        user = _a.sent();
                        if (!(!user || user == undefined || user === null)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "Error Occured, No such User found! ",
                                data: null
                            })];
                    case 2: return [4 /*yield*/, this.usersService.forceDeleteUser(body.email_id)];
                    case 3:
                        delete_user = _a.sent();
                        if (!delete_user || delete_user == undefined || delete_user === null) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured, User not deleted ",
                                    data: null
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "User deleted successfully!",
                                    data: null
                                })];
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.updateAddress = function (updateAddressDto, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id_, user_check, user_address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id_ = parseInt(req.body.user_id);
                        return [4 /*yield*/, this.usersService.findOne(user_id_)];
                    case 1:
                        user_check = _a.sent();
                        if (!user_check) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured, No such User! ",
                                    data: null
                                })];
                        }
                        return [4 /*yield*/, this.usersService.updateAddress(user_id_, updateAddressDto)];
                    case 2:
                        user_address = _a.sent();
                        if (user_address) {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Address Updated Successfully",
                                    data: user_address
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured, No such user in User Address Table ",
                                    data: null
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.updateEmail = function (body, res) {
        return __awaiter(this, void 0, void 0, function () {
            var new_email_id, existing_email_id, user_id, user, user2, email_update;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        new_email_id = body.new_email_id, existing_email_id = body.existing_email_id, user_id = body.user_id;
                        if (new_email_id == existing_email_id) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured ",
                                    data: null
                                })];
                        }
                        return [4 /*yield*/, this.usersService.findOne(parseInt(user_id))];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.usersService.findUserByEmail(existing_email_id)];
                    case 2:
                        user2 = _a.sent();
                        if (user2.user_id !== user.user_id) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured ",
                                    data: null
                                })];
                        }
                        if (!user) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured ",
                                    data: null
                                })];
                        }
                        return [4 /*yield*/, this.usersService.updateEmail(user_id, new_email_id)];
                    case 3:
                        email_update = _a.sent();
                        if (email_update) {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Email OTP has been sent successfully, please verfiy now.. ",
                                    data: null
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured ",
                                    data: null
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.changePassword = function (body, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, old_password, new_password, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = body.user_id, old_password = body.old_password, new_password = body.new_password;
                        if (old_password === new_password) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured, please Provide different passwords ",
                                    data: null
                                })];
                        }
                        if (!(!old_password || !new_password || !user_id)) return [3 /*break*/, 1];
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "Error Occured, please provide  old, new Passwords and email_id ",
                                data: null
                            })];
                    case 1: return [4 /*yield*/, this.usersService.changePassword(parseInt(user_id), old_password, new_password)];
                    case 2:
                        result = _a.sent();
                        if (!result || result === undefined || result === null) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured, please provide correct password ",
                                    data: null
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Password has been changed successfully ",
                                    data: null
                                })];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.resetPassword = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var newPassword, user_id, email_id, user, user_, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newPassword = body.newPassword;
                        user_id = parseInt(body.user_id);
                        return [4 /*yield*/, this.usersService.findOne(user_id)];
                    case 1:
                        user = _a.sent();
                        if (user === null || user === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured ",
                                    data: null
                                })];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        email_id = user.email_id;
                        return [4 /*yield*/, this.usersService.updatePassword(user_id, newPassword)];
                    case 3:
                        user_ = _a.sent();
                        if (user_) {
                            user_.password = undefined;
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "User's Password has been updated successfully",
                                    data: user_.user_id
                                })];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        e_5 = _a.sent();
                        console.log(e_5);
                        return [2 /*return*/, res.status(400).json({
                                code: "400",
                                status: "error",
                                message: "Error Occured ",
                                data: e_5.message
                            })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.updateTfa = function (Body, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, otp, user, result, user_;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = Body.user_id, otp = Body.otp;
                        return [4 /*yield*/, this.usersService.findOne(parseInt(user_id))];
                    case 1:
                        user = _a.sent();
                        console.log(user);
                        if (!user) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured",
                                    data: null
                                })];
                        }
                        return [4 /*yield*/, this.usersService.verifyTFA(otp, parseInt(user_id))];
                    case 2:
                        result = _a.sent();
                        if (!(result === true)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.usersService.updateTfa(user_id)];
                    case 3:
                        user_ = _a.sent();
                        if (user_) {
                            user_.password = undefined;
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "TFA status has been updated successfully",
                                    data: user_
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured",
                                    data: user_
                                })];
                        }
                        return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, res.status(400).json({
                            code: "400",
                            status: "error",
                            message: "Errror Occured, Invalid OTP",
                            data: null
                        })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.remove = function (id) {
        return this.usersService.remove(+id);
    };
    __decorate([
        (0, common_1.Post)("/create-checkout-session"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "test2");
    __decorate([
        (0, common_1.Post)("/confirmpayment"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "confirmpayment");
    __decorate([
        (0, common_1.Post)("/testuserquery"),
        __param(0, (0, common_1.Res)())
    ], UsersController.prototype, "testUserQuery");
    __decorate([
        (0, common_1.Post)("/getsipbytokencode"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "getSIPByTokenCode");
    __decorate([
        (0, common_1.Post)("/kyc/status"),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Res)())
    ], UsersController.prototype, "getKycDetails");
    __decorate([
        (0, common_1.Post)("/details"),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Res)())
    ], UsersController.prototype, "getUserDetails");
    __decorate([
        (0, common_1.Get)("/getallindextokens"),
        __param(0, (0, common_1.Res)())
    ], UsersController.prototype, "getIndexTokens");
    __decorate([
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)())
    ], UsersController.prototype, "create");
    __decorate([
        (0, common_1.Post)("register"),
        (0, common_1.UsePipes)(common_1.ValidationPipe),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Res)())
    ], UsersController.prototype, "registerUser");
    __decorate([
        (0, common_1.Post)("/getstates"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "getStates");
    __decorate([
        (0, common_1.Post)("/getcountries"),
        __param(0, (0, common_1.Res)())
    ], UsersController.prototype, "getCountries");
    __decorate([
        (0, common_1.Post)("sendotp"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "sendOTP");
    __decorate([
        (0, common_1.Post)("resendotp"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "resendOTP");
    __decorate([
        (0, common_1.Post)("delete/account"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "softDeleteAccount");
    __decorate([
        (0, common_1.Post)("update/userkycdetails"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "updateKYCDetails");
    __decorate([
        (0, common_1.Post)("/sendkycresponse"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "sendKYCResponse");
    __decorate([
        (0, common_1.Post)("userkycdetails"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "getUserKYCDetails");
    __decorate([
        (0, common_1.Post)("verify/otp"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "verifyOTP");
    __decorate([
        (0, common_1.Post)("verify/tfa"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "verifyTFA");
    __decorate([
        (0, common_1.Post)("verify/email/change"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "verifyEmailChange");
    __decorate([
        (0, common_1.Get)()
    ], UsersController.prototype, "findAll");
    __decorate([
        (0, common_1.Post)("notifications"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "getNotification");
    __decorate([
        (0, common_1.Get)(":id"),
        __param(0, (0, common_1.Param)("id"))
    ], UsersController.prototype, "findOne");
    __decorate([
        (0, common_1.Patch)(":id"),
        __param(0, (0, common_1.Param)("id")),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "update");
    __decorate([
        (0, common_1.Post)("/updateprofile"),
        (0, common_1.UsePipes)(common_1.ValidationPipe),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "updateProfile");
    __decorate([
        (0, common_1.Post)("/update/personalinfo"),
        (0, common_1.UsePipes)(common_1.ValidationPipe),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Res)())
    ], UsersController.prototype, "updateUser");
    __decorate([
        (0, common_1.Post)("/verifyuserpan"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "verifyUserDocument");
    __decorate([
        (0, common_1.Post)("/getcaptcha"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "getCaptcha");
    __decorate([
        (0, common_1.Post)("/enteraadhaar"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "enterAadhaar");
    __decorate([
        (0, common_1.Post)("/enterotp"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "enterOtp");
    __decorate([
        (0, common_1.Post)("/fetchkyc"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "fetchKyc");
    __decorate([
        (0, common_1.Post)("/fillsignupform"),
        (0, common_1.UsePipes)(common_1.ValidationPipe),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Res)())
    ], UsersController.prototype, "fillSignUpForm");
    __decorate([
        (0, common_1.Post)("/update/phonenumber"),
        (0, common_1.UsePipes)(common_1.ValidationPipe),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Res)())
    ], UsersController.prototype, "updatePhoneNumber");
    __decorate([
        (0, common_1.Post)("deleteusermbyemail"),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Res)())
    ], UsersController.prototype, "deleteUserByEmail");
    __decorate([
        (0, common_1.Post)("/update/address"),
        (0, common_1.UsePipes)(common_1.ValidationPipe),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Request)()),
        __param(2, (0, common_1.Res)())
    ], UsersController.prototype, "updateAddress");
    __decorate([
        (0, common_1.Put)("update/email"),
        (0, common_1.UsePipes)(common_1.ValidationPipe),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Res)())
    ], UsersController.prototype, "updateEmail");
    __decorate([
        (0, common_1.Put)("change/password"),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Res)())
    ], UsersController.prototype, "changePassword");
    __decorate([
        (0, common_1.Put)("reset/password"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "resetPassword");
    __decorate([
        (0, common_1.Post)("update/tfastatus"),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Res)())
    ], UsersController.prototype, "updateTfa");
    __decorate([
        (0, common_1.Delete)(":id"),
        __param(0, (0, common_1.Param)("id"))
    ], UsersController.prototype, "remove");
    UsersController = __decorate([
        (0, swagger_1.ApiBearerAuth)(),
        (0, swagger_1.ApiTags)("users"),
        (0, common_1.Controller)("users"),
        __param(0, (0, typeorm_1.InjectRepository)(entities_1.moleculus_index_tokens)),
        __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.moleculus_user)),
        __param(2, (0, typeorm_1.InjectRepository)(siptransactions_entity_1.moleculus_sip_transactions)),
        __param(3, (0, typeorm_1.InjectRepository)(userKYC_entity_1.moleculus_user_kyc)),
        __param(4, (0, common_1.Inject)("USER_SERVICE")),
        __param(5, (0, common_1.Inject)("NOTIFICATIONS_SERVICE"))
    ], UsersController);
    return UsersController;
}());
exports.UsersController = UsersController;
