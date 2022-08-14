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
exports.UserNotificationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const axios_1 = require("axios");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../entities/user.entity");
const userNotification_entity_1 = require("../../entities/userNotification.entity");
let UserNotificationsService = class UserNotificationsService {
    constructor(notificationsRepository, userRepository) {
        this.notificationsRepository = notificationsRepository;
        this.userRepository = userRepository;
    }
    async getNotification(userId) {
        const notification = await this.notificationsRepository.findOne({
            where: { noti_user_id: userId },
        });
        if (notification.price_alert_device == userNotification_entity_1.price_alert_device_enum.Off &&
            notification.price_alert_email == userNotification_entity_1.price_alert_email_enum.Off) {
            notification.price_alert_email = userNotification_entity_1.price_alert_email_enum.On;
            await this.notificationsRepository.save(notification);
        }
        return notification;
    }
    async updateNotificationStatus(userId, type) {
        common_1.Logger.log("Inside changeNotificationToggle ", "UserNotificationsService");
        var type_enum;
        var x;
        switch (type) {
            case "balance_email":
                type_enum = userNotification_entity_1.balance_email_enum;
                break;
            case "balance_device":
                type_enum = userNotification_entity_1.balance_device_enum;
                break;
            case "security_email":
                type_enum = userNotification_entity_1.security_email_enum;
                break;
            case "security_device":
                type_enum = userNotification_entity_1.security_device_enum;
                break;
            case "price_alert_device":
                type_enum = userNotification_entity_1.price_alert_device_enum;
                break;
            case "price_alert_email":
                type_enum = userNotification_entity_1.price_alert_email_enum;
                break;
            case "update_email":
                type_enum = userNotification_entity_1.update_email_enum;
            case "update_device":
                type_enum = userNotification_entity_1.update_device_enum;
                break;
            default:
                type_enum = null;
        }
        if (type_enum === null) {
            return "Invalid type";
        }
        const user = await this.userRepository.findOne({
            where: { user_id: userId },
        });
        if (!user || user === null || user === undefined) {
            common_1.Logger.log("User not found", "UserNotificationsService");
            return null;
        }
        else {
            try {
                const notification = await this.notificationsRepository.findOne({
                    where: { noti_user_id: userId },
                });
                if (!notification ||
                    notification === null ||
                    notification === undefined) {
                    common_1.Logger.log("Notification not found", "UserNotificationsService");
                    return "No notification found";
                }
                const ts = notification[type];
                if (ts == type_enum.On) {
                    common_1.Logger.log(ts, "On Found", "UserNotificationsService");
                    notification[type] = type_enum.Off;
                    return await this.notificationsRepository.save(notification);
                }
                else if (ts == type_enum.Off) {
                    common_1.Logger.log(ts, "Off Found", "UserNotificationsService");
                    notification[type] = type_enum.On;
                    return await this.notificationsRepository.save(notification);
                }
                common_1.Logger.log("Notification not found", "UserNotificationsService");
                return null;
            }
            catch (error) {
                common_1.Logger.log(error, "Error", "UserNotificationsService");
                console.log(error);
                return null;
            }
        }
    }
    async createNotification(userId) {
        common_1.Logger.log("Inside createNotification ", "UserNotificationsService:- createNotification");
        const check_user = await this.getNotification(userId);
        if (check_user) {
            return null;
        }
        const notification = new userNotification_entity_1.moleculus_user_notification();
        notification.noti_user_id = userId;
        const req_data = await axios_1.default
            .get("https://ipinfo.io")
            .then((res) => res.data);
        notification.modified_datetime = new Date();
        notification.modified_ip = req_data.ip;
        return await this.notificationsRepository.save(notification);
    }
    async save(notification) {
        return await this.notificationsRepository.save(notification);
    }
};
UserNotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(userNotification_entity_1.moleculus_user_notification)),
    __param(0, (0, common_1.Inject)("NOTIFICATIONS_SERVICE")),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.moleculus_user)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserNotificationsService);
exports.UserNotificationsService = UserNotificationsService;
//# sourceMappingURL=user-notifications.service.js.map