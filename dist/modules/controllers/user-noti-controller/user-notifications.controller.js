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
exports.UserNotificationsController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const userNotification_entity_1 = require("../../entities/userNotification.entity");
const userNotification_entity_2 = require("../../entities/userNotification.entity");
const typeorm_2 = require("typeorm");
const user_notifications_service_1 = require("./user-notifications.service");
let UserNotificationsController = class UserNotificationsController {
    constructor(userNotificationsService, notificationRepository) {
        this.userNotificationsService = userNotificationsService;
        this.notificationRepository = notificationRepository;
    }
    async updateNotificationStatus(req, res, body) {
        const { user_id, type } = body;
        const result = await this.userNotificationsService.updateNotificationStatus(parseInt(user_id), type);
        if (result === "Invalid type") {
            return res.status(400).json({
                code: "400",
                status: "error",
                data: null,
                message: "Invalid type",
            });
        }
        if (result === "No notification found") {
            return res.status(404).json({
                code: "400",
                status: "error",
                message: "No notification found for the given user",
                data: null,
            });
        }
        if (result) {
            console.log(result);
            if (result.balance_email === userNotification_entity_2.balance_email_enum.Off &&
                result.balance_device === userNotification_entity_2.balance_device_enum.Off) {
                result.balance_device = userNotification_entity_2.balance_device_enum.On;
                await this.notificationRepository.save(result);
            }
            if (result.price_alert_device === userNotification_entity_1.price_alert_device_enum.Off &&
                result.price_alert_email === userNotification_entity_1.price_alert_email_enum.Off) {
                result.price_alert_device = userNotification_entity_1.price_alert_device_enum.On;
                await this.notificationRepository.save(result);
            }
            if (result.security_device === userNotification_entity_1.security_device_enum.Off &&
                result.security_email === userNotification_entity_1.security_email_enum.Off) {
                result.security_device = userNotification_entity_1.security_device_enum.On;
                await this.notificationRepository.save(result);
            }
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Notification status updated successfully",
                data: null,
            });
        }
        else if (!result || result == undefined || result == null) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Notification status not updated",
                data: null,
            });
        }
    }
};
__decorate([
    (0, common_1.Post)("/updatepreference"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserNotificationsController.prototype, "updateNotificationStatus", null);
UserNotificationsController = __decorate([
    (0, common_1.Controller)("usernotifications"),
    __param(0, (0, common_1.Inject)("NOTIFICATIONS_SERVICE")),
    __param(1, (0, typeorm_1.InjectRepository)(userNotification_entity_1.moleculus_user_notification)),
    __metadata("design:paramtypes", [user_notifications_service_1.UserNotificationsService,
        typeorm_2.Repository])
], UserNotificationsController);
exports.UserNotificationsController = UserNotificationsController;
//# sourceMappingURL=user-notifications.controller.js.map