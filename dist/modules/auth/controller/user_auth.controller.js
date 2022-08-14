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
exports.ControllerController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const axios_1 = require("axios");
const users_service_1 = require("../../controllers/users-controller/users.service");
const bcrypt_1 = require("../../../utils/bcrypt/bcrypt");
const encryption_1 = require("../../../utils/bcrypt/encryption");
const typeorm_2 = require("typeorm");
const createUserAuth0_1 = require("../../dto/createUserAuth0");
const speakeasy = require("speakeasy");
const user_notifications_service_1 = require("../../controllers/user-noti-controller/user-notifications.service");
const entities_1 = require("../../entities");
const loginLog_entity_1 = require("../../entities/loginLog.entity");
const user_entity_1 = require("../../entities/user.entity");
require("dotenv").config({ debug: false });
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
let ControllerController = class ControllerController {
    constructor(loginLogRepository, jwtService, userRepository, notificationRepository, usersService, addressRepository, userNotificationsService) {
        this.loginLogRepository = loginLogRepository;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.notificationRepository = notificationRepository;
        this.usersService = usersService;
        this.addressRepository = addressRepository;
        this.userNotificationsService = userNotificationsService;
    }
    async save_auth(req, res, createUserDto) {
        common_1.Logger.log("Inside save_auth ", "UserAuthController:- save_auth");
        try {
            const user_email_check = await this.userRepository.findOne({
                where: {
                    email_id: createUserDto.auth_response.email,
                },
            });
            if (user_email_check) {
                if (user_email_check.is_deleted === user_entity_1.is_deleted_Enum.Yes) {
                    return res.status(400).json({
                        code: "400",
                        status: "error",
                        message: "User is deleted",
                        data: [],
                    });
                }
                if (user_email_check.status === user_entity_1.status_Enum.Disable) {
                    return res.status(400).json({
                        code: "400",
                        status: "error",
                        message: "User is disabled",
                        data: [],
                    });
                }
                var token = await this.jwtService.sign({
                    username: `${user_email_check.first_name} 
            ${user_email_check.last_name}`,
                }, { secret: `${process.env.JWT_SECRET}`, expiresIn: "1500s" });
                const login_log = new loginLog_entity_1.moleculus_login_log();
                login_log.logged_user_email = user_email_check.email_id;
                login_log.logged_user_id = user_email_check.user_id.toString();
                login_log.logged_user_name = `${user_email_check.first_name} ${user_email_check.last_name}`;
                login_log.log_in_datetime = new Date();
                const req_data = await axios_1.default
                    .get("https://ipinfo.io")
                    .then((res) => res.data);
                login_log.logged_user_ip = req_data ? req_data.ip : "";
                await this.loginLogRepository.save(login_log);
                return res.status(200).json({
                    code: "200",
                    status: "success",
                    message: "Login Successful",
                    data: {
                        user_id: user_email_check.user_id,
                        JWTtoken: token,
                        isSignupDone: user_email_check.isSignupFilled,
                        isAddressUpdated: user_email_check.isAddressFilled,
                        isPersonalUpadted: user_email_check.isPersonalFilled,
                        isDeleted: user_email_check.is_deleted,
                    },
                });
            }
            const temp = JSON.stringify(createUserDto.auth_response);
            const user = await this.userRepository.create(createUserDto);
            var token = await this.jwtService.sign({
                username: `${createUserDto.auth_response.given_name} ${createUserDto.auth_response.family_name}`,
            }, { secret: `${process.env.JWT_SECRET}`, expiresIn: "1500s" });
            var temp_secret_generated = await speakeasy.generateSecret();
            var google_auth_code = temp_secret_generated.base32;
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
            const saved = await this.userRepository.save(user);
            if (saved === undefined || saved === null) {
                return res.status(400).json({
                    code: "400",
                    status: "failure",
                    message: "Error Occured, User not created",
                    data: [],
                });
            }
            const adress_confirmation = await this.usersService.createAddress(user.user_id);
            if (adress_confirmation == null || adress_confirmation == undefined) {
                common_1.Logger.error("New Address not created, Address for the user exists");
            }
            else {
                common_1.Logger.log("New Address created");
            }
            const login_log = new loginLog_entity_1.moleculus_login_log();
            login_log.logged_user_email = createUserDto.auth_response.email;
            login_log.logged_user_id = user.user_id.toString();
            login_log.logged_user_name = `${createUserDto.auth_response.given_name} ${createUserDto.auth_response.family_name}`;
            login_log.log_in_datetime = new Date();
            const req_data_ = await axios_1.default
                .get("https://ipinfo.io")
                .then((res) => res.data);
            login_log.logged_user_ip = req_data_ ? req_data_.ip : "";
            login_log.logged_user_country_of_login = req_data_
                ? req_data_.country
                : "";
            await this.loginLogRepository.save(login_log);
            await this.userRepository.save(user);
            const notification = new entities_1.moleculus_user_notification();
            notification.noti_user_id = user.user_id;
            const req_data = await axios_1.default
                .get("https://ipinfo.io")
                .then((res) => res.data);
            notification.modified_datetime = new Date();
            notification.modified_ip = req_data ? req_data.ip : "";
            const noti_check = await this.notificationRepository.findOne({
                where: {
                    noti_user_id: user.user_id,
                },
            });
            if (noti_check !== undefined && noti_check !== null) {
                common_1.Logger.log("Notification already exists", "UserAuthController:- save_auth");
            }
            else {
                const noti = await this.notificationRepository.save(notification);
                if (noti) {
                    common_1.Logger.log("Notification created", "UserAuthController:- save_auth");
                }
            }
            return res.status(200).json({
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
                    isPersonalUpdated: user.isPersonalFilled,
                },
            });
        }
        catch (error) { }
    }
    async logout(req, res, body) {
        common_1.Logger.log("Inside logout ", "UserAuthController:- logout");
        try {
            const user_id = body.user_id;
            const jwt = body.jwt;
            const login_log = await this.userRepository.findOne({
                where: {
                    user_id: user_id,
                },
            });
            if (login_log === undefined || login_log === null) {
                return res.status(400).json({
                    code: "400",
                    status: "failure",
                    message: "No User Exists",
                    data: [],
                });
            }
            else {
                const result = await this.loginLogRepository.update({ logged_user_id: user_id }, { log_out_datetime: new Date() });
                if (result) {
                    return res.status(200).json({
                        code: "200",
                        status: "success",
                        message: "logged out Succesfully",
                        data: [],
                    });
                }
            }
        }
        catch (error) {
            common_1.Logger.error(error, "UserAuthController:- logout");
        }
    }
    async login(req, res, body) {
        common_1.Logger.log("Inside login controller", "UserAuthController");
        var token;
        const { email_id, password } = body;
        const user_check = await this.userRepository.findOne({
            where: { email_id },
        });
        if (!user_check) {
            common_1.Logger.log("User not found", "UserAuthController");
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "User not found",
                data: [],
            });
        }
        else {
            const is_Matched = await (0, bcrypt_1.comparePassword)(password, user_check.password);
            try {
                if (!is_Matched) {
                    common_1.Logger.log("Password not matched", "UserAuthController");
                    return res.status(400).json({
                        code: "400",
                        status: "error",
                        message: "Password not matched",
                        data: [],
                    });
                }
                else {
                    common_1.Logger.log("Password matched", "UserAuthController");
                    token = await this.jwtService.sign({
                        username: `${user_check.first_name} ${user_check.last_name}`,
                    }, { secret: `${process.env.JWT_SECRET}`, expiresIn: "1080h" });
                    const login_log = new loginLog_entity_1.moleculus_login_log();
                    login_log.logged_user_email = user_check.email_id;
                    login_log.logged_user_id = user_check.user_id.toString();
                    login_log.logged_user_name = `${user_check.first_name} ${user_check.last_name}`;
                    login_log.log_in_datetime = new Date();
                    const req_data = await axios_1.default
                        .get("https://ipinfo.io")
                        .then((res) => res.data);
                    login_log.logged_user_ip = req_data.ip;
                    login_log.logged_user_country_of_login = req_data.country;
                    await this.loginLogRepository.save(login_log);
                    return res.status(400).json({
                        code: "200",
                        status: "success",
                        message: "JWT token assigned",
                        data: {
                            user_id: user_check.user_id,
                            token,
                        },
                    });
                }
            }
            catch (error) {
                common_1.Logger.error(error);
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: " Error Occured ",
                    data: null,
                });
            }
        }
    }
};
__decorate([
    (0, common_1.Post)("/auth0"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, createUserAuth0_1.CreateUserAuth0]),
    __metadata("design:returntype", Promise)
], ControllerController.prototype, "save_auth", null);
__decorate([
    (0, common_1.Post)("/logout"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ControllerController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)("/login"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ControllerController.prototype, "login", null);
ControllerController = __decorate([
    (0, common_1.Controller)("users/auth"),
    __param(0, (0, typeorm_1.InjectRepository)(loginLog_entity_1.moleculus_login_log)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.moleculus_user)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.moleculus_user_notification)),
    __param(4, (0, common_1.Inject)("USER_SERVICE")),
    __param(5, (0, typeorm_1.InjectRepository)(entities_1.moleculus_user_address)),
    __param(6, (0, common_1.Inject)("NOTIFICATIONS_SERVICE")),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        users_service_1.UsersService,
        typeorm_2.Repository,
        user_notifications_service_1.UserNotificationsService])
], ControllerController);
exports.ControllerController = ControllerController;
//# sourceMappingURL=user_auth.controller.js.map