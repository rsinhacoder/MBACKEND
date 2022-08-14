"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.moleculus_user = exports.user_login_type_Enum = exports.google_auth_enabled_Enum = exports.biometric_Enum = exports.dark_mode_Enum = exports.is_deleted_Enum = exports.status_Enum = exports.is_phone_verified_Enum = exports.document_Type_Enum = exports.is_email_verified_Enum = void 0;
var typeorm_1 = require("typeorm");
var is_email_verified_Enum;
(function (is_email_verified_Enum) {
    is_email_verified_Enum["Yes"] = "Yes";
    is_email_verified_Enum["No"] = "No";
})(is_email_verified_Enum = exports.is_email_verified_Enum || (exports.is_email_verified_Enum = {}));
var document_Type_Enum;
(function (document_Type_Enum) {
    document_Type_Enum["SSN"] = "SSN";
    document_Type_Enum["TIN"] = "TIN";
    document_Type_Enum["AADHAR"] = "AADHAR";
    document_Type_Enum["PAN"] = "PAN";
})(document_Type_Enum = exports.document_Type_Enum || (exports.document_Type_Enum = {}));
var is_phone_verified_Enum;
(function (is_phone_verified_Enum) {
    is_phone_verified_Enum["Yes"] = "Yes";
    is_phone_verified_Enum["No"] = "No";
})(is_phone_verified_Enum = exports.is_phone_verified_Enum || (exports.is_phone_verified_Enum = {}));
var status_Enum;
(function (status_Enum) {
    status_Enum["Enable"] = "Enable";
    status_Enum["Disable"] = "Disable";
})(status_Enum = exports.status_Enum || (exports.status_Enum = {}));
var is_deleted_Enum;
(function (is_deleted_Enum) {
    is_deleted_Enum["Yes"] = "Yes";
    is_deleted_Enum["No"] = "No";
})(is_deleted_Enum = exports.is_deleted_Enum || (exports.is_deleted_Enum = {}));
var dark_mode_Enum;
(function (dark_mode_Enum) {
    dark_mode_Enum["On"] = "On";
    dark_mode_Enum["Off"] = "Off";
})(dark_mode_Enum = exports.dark_mode_Enum || (exports.dark_mode_Enum = {}));
var biometric_Enum;
(function (biometric_Enum) {
    biometric_Enum["On"] = "On";
    biometric_Enum["Off"] = "Off";
})(biometric_Enum = exports.biometric_Enum || (exports.biometric_Enum = {}));
var google_auth_enabled_Enum;
(function (google_auth_enabled_Enum) {
    google_auth_enabled_Enum["Enable"] = "Enable";
    google_auth_enabled_Enum["Disable"] = "Disable";
})(google_auth_enabled_Enum = exports.google_auth_enabled_Enum || (exports.google_auth_enabled_Enum = {}));
var user_login_type_Enum;
(function (user_login_type_Enum) {
    user_login_type_Enum["Normal"] = "Normal";
    user_login_type_Enum["Apple"] = "Apple";
    user_login_type_Enum["Google"] = "Google";
    user_login_type_Enum["Facebook"] = "Facebook";
    user_login_type_Enum["Twitter"] = "Twitter";
})(user_login_type_Enum = exports.user_login_type_Enum || (exports.user_login_type_Enum = {}));
var moleculus_user = /** @class */ (function () {
    function moleculus_user() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({
            type: "bigint"
        })
    ], moleculus_user.prototype, "user_id");
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 512, nullable: true })
    ], moleculus_user.prototype, "legalname");
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true })
    ], moleculus_user.prototype, "first_name");
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true })
    ], moleculus_user.prototype, "last_name");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true,
            unique: true
        })
    ], moleculus_user.prototype, "email_id");
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true })
    ], moleculus_user.prototype, "temp_email_id");
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true,
            "default": null
        })
    ], moleculus_user.prototype, "password");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_user.prototype, "country_name");
    __decorate([
        (0, typeorm_1.Column)({
            type: "int",
            nullable: true
        })
    ], moleculus_user.prototype, "country_id");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_user.prototype, "state_name");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            nullable: true
        })
    ], moleculus_user.prototype, "phone_code");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            nullable: true
        })
    ], moleculus_user.prototype, "email_token");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_user.prototype, "phone_number");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true,
            "default": "123456"
        })
    ], moleculus_user.prototype, "otp");
    __decorate([
        (0, typeorm_1.Column)({
            type: "bigint",
            nullable: true
        })
    ], moleculus_user.prototype, "otp_creation_time");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": is_email_verified_Enum,
            "default": is_email_verified_Enum.No
        })
    ], moleculus_user.prototype, "is_email_verify");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": is_phone_verified_Enum,
            "default": is_phone_verified_Enum.No
        })
    ], moleculus_user.prototype, "is_phone_verify");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": document_Type_Enum,
            "default": document_Type_Enum.SSN
        })
    ], moleculus_user.prototype, "document_type");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_user.prototype, "document_value");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            "default": null
        })
    ], moleculus_user.prototype, "dob");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            "default": null
        })
    ], moleculus_user.prototype, "tin");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            "default": null
        })
    ], moleculus_user.prototype, "ssn");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            "default": null
        })
    ], moleculus_user.prototype, "citizenship");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            "default": null
        })
    ], moleculus_user.prototype, "city");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            "default": null
        })
    ], moleculus_user.prototype, "zipcode");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            "default": null
        })
    ], moleculus_user.prototype, "wallet_balance");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": status_Enum,
            "default": status_Enum.Enable
        })
    ], moleculus_user.prototype, "status");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": is_deleted_Enum,
            "default": is_deleted_Enum.No
        })
    ], moleculus_user.prototype, "is_deleted");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            "default": "USD"
        })
    ], moleculus_user.prototype, "default_currency");
    __decorate([
        (0, typeorm_1.Column)({
            type: "smallint",
            "default": 0
        })
    ], moleculus_user.prototype, "isSignupFilled");
    __decorate([
        (0, typeorm_1.Column)({
            type: "smallint",
            "default": 0
        })
    ], moleculus_user.prototype, "isPersonalFilled");
    __decorate([
        (0, typeorm_1.Column)({
            type: "smallint",
            "default": 0
        })
    ], moleculus_user.prototype, "isAddressFilled");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": dark_mode_Enum,
            "default": dark_mode_Enum.Off
        })
    ], moleculus_user.prototype, "dark_mode");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": biometric_Enum,
            "default": biometric_Enum.Off
        })
    ], moleculus_user.prototype, "biometric");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            "default": null
        })
    ], moleculus_user.prototype, "passcode");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], moleculus_user.prototype, "created_datetime");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            "default": null,
            nullable: true
        })
    ], moleculus_user.prototype, "created_ip");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({
            nullable: true
        })
    ], moleculus_user.prototype, "modified_datetime");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            "default": null
        })
    ], moleculus_user.prototype, "modified_ip");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            "default": null
        })
    ], moleculus_user.prototype, "google_auth_code");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": google_auth_enabled_Enum,
            "default": google_auth_enabled_Enum.Disable
        })
    ], moleculus_user.prototype, "google_auth_enabled");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": user_login_type_Enum,
            "default": user_login_type_Enum.Normal
        })
    ], moleculus_user.prototype, "user_login_type");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            "default": null
        })
    ], moleculus_user.prototype, "secondary_email");
    __decorate([
        (0, typeorm_1.Column)({
            type: "jsonb",
            nullable: true
        })
    ], moleculus_user.prototype, "temp_secret");
    __decorate([
        (0, typeorm_1.Column)({
            type: "jsonb",
            nullable: true
        })
    ], moleculus_user.prototype, "auth_o_response");
    __decorate([
        (0, typeorm_1.Column)({
            type: "jsonb",
            nullable: true
        })
    ], moleculus_user.prototype, "auth_o_response_decrypted");
    moleculus_user = __decorate([
        (0, typeorm_1.Entity)()
    ], moleculus_user);
    return moleculus_user;
}());
exports.moleculus_user = moleculus_user;
