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
exports.moleculus_admin = exports.google_auth_enabled_Enum = void 0;
const typeorm_1 = require("typeorm");
var google_auth_enabled_Enum;
(function (google_auth_enabled_Enum) {
    google_auth_enabled_Enum["Enable"] = "Enable";
    google_auth_enabled_Enum["Disable"] = "Disable";
})(google_auth_enabled_Enum = exports.google_auth_enabled_Enum || (exports.google_auth_enabled_Enum = {}));
let moleculus_admin = class moleculus_admin extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        type: "bigint",
        generated: true,
    }),
    __metadata("design:type", Number)
], moleculus_admin.prototype, "admin_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        default: "",
    }),
    __metadata("design:type", String)
], moleculus_admin.prototype, "google_auth_code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: google_auth_enabled_Enum,
        default: google_auth_enabled_Enum.Disable,
    }),
    __metadata("design:type", String)
], moleculus_admin.prototype, "google_auth_enabled", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "jsonb",
        nullable: true,
    }),
    __metadata("design:type", Object)
], moleculus_admin.prototype, "temp_secret", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_admin.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 255,
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_admin.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 255,
        type: "varchar",
        unique: true,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_admin.prototype, "email_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 512,
        type: "varchar",
        nullable: false,
    }),
    __metadata("design:type", String)
], moleculus_admin.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 255,
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_admin.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamptz",
        nullable: true,
    }),
    __metadata("design:type", Date)
], moleculus_admin.prototype, "created_datetime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_admin.prototype, "created_ip", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_admin.prototype, "admin_profile", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_admin.prototype, "admin_slug", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        default: true,
    }),
    __metadata("design:type", Boolean)
], moleculus_admin.prototype, "super_admin_role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        default: false,
    }),
    __metadata("design:type", Boolean)
], moleculus_admin.prototype, "is_deleted", void 0);
moleculus_admin = __decorate([
    (0, typeorm_1.Entity)()
], moleculus_admin);
exports.moleculus_admin = moleculus_admin;
//# sourceMappingURL=admin.entity.js.map