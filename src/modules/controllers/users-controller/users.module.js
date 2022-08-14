"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var entities_1 = require("../../../../../../../../../src/modules/entities");
var mail_service_1 = require("../../../../../../../../../src/utils/mail/mail.service");
var sms_service_1 = require("../../../../../../../../../src/utils/sms/sms.service");
var user_entity_1 = require("../../entities/user.entity");
var userNotification_entity_1 = require("../../entities/userNotification.entity");
var user_notifications_service_1 = require("../user-noti-controller/user-notifications.service");
var users_controller_1 = require("./users.controller");
var users_service_1 = require("./users.service");
var userAddress_entity_1 = require("../../entities/userAddress.entity");
var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([
                    user_entity_1.moleculus_user,
                    entities_1.moleculus_cities,
                    entities_1.moleculus_sip_transactions,
                    entities_1.moleculus_sip,
                    entities_1.moleculus_states,
                    entities_1.moleculus_countries,
                    entities_1.moleculus_index_tokens,
                    entities_1.moleculus_user_kyc,
                    userNotification_entity_1.moleculus_user_notification,
                    userAddress_entity_1.moleculus_user_address,
                ]),
            ],
            controllers: [users_controller_1.UsersController],
            providers: [
                { provide: "USER_SERVICE", useClass: users_service_1.UsersService },
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
            ]
        })
    ], UsersModule);
    return UsersModule;
}());
exports.UsersModule = UsersModule;
