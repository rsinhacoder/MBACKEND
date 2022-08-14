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
exports.moleculus_user_kyc = exports.kyc_status_enum = void 0;
const typeorm_1 = require("typeorm");
var kyc_status_enum;
(function (kyc_status_enum) {
    kyc_status_enum["Pending"] = "Pending";
    kyc_status_enum["Rejected"] = "Rejected";
    kyc_status_enum["Completed"] = "Completed";
})(kyc_status_enum = exports.kyc_status_enum || (exports.kyc_status_enum = {}));
let moleculus_user_kyc = class moleculus_user_kyc extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        type: "bigint",
        generated: true,
    }),
    __metadata("design:type", Number)
], moleculus_user_kyc.prototype, "kyc_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_user_kyc.prototype, "acknowledgement_number", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_user_kyc.prototype, "vendor_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_user_kyc.prototype, "previous_status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "bigint",
        nullable: true,
    }),
    __metadata("design:type", Number)
], moleculus_user_kyc.prototype, "kyc_user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_user_kyc.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_user_kyc.prototype, "api_repsonse", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: kyc_status_enum,
        default: kyc_status_enum.Pending,
    }),
    __metadata("design:type", String)
], moleculus_user_kyc.prototype, "kyc_status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamptz",
        nullable: true,
    }),
    __metadata("design:type", Date)
], moleculus_user_kyc.prototype, "created_datetime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_user_kyc.prototype, "created_ip", void 0);
moleculus_user_kyc = __decorate([
    (0, typeorm_1.Entity)()
], moleculus_user_kyc);
exports.moleculus_user_kyc = moleculus_user_kyc;
//# sourceMappingURL=userKYC.entity.js.map