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
exports.moleculus_sip_transactions = exports.tra_status_enum = void 0;
const typeorm_1 = require("typeorm");
var tra_status_enum;
(function (tra_status_enum) {
    tra_status_enum["Pending"] = "Pending";
    tra_status_enum["Completed"] = "Completed";
    tra_status_enum["Failed"] = "Failed";
})(tra_status_enum = exports.tra_status_enum || (exports.tra_status_enum = {}));
let moleculus_sip_transactions = class moleculus_sip_transactions extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        type: "bigint",
        generated: true,
    }),
    __metadata("design:type", Number)
], moleculus_sip_transactions.prototype, "sip_tra_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        nullable: true,
    }),
    __metadata("design:type", Number)
], moleculus_sip_transactions.prototype, "sip_id", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({
        type: "bigint",
        nullable: true,
    }),
    __metadata("design:type", Number)
], moleculus_sip_transactions.prototype, "tra_user_id", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        default: "",
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_sip_transactions.prototype, "token_code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_sip_transactions.prototype, "trasaction_price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_sip_transactions.prototype, "trasaction_currency", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_sip_transactions.prototype, "token_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: tra_status_enum,
        default: tra_status_enum.Pending,
    }),
    __metadata("design:type", String)
], moleculus_sip_transactions.prototype, "tra_status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], moleculus_sip_transactions.prototype, "created_datetime", void 0);
moleculus_sip_transactions = __decorate([
    (0, typeorm_1.Entity)()
], moleculus_sip_transactions);
exports.moleculus_sip_transactions = moleculus_sip_transactions;
//# sourceMappingURL=siptransactions.entity.js.map