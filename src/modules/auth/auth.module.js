"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var jwt_1 = require("@nestjs/jwt");
var typeorm_1 = require("@nestjs/typeorm");
var entities_1 = require("../../../../../../../../src/modules/entities");
var mail_service_1 = require("../../../../../../../../src/utils/mail/mail.service");
var sms_service_1 = require("../../../../../../../../src/utils/sms/sms.service");
var user_notifications_service_1 = require("../controllers/user-noti-controller/user-notifications.service");
var users_controller_1 = require("../controllers/users-controller/users.controller");
var users_module_1 = require("../controllers/users-controller/users.module");
var users_service_1 = require("../controllers/users-controller/users.service");
var entities_2 = require("../entities");
var loginLog_entity_1 = require("../entities/loginLog.entity");
var user_entity_1 = require("../entities/user.entity");
var entities_3 = require("./../entities");
var admin_entity_1 = require("./../entities/admin.entity");
var cities_entity_1 = require("./../entities/cities.entity");
var countries_entity_1 = require("./../entities/countries.entity");
var states_entity_1 = require("./../entities/states.entity");
var userAddress_entity_1 = require("./../entities/userAddress.entity");
var userNotification_entity_1 = require("./../entities/userNotification.entity");
var user_auth_controller_1 = require("./controller/user_auth.controller");
require("dotenv").config({ debug: false });
var entities_auth = [
    entities_2.User,
    entities_3.moleculus_sip_transactions,
    entities_3.moleculus_index_tokens,
    entities_3.moleculus_sip,
    cities_entity_1.moleculus_cities,
    entities_3.moleculus_index_tokens,
    states_entity_1.moleculus_states,
    loginLog_entity_1.moleculus_login_log,
    countries_entity_1.moleculus_countries,
    admin_entity_1.moleculus_admin,
    entities_2.User,
    entities_1.moleculus_user_kyc,
    userNotification_entity_1.moleculus_user_notification,
    userAddress_entity_1.moleculus_user_address,
    user_entity_1.moleculus_user,
];
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature(entities_auth),
                users_module_1.UsersModule,
                jwt_1.JwtModule.register({
                    secret: "".concat(process.env.JWT_SECRET),
                    signOptions: { expiresIn: "48000s" }
                }),
            ],
            controllers: [user_auth_controller_1.ControllerController, users_controller_1.UsersController],
            providers: [
                {
                    provide: "JWT_SERVICE",
                    useValue: jwt_1.JwtService
                },
                {
                    provide: "USER_SERVICE",
                    useClass: users_service_1.UsersService
                },
                {
                    provide: "SMS_SERVICE",
                    useClass: sms_service_1.SMSService
                },
                {
                    provide: "MAIL_SERVICE",
                    useClass: mail_service_1.MailService
                },
                {
                    provide: "NOTIFICATIONS_SERVICE",
                    useClass: user_notifications_service_1.UserNotificationsService
                },
                // {
                //   provide: "LOGIN_LOG_ENTITY_SERVICE",
                //   useValue: LoginLogEntity,
                // },
            ]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
