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
exports.UserNotificationsController = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var userNotification_entity_1 = require("../../../../../../../../../src/modules/entities/userNotification.entity");
var userNotification_entity_2 = require("../../../../../../../../../src/modules/entities/userNotification.entity");
var UserNotificationsController = /** @class */ (function () {
    function UserNotificationsController(userNotificationsService, notificationRepository) {
        this.userNotificationsService = userNotificationsService;
        this.notificationRepository = notificationRepository;
    }
    UserNotificationsController.prototype.updateNotificationStatus = function (req, res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, type, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = body.user_id, type = body.type;
                        return [4 /*yield*/, this.userNotificationsService.updateNotificationStatus(parseInt(user_id), type)];
                    case 1:
                        result = _a.sent();
                        if (result === "Invalid type") {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    data: null,
                                    message: "Invalid type"
                                })];
                        }
                        if (result === "No notification found") {
                            return [2 /*return*/, res.status(404).json({
                                    code: "400",
                                    status: "error",
                                    message: "No notification found for the given user",
                                    data: null
                                })];
                        }
                        if (!result) return [3 /*break*/, 8];
                        console.log(result);
                        if (!(result.balance_email === userNotification_entity_2.balance_email_enum.Off &&
                            result.balance_device === userNotification_entity_2.balance_device_enum.Off)) return [3 /*break*/, 3];
                        result.balance_device = userNotification_entity_2.balance_device_enum.On;
                        return [4 /*yield*/, this.notificationRepository.save(result)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(result.price_alert_device === userNotification_entity_1.price_alert_device_enum.Off &&
                            result.price_alert_email === userNotification_entity_1.price_alert_email_enum.Off)) return [3 /*break*/, 5];
                        result.price_alert_device = userNotification_entity_1.price_alert_device_enum.On;
                        return [4 /*yield*/, this.notificationRepository.save(result)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        if (!(result.security_device === userNotification_entity_1.security_device_enum.Off &&
                            result.security_email === userNotification_entity_1.security_email_enum.Off)) return [3 /*break*/, 7];
                        result.security_device = userNotification_entity_1.security_device_enum.On;
                        return [4 /*yield*/, this.notificationRepository.save(result)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/, res.status(200).json({
                            code: "200",
                            status: "success",
                            message: "Notification status updated successfully",
                            data: null
                        })];
                    case 8:
                        if (!result || result == undefined || result == null) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Notification status not updated",
                                    data: null
                                })];
                        }
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, common_1.Post)("/updatepreference"),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Res)()),
        __param(2, (0, common_1.Body)())
    ], UserNotificationsController.prototype, "updateNotificationStatus");
    UserNotificationsController = __decorate([
        (0, common_1.Controller)("usernotifications"),
        __param(0, (0, common_1.Inject)("NOTIFICATIONS_SERVICE")),
        __param(1, (0, typeorm_1.InjectRepository)(userNotification_entity_1.moleculus_user_notification))
    ], UserNotificationsController);
    return UserNotificationsController;
}());
exports.UserNotificationsController = UserNotificationsController;
