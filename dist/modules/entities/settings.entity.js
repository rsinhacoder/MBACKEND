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
exports.moleculus_settings = exports.setting_status_enum = void 0;
const typeorm_1 = require("typeorm");
var setting_status_enum;
(function (setting_status_enum) {
    setting_status_enum["Enable"] = "Enable";
    setting_status_enum["Disable"] = "Disable";
})(setting_status_enum = exports.setting_status_enum || (exports.setting_status_enum = {}));
let moleculus_settings = class moleculus_settings extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        type: "bigint",
        generated: true,
    }),
    __metadata("design:type", Number)
], moleculus_settings.prototype, "setting_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        default: "",
    }),
    __metadata("design:type", String)
], moleculus_settings.prototype, "setting_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        default: "",
    }),
    __metadata("design:type", String)
], moleculus_settings.prototype, "setting_value", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: setting_status_enum,
        default: setting_status_enum.Enable,
    }),
    __metadata("design:type", String)
], moleculus_settings.prototype, "setting_status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: "timestamp",
        nullable: true,
    }),
    __metadata("design:type", Date)
], moleculus_settings.prototype, "created_datetime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_settings.prototype, "setting_keyword", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        default: "",
    }),
    __metadata("design:type", String)
], moleculus_settings.prototype, "created_ip", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        default: false,
    }),
    __metadata("design:type", Boolean)
], moleculus_settings.prototype, "is_deleted", void 0);
moleculus_settings = __decorate([
    (0, typeorm_1.Entity)()
], moleculus_settings);
exports.moleculus_settings = moleculus_settings;
//# sourceMappingURL=settings.entity.js.map