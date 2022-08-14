"use strict";
/* eslint-disable*/ /*prettier/prettier */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UtilsModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var user_notifications_module_1 = require("../../../../../../../src/modules/controllers/user-noti-controller/user-notifications.module");
var user_notifications_service_1 = require("../../../../../../../src/modules/controllers/user-noti-controller/user-notifications.service");
var users_service_1 = require("../../../../../../../src/modules/controllers/users-controller/users.service");
//import { moleculus_users, moleculus_user_address } from "../typeorm";
var user_entity_1 = require("../../../../../../../src/modules/entities/user.entity");
//import { MailController } from "./mail/mail.controller";
var mail_service_1 = require("./mail/mail.service");
//import { SMSController } from "./sms/sms.controller";
var entities_1 = require("../../../../../../../src/modules/entities");
var sms_service_1 = require("./sms/sms.service");
var entities_2 = require("../../../../../../../src/modules/entities");
var UtilsModule = /** @class */ (function () {
    function UtilsModule() {
    }
    UtilsModule.prototype.configure = function (consumer) { };
    UtilsModule = __decorate([
        (0, common_1.Module)({
            imports: [
                user_notifications_module_1.UserNotificationsModule,
                typeorm_1.TypeOrmModule.forFeature([
                    user_entity_1.moleculus_user,
                    entities_2.moleculus_sip_transactions,
                    entities_2.moleculus_sip,
                    entities_1.moleculus_user_notification,
                    entities_1.moleculus_states,
                    entities_1.moleculus_cities,
                    entities_1.moleculus_user_kyc,
                    entities_1.moleculus_countries,
                    entities_1.moleculus_user_address,
                    entities_1.moleculus_pages,
                    entities_1.moleculus_settings,
                ]),
            ],
            controllers: [],
            providers: [
                {
                    provide: "MAIL_SERVICE",
                    useClass: mail_service_1.MailService
                },
                {
                    provide: "SMS_SERVICE",
                    useClass: sms_service_1.SMSService
                },
                {
                    provide: "USER_SERVICE",
                    useClass: users_service_1.UsersService
                },
                {
                    provide: "NOTIFICATIONS_SERVICE",
                    useClass: user_notifications_service_1.UserNotificationsService
                },
            ]
        })
    ], UtilsModule);
    return UtilsModule;
}());
exports.UtilsModule = UtilsModule;
