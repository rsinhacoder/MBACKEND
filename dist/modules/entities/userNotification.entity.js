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
Object.defineProperty(exports, "__esModule", { value: true });
exports.moleculus_user_notification = exports.update_device_enum = exports.update_email_enum = exports.price_alert_email_enum = exports.price_alert_device_enum = exports.security_device_enum = exports.security_email_enum = exports.balance_device_enum = exports.balance_email_enum = void 0;
const typeorm_1 = require("typeorm");
var balance_email_enum;
(function (balance_email_enum) {
    balance_email_enum["On"] = "On";
    balance_email_enum["Off"] = "Off";
})(balance_email_enum = exports.balance_email_enum || (exports.balance_email_enum = {}));
var balance_device_enum;
(function (balance_device_enum) {
    balance_device_enum["On"] = "On";
    balance_device_enum["Off"] = "Off";
})(balance_device_enum = exports.balance_device_enum || (exports.balance_device_enum = {}));
var security_email_enum;
(function (security_email_enum) {
    security_email_enum["On"] = "On";
    security_email_enum["Off"] = "Off";
})(security_email_enum = exports.security_email_enum || (exports.security_email_enum = {}));
var security_device_enum;
(function (security_device_enum) {
    security_device_enum["On"] = "On";
    security_device_enum["Off"] = "Off";
})(security_device_enum = exports.security_device_enum || (exports.security_device_enum = {}));
var price_alert_device_enum;
(function (price_alert_device_enum) {
    price_alert_device_enum["On"] = "On";
    price_alert_device_enum["Off"] = "Off";
})(price_alert_device_enum = exports.price_alert_device_enum || (exports.price_alert_device_enum = {}));
var price_alert_email_enum;
(function (price_alert_email_enum) {
    price_alert_email_enum["On"] = "On";
    price_alert_email_enum["Off"] = "Off";
})(price_alert_email_enum = exports.price_alert_email_enum || (exports.price_alert_email_enum = {}));
var update_email_enum;
(function (update_email_enum) {
    update_email_enum["On"] = "On";
    update_email_enum["Off"] = "Off";
})(update_email_enum = exports.update_email_enum || (exports.update_email_enum = {}));
var update_device_enum;
(function (update_device_enum) {
    update_device_enum["On"] = "On";
    update_device_enum["Off"] = "Off";
})(update_device_enum = exports.update_device_enum || (exports.update_device_enum = {}));
let moleculus_user_notification = class moleculus_user_notification extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: "bigint",
    }),
    __metadata("design:type", Number)
], moleculus_user_notification.prototype, "noti_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "bigint",
    }),
    __metadata("design:type", Number)
], moleculus_user_notification.prototype, "noti_user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: balance_email_enum,
        default: balance_email_enum.Off,
    }),
    __metadata("design:type", String)
], moleculus_user_notification.prototype, "balance_email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: balance_device_enum,
        default: balance_device_enum.On,
    }),
    __metadata("design:type", String)
], moleculus_user_notification.prototype, "balance_device", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: security_email_enum,
        default: security_email_enum.Off,
    }),
    __metadata("design:type", String)
], moleculus_user_notification.prototype, "security_email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: security_device_enum,
        default: security_device_enum.On,
    }),
    __metadata("design:type", String)
], moleculus_user_notification.prototype, "security_device", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: price_alert_device_enum,
        default: price_alert_device_enum.On,
    }),
    __metadata("design:type", String)
], moleculus_user_notification.prototype, "price_alert_device", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: price_alert_email_enum,
        default: price_alert_email_enum.On,
    }),
    __metadata("design:type", String)
], moleculus_user_notification.prototype, "price_alert_email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: update_email_enum,
        default: update_email_enum.On,
    }),
    __metadata("design:type", String)
], moleculus_user_notification.prototype, "update_email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: update_device_enum,
        default: update_device_enum.Off,
    }),
    __metadata("design:type", String)
], moleculus_user_notification.prototype, "update_device", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamptz",
        nullable: true,
    }),
    __metadata("design:type", Date)
], moleculus_user_notification.prototype, "modified_datetime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        default: "",
    }),
    __metadata("design:type", String)
], moleculus_user_notification.prototype, "modified_ip", void 0);
moleculus_user_notification = __decorate([
    (0, typeorm_1.Entity)()
], moleculus_user_notification);
exports.moleculus_user_notification = moleculus_user_notification;
//# sourceMappingURL=userNotification.entity.js.map