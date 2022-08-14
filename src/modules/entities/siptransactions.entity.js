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
exports.moleculus_sip_transactions = exports.tra_status_enum = void 0;
/* eslint-disable prettier/prettier */
var typeorm_1 = require("typeorm");
var tra_status_enum;
(function (tra_status_enum) {
    tra_status_enum["Pending"] = "Pending";
    tra_status_enum["Completed"] = "Completed";
    tra_status_enum["Failed"] = "Failed";
})(tra_status_enum = exports.tra_status_enum || (exports.tra_status_enum = {}));
var moleculus_sip_transactions = /** @class */ (function (_super) {
    __extends(moleculus_sip_transactions, _super);
    function moleculus_sip_transactions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)({
            type: "bigint",
            generated: true
        })
    ], moleculus_sip_transactions.prototype, "sip_tra_id");
    __decorate([
        (0, typeorm_1.Column)({
            type: "int",
            nullable: true
        })
    ], moleculus_sip_transactions.prototype, "sip_id");
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({
            type: "bigint",
            nullable: true
        })
    ], moleculus_sip_transactions.prototype, "tra_user_id");
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            "default": "",
            nullable: true
        })
    ], moleculus_sip_transactions.prototype, "token_code");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_sip_transactions.prototype, "trasaction_price");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_sip_transactions.prototype, "trasaction_currency");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_sip_transactions.prototype, "token_name");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": tra_status_enum,
            "default": tra_status_enum.Pending
        })
    ], moleculus_sip_transactions.prototype, "tra_status");
    __decorate([
        (0, typeorm_1.Column)({
            type: "timestamptz",
            "default": function () { return "CURRENT_TIMESTAMP"; }
        })
    ], moleculus_sip_transactions.prototype, "created_datetime");
    moleculus_sip_transactions = __decorate([
        (0, typeorm_1.Entity)()
    ], moleculus_sip_transactions);
    return moleculus_sip_transactions;
}(typeorm_1.BaseEntity));
exports.moleculus_sip_transactions = moleculus_sip_transactions;
