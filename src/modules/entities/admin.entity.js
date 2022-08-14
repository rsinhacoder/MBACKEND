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
exports.moleculus_admin = exports.google_auth_enabled_Enum = void 0;
var typeorm_1 = require("typeorm");
var google_auth_enabled_Enum;
(function (google_auth_enabled_Enum) {
    google_auth_enabled_Enum["Enable"] = "Enable";
    google_auth_enabled_Enum["Disable"] = "Disable";
})(google_auth_enabled_Enum = exports.google_auth_enabled_Enum || (exports.google_auth_enabled_Enum = {}));
var moleculus_admin = /** @class */ (function (_super) {
    __extends(moleculus_admin, _super);
    function moleculus_admin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)({
            type: "bigint",
            generated: true
        })
    ], moleculus_admin.prototype, "admin_id");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            "default": ""
        })
    ], moleculus_admin.prototype, "google_auth_code");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": google_auth_enabled_Enum,
            "default": google_auth_enabled_Enum.Disable
        })
    ], moleculus_admin.prototype, "google_auth_enabled");
    __decorate([
        (0, typeorm_1.Column)({
            type: "jsonb",
            nullable: true
        })
    ], moleculus_admin.prototype, "temp_secret");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_admin.prototype, "first_name");
    __decorate([
        (0, typeorm_1.Column)({
            length: 255,
            type: "varchar",
            nullable: true
        })
    ], moleculus_admin.prototype, "last_name");
    __decorate([
        (0, typeorm_1.Column)({
            length: 255,
            type: "varchar",
            unique: true,
            nullable: true
        })
    ], moleculus_admin.prototype, "email_id");
    __decorate([
        (0, typeorm_1.Column)({
            length: 512,
            type: "varchar",
            nullable: false
        })
    ], moleculus_admin.prototype, "password");
    __decorate([
        (0, typeorm_1.Column)({
            length: 255,
            type: "varchar",
            nullable: true
        })
    ], moleculus_admin.prototype, "username");
    __decorate([
        (0, typeorm_1.Column)({
            type: "timestamptz",
            nullable: true
        })
    ], moleculus_admin.prototype, "created_datetime");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_admin.prototype, "created_ip");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_admin.prototype, "admin_profile");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_admin.prototype, "admin_slug");
    __decorate([
        (0, typeorm_1.Column)({
            type: "boolean",
            "default": true
        })
    ], moleculus_admin.prototype, "super_admin_role");
    __decorate([
        (0, typeorm_1.Column)({
            type: "boolean",
            "default": false
        })
    ], moleculus_admin.prototype, "is_deleted");
    moleculus_admin = __decorate([
        (0, typeorm_1.Entity)()
    ], moleculus_admin);
    return moleculus_admin;
}(typeorm_1.BaseEntity));
exports.moleculus_admin = moleculus_admin;
