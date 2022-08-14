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
exports.moleculus_sip = exports.sip_day_enum = exports.sip_status_enum = void 0;
const typeorm_1 = require("typeorm");
var sip_status_enum;
(function (sip_status_enum) {
    sip_status_enum["Active"] = "Active";
    sip_status_enum["Pause"] = "Pause";
    sip_status_enum["Cancel"] = "Cancel";
})(sip_status_enum = exports.sip_status_enum || (exports.sip_status_enum = {}));
var sip_day_enum;
(function (sip_day_enum) {
    sip_day_enum["Daily"] = "Daily";
    sip_day_enum["Weekly"] = "Weekly";
    sip_day_enum["Monthly"] = "Monthly";
    sip_day_enum["Bimonthly"] = "Bimonthly";
})(sip_day_enum = exports.sip_day_enum || (exports.sip_day_enum = {}));
let moleculus_sip = class moleculus_sip extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        type: "bigint",
        generated: true,
    }),
    __metadata("design:type", Number)
], moleculus_sip.prototype, "user_sip_id", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({
        type: "int",
        nullable: true,
    }),
    __metadata("design:type", Number)
], moleculus_sip.prototype, "sip_user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_sip.prototype, "token_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_sip.prototype, "token_price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_sip.prototype, "token_code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_sip.prototype, "token_current_price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: sip_day_enum,
        default: sip_day_enum.Bimonthly,
    }),
    __metadata("design:type", String)
], moleculus_sip.prototype, "sip_day", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: sip_status_enum,
        default: sip_status_enum.Active,
    }),
    __metadata("design:type", String)
], moleculus_sip.prototype, "sip_status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_sip.prototype, "sip_comment", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamptz",
        nullable: true,
    }),
    __metadata("design:type", Date)
], moleculus_sip.prototype, "sip_start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamptz",
        nullable: true,
    }),
    __metadata("design:type", Date)
], moleculus_sip.prototype, "sip_end_date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamptz",
        nullable: true,
    }),
    __metadata("design:type", Date)
], moleculus_sip.prototype, "sip_next_date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        nullable: true,
    }),
    __metadata("design:type", Number)
], moleculus_sip.prototype, "sip_bank_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], moleculus_sip.prototype, "created_datetime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_sip.prototype, "created_ip", void 0);
moleculus_sip = __decorate([
    (0, typeorm_1.Entity)()
], moleculus_sip);
exports.moleculus_sip = moleculus_sip;
//# sourceMappingURL=sip.entity.js.map