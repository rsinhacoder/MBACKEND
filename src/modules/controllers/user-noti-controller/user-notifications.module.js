"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserNotificationsModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var userNotification_entity_1 = require("../../entities/userNotification.entity");
var user_notifications_service_1 = require("./user-notifications.service");
var user_entity_1 = require("../../entities/user.entity");
var user_notifications_controller_1 = require("./user-notifications.controller");
var UserNotificationsModule = /** @class */ (function () {
    function UserNotificationsModule() {
    }
    UserNotificationsModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([userNotification_entity_1.moleculus_user_notification, user_entity_1.moleculus_user]),
            ],
            controllers: [user_notifications_controller_1.UserNotificationsController],
            providers: [
                {
                    provide: "NOTIFICATIONS_SERVICE",
                    useClass: user_notifications_service_1.UserNotificationsService
                },
            ]
        })
    ], UserNotificationsModule);
    return UserNotificationsModule;
}());
exports.UserNotificationsModule = UserNotificationsModule;
