"use strict";
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
exports.UserNotificationsService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var axios_1 = require("axios");
var user_entity_1 = require("../../entities/user.entity");
var userNotification_entity_1 = require("../../entities/userNotification.entity");
var UserNotificationsService = /** @class */ (function () {
    function UserNotificationsService(notificationsRepository, userRepository) {
        this.notificationsRepository = notificationsRepository;
        this.userRepository = userRepository;
    }
    UserNotificationsService.prototype.getNotification = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var notification;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.notificationsRepository.findOne({
                            where: { noti_user_id: userId }
                        })];
                    case 1:
                        notification = _a.sent();
                        if (!(notification.price_alert_device == userNotification_entity_1.price_alert_device_enum.Off &&
                            notification.price_alert_email == userNotification_entity_1.price_alert_email_enum.Off)) return [3 /*break*/, 3];
                        notification.price_alert_email = userNotification_entity_1.price_alert_email_enum.On;
                        return [4 /*yield*/, this.notificationsRepository.save(notification)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, notification];
                }
            });
        });
    };
    UserNotificationsService.prototype.updateNotificationStatus = function (userId, type) {
        return __awaiter(this, void 0, void 0, function () {
            var type_enum, x, user, notification, ts, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Inside changeNotificationToggle ", "UserNotificationsService");
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
                            return [2 /*return*/, "Invalid type"];
                        }
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { user_id: userId }
                            })];
                    case 1:
                        user = _a.sent();
                        if (!(!user || user === null || user === undefined)) return [3 /*break*/, 2];
                        common_1.Logger.log("User not found", "UserNotificationsService");
                        return [2 /*return*/, null];
                    case 2:
                        _a.trys.push([2, 8, , 9]);
                        return [4 /*yield*/, this.notificationsRepository.findOne({
                                where: { noti_user_id: userId }
                            })];
                    case 3:
                        notification = _a.sent();
                        if (!notification ||
                            notification === null ||
                            notification === undefined) {
                            common_1.Logger.log("Notification not found", "UserNotificationsService");
                            return [2 /*return*/, "No notification found"];
                        }
                        ts = notification[type];
                        if (!(ts == type_enum.On)) return [3 /*break*/, 5];
                        common_1.Logger.log(ts, "On Found", "UserNotificationsService");
                        notification[type] = type_enum.Off;
                        return [4 /*yield*/, this.notificationsRepository.save(notification)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        if (!(ts == type_enum.Off)) return [3 /*break*/, 7];
                        common_1.Logger.log(ts, "Off Found", "UserNotificationsService");
                        notification[type] = type_enum.On;
                        return [4 /*yield*/, this.notificationsRepository.save(notification)];
                    case 6: return [2 /*return*/, _a.sent()];
                    case 7:
                        common_1.Logger.log("Notification not found", "UserNotificationsService");
                        return [2 /*return*/, null];
                    case 8:
                        error_1 = _a.sent();
                        common_1.Logger.log(error_1, "Error", "UserNotificationsService");
                        console.log(error_1);
                        return [2 /*return*/, null];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    UserNotificationsService.prototype.createNotification = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var check_user, notification, req_data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("Inside createNotification ", "UserNotificationsService:- createNotification");
                        return [4 /*yield*/, this.getNotification(userId)];
                    case 1:
                        check_user = _a.sent();
                        if (check_user) {
                            return [2 /*return*/, null];
                        }
                        notification = new userNotification_entity_1.moleculus_user_notification();
                        notification.noti_user_id = userId;
                        return [4 /*yield*/, axios_1["default"]
                                .get("https://ipinfo.io")
                                .then(function (res) { return res.data; })];
                    case 2:
                        req_data = _a.sent();
                        notification.modified_datetime = new Date();
                        notification.modified_ip = req_data.ip;
                        return [4 /*yield*/, this.notificationsRepository.save(notification)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserNotificationsService.prototype.save = function (notification) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.notificationsRepository.save(notification)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserNotificationsService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(userNotification_entity_1.moleculus_user_notification)),
        __param(0, (0, common_1.Inject)("NOTIFICATIONS_SERVICE")),
        __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.moleculus_user))
    ], UserNotificationsService);
    return UserNotificationsService;
}());
exports.UserNotificationsService = UserNotificationsService;
