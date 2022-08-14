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
exports.moleculus_settings = exports.setting_status_enum = void 0;
/* eslint-disable prettier/prettier */
var typeorm_1 = require("typeorm");
var setting_status_enum;
(function (setting_status_enum) {
    setting_status_enum["Enable"] = "Enable";
    setting_status_enum["Disable"] = "Disable";
})(setting_status_enum = exports.setting_status_enum || (exports.setting_status_enum = {}));
var moleculus_settings = /** @class */ (function (_super) {
    __extends(moleculus_settings, _super);
    function moleculus_settings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)({
            type: "bigint",
            generated: true
        })
    ], moleculus_settings.prototype, "setting_id");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            "default": ""
        })
    ], moleculus_settings.prototype, "setting_name");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            "default": ""
        })
    ], moleculus_settings.prototype, "setting_value");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": setting_status_enum,
            "default": setting_status_enum.Enable
        })
    ], moleculus_settings.prototype, "setting_status");
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            nullable: true
        })
    ], moleculus_settings.prototype, "created_datetime");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_settings.prototype, "setting_keyword");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            "default": ""
        })
    ], moleculus_settings.prototype, "created_ip");
    __decorate([
        (0, typeorm_1.Column)({
            type: "boolean",
            "default": false
        })
    ], moleculus_settings.prototype, "is_deleted");
    moleculus_settings = __decorate([
        (0, typeorm_1.Entity)()
    ], moleculus_settings);
    return moleculus_settings;
}(typeorm_1.BaseEntity));
exports.moleculus_settings = moleculus_settings;
