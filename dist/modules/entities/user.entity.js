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
exports.moleculus_user = exports.user_login_type_Enum = exports.google_auth_enabled_Enum = exports.biometric_Enum = exports.dark_mode_Enum = exports.is_deleted_Enum = exports.status_Enum = exports.is_phone_verified_Enum = exports.document_Type_Enum = exports.is_email_verified_Enum = void 0;
const typeorm_1 = require("typeorm");
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
let moleculus_user = class moleculus_user {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: "bigint",
    }),
    __metadata("design:type", Number)
], moleculus_user.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 512, nullable: true }),
    __metadata("design:type", String)
], moleculus_user.prototype, "legalname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], moleculus_user.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], moleculus_user.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
        unique: true,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "email_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], moleculus_user.prototype, "temp_email_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        default: null,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "country_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        nullable: true,
    }),
    __metadata("design:type", Number)
], moleculus_user.prototype, "country_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "state_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "phone_code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "email_token", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
        default: "123456",
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "otp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "bigint",
        nullable: true,
    }),
    __metadata("design:type", Number)
], moleculus_user.prototype, "otp_creation_time", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: is_email_verified_Enum,
        default: is_email_verified_Enum.No,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "is_email_verify", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: is_phone_verified_Enum,
        default: is_phone_verified_Enum.No,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "is_phone_verify", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: document_Type_Enum,
        default: document_Type_Enum.SSN,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "document_type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "document_value", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        default: null,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "dob", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        default: null,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "tin", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        default: null,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "ssn", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        default: null,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "citizenship", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        default: null,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        default: null,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "zipcode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        default: null,
    }),
    __metadata("design:type", Number)
], moleculus_user.prototype, "wallet_balance", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: status_Enum,
        default: status_Enum.Enable,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: is_deleted_Enum,
        default: is_deleted_Enum.No,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        default: "USD",
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "default_currency", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "smallint",
        default: 0,
    }),
    __metadata("design:type", Number)
], moleculus_user.prototype, "isSignupFilled", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "smallint",
        default: 0,
    }),
    __metadata("design:type", Number)
], moleculus_user.prototype, "isPersonalFilled", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "smallint",
        default: 0,
    }),
    __metadata("design:type", Number)
], moleculus_user.prototype, "isAddressFilled", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: dark_mode_Enum,
        default: dark_mode_Enum.Off,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "dark_mode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: biometric_Enum,
        default: biometric_Enum.Off,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "biometric", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        default: null,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "passcode", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], moleculus_user.prototype, "created_datetime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        default: null,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "created_ip", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        nullable: true,
    }),
    __metadata("design:type", Date)
], moleculus_user.prototype, "modified_datetime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        default: null,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "modified_ip", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        default: null,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "google_auth_code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: google_auth_enabled_Enum,
        default: google_auth_enabled_Enum.Disable,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "google_auth_enabled", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: user_login_type_Enum,
        default: user_login_type_Enum.Normal,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "user_login_type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        default: null,
    }),
    __metadata("design:type", String)
], moleculus_user.prototype, "secondary_email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "jsonb",
        nullable: true,
    }),
    __metadata("design:type", Object)
], moleculus_user.prototype, "temp_secret", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "jsonb",
        nullable: true,
    }),
    __metadata("design:type", Object)
], moleculus_user.prototype, "auth_o_response", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "jsonb",
        nullable: true,
    }),
    __metadata("design:type", Object)
], moleculus_user.prototype, "auth_o_response_decrypted", void 0);
moleculus_user = __decorate([
    (0, typeorm_1.Entity)()
], moleculus_user);
exports.moleculus_user = moleculus_user;
//# sourceMappingURL=user.entity.js.map