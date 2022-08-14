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
exports.moleculus_login_log = exports.Login_log_enum = void 0;
const typeorm_1 = require("typeorm");
var Login_log_enum;
(function (Login_log_enum) {
    Login_log_enum["Enable"] = "Enable";
    Login_log_enum["Disable"] = "Disable";
})(Login_log_enum = exports.Login_log_enum || (exports.Login_log_enum = {}));
let moleculus_login_log = class moleculus_login_log extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        type: "bigint",
        generated: true,
    }),
    __metadata("design:type", Number)
], moleculus_login_log.prototype, "login_log_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_login_log.prototype, "logged_user_country_of_login", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_login_log.prototype, "logged_user_email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_login_log.prototype, "logged_user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_login_log.prototype, "logged_user_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_login_log.prototype, "logged_user_ip", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: Login_log_enum,
        default: Login_log_enum.Enable,
    }),
    __metadata("design:type", String)
], moleculus_login_log.prototype, "setting_status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: "timestamp",
        nullable: true,
    }),
    __metadata("design:type", Date)
], moleculus_login_log.prototype, "log_in_datetime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        nullable: true,
    }),
    __metadata("design:type", Date)
], moleculus_login_log.prototype, "log_out_datetime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        default: false,
    }),
    __metadata("design:type", Boolean)
], moleculus_login_log.prototype, "is_login_log_deleted", void 0);
moleculus_login_log = __decorate([
    (0, typeorm_1.Entity)()
], moleculus_login_log);
exports.moleculus_login_log = moleculus_login_log;
//# sourceMappingURL=loginLog.entity.js.map