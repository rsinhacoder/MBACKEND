"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_notifications_module_1 = require("../modules/controllers/user-noti-controller/user-notifications.module");
const user_notifications_service_1 = require("../modules/controllers/user-noti-controller/user-notifications.service");
const users_service_1 = require("../modules/controllers/users-controller/users.service");
const entities_1 = require("../modules/entities");
const user_entity_1 = require("../modules/entities/user.entity");
const mail_service_1 = require("./mail/mail.service");
const entities_2 = require("../modules/entities");
const sms_service_1 = require("./sms/sms.service");
const entities_3 = require("../modules/entities");
let UtilsModule = class UtilsModule {
    configure() { }
};
UtilsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_notifications_module_1.UserNotificationsModule,
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.moleculus_user,
                entities_3.moleculus_sip_transactions,
                entities_3.moleculus_sip,
                entities_2.moleculus_user_notification,
                entities_2.moleculus_states,
                entities_2.moleculus_user_kyc,
                entities_2.moleculus_countries,
                entities_2.moleculus_user_address,
                entities_2.moleculus_pages,
                entities_2.moleculus_settings,
                entities_1.moleculus_email_template,
            ]),
        ],
        controllers: [],
        providers: [
            {
                provide: "MAIL_SERVICE",
                useClass: mail_service_1.MailService,
            },
            {
                provide: "SMS_SERVICE",
                useClass: sms_service_1.SMSService,
            },
            {
                provide: "USER_SERVICE",
                useClass: users_service_1.UsersService,
            },
            {
                provide: "NOTIFICATIONS_SERVICE",
                useClass: user_notifications_service_1.UserNotificationsService,
            },
        ],
    })
], UtilsModule);
exports.UtilsModule = UtilsModule;
//# sourceMappingURL=utils.module.js.map