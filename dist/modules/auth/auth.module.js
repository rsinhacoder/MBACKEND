"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../entities");
const mail_service_1 = require("../../utils/mail/mail.service");
const sms_service_1 = require("../../utils/sms/sms.service");
const user_notifications_service_1 = require("../controllers/user-noti-controller/user-notifications.service");
const users_controller_1 = require("../controllers/users-controller/users.controller");
const users_module_1 = require("../controllers/users-controller/users.module");
const users_service_1 = require("../controllers/users-controller/users.service");
const entities_2 = require("../entities");
const loginLog_entity_1 = require("../entities/loginLog.entity");
const user_entity_1 = require("../entities/user.entity");
const entities_3 = require("./../entities");
const admin_entity_1 = require("./../entities/admin.entity");
const cities_entity_1 = require("./../entities/cities.entity");
const countries_entity_1 = require("./../entities/countries.entity");
const states_entity_1 = require("./../entities/states.entity");
const userAddress_entity_1 = require("./../entities/userAddress.entity");
const userNotification_entity_1 = require("./../entities/userNotification.entity");
const user_auth_controller_1 = require("./controller/user_auth.controller");
require("dotenv").config({ debug: false });
const entities_auth = [
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
    entities_3.moleculus_email_template,
];
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature(entities_auth),
            users_module_1.UsersModule,
            jwt_1.JwtModule.register({
                secret: `${process.env.JWT_SECRET}`,
                signOptions: { expiresIn: "48000s" },
            }),
        ],
        controllers: [user_auth_controller_1.ControllerController, users_controller_1.UsersController],
        providers: [
            {
                provide: "JWT_SERVICE",
                useValue: jwt_1.JwtService,
            },
            {
                provide: "USER_SERVICE",
                useClass: users_service_1.UsersService,
            },
            {
                provide: "SMS_SERVICE",
                useClass: sms_service_1.SMSService,
            },
            {
                provide: "MAIL_SERVICE",
                useClass: mail_service_1.MailService,
            },
            {
                provide: "NOTIFICATIONS_SERVICE",
                useClass: user_notifications_service_1.UserNotificationsService,
            },
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map