"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.moleculus_user_notification = exports.update_device_enum = exports.update_email_enum = exports.price_alert_email_enum = exports.price_alert_device_enum = exports.security_device_enum = exports.security_email_enum = exports.balance_device_enum = exports.balance_email_enum = void 0;
/* eslint-disable prettier/prettier */
var typeorm_1 = require("typeorm");
//import { moleculus_users } from './Moleculus_User';
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
var moleculus_user_notification = /** @class */ (function (_super) {
    __extends(moleculus_user_notification, _super);
    function moleculus_user_notification() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({
            type: "bigint"
        })
    ], moleculus_user_notification.prototype, "noti_id");
    __decorate([
        (0, typeorm_1.Column)({
            type: "bigint"
        })
    ], moleculus_user_notification.prototype, "noti_user_id");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": balance_email_enum,
            "default": balance_email_enum.Off
        })
    ], moleculus_user_notification.prototype, "balance_email");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": balance_device_enum,
            "default": balance_device_enum.On
        })
    ], moleculus_user_notification.prototype, "balance_device");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": security_email_enum,
            "default": security_email_enum.Off
        })
    ], moleculus_user_notification.prototype, "security_email");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": security_device_enum,
            "default": security_device_enum.On
        })
    ], moleculus_user_notification.prototype, "security_device");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": price_alert_device_enum,
            "default": price_alert_device_enum.On
        })
    ], moleculus_user_notification.prototype, "price_alert_device");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": price_alert_email_enum,
            "default": price_alert_email_enum.On
        })
    ], moleculus_user_notification.prototype, "price_alert_email");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": update_email_enum,
            "default": update_email_enum.On
        })
    ], moleculus_user_notification.prototype, "update_email");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": update_device_enum,
            "default": update_device_enum.Off
        })
    ], moleculus_user_notification.prototype, "update_device");
    __decorate([
        (0, typeorm_1.Column)({
            type: "timestamptz",
            nullable: true
        })
    ], moleculus_user_notification.prototype, "modified_datetime");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            "default": ""
        })
    ], moleculus_user_notification.prototype, "modified_ip");
    moleculus_user_notification = __decorate([
        (0, typeorm_1.Entity)()
    ], moleculus_user_notification);
    return moleculus_user_notification;
}(typeorm_1.BaseEntity));
exports.moleculus_user_notification = moleculus_user_notification;
