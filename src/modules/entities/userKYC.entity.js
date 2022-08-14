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
exports.moleculus_user_kyc = exports.kyc_status_enum = void 0;
/* eslint-disable prettier/prettier */
var typeorm_1 = require("typeorm");
var kyc_status_enum;
(function (kyc_status_enum) {
    kyc_status_enum["Pending"] = "Pending";
    kyc_status_enum["Rejected"] = "Rejected";
    kyc_status_enum["Completed"] = "Completed";
})(kyc_status_enum = exports.kyc_status_enum || (exports.kyc_status_enum = {}));
var moleculus_user_kyc = /** @class */ (function (_super) {
    __extends(moleculus_user_kyc, _super);
    function moleculus_user_kyc() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)({
            type: "bigint",
            generated: true
        })
    ], moleculus_user_kyc.prototype, "kyc_id");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_user_kyc.prototype, "acknowledgement_number");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_user_kyc.prototype, "vendor_id");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_user_kyc.prototype, "previous_status");
    __decorate([
        (0, typeorm_1.Column)({
            type: "bigint",
            nullable: true
        })
    ], moleculus_user_kyc.prototype, "kyc_user_id");
    __decorate([
        (0, typeorm_1.Column)({
            type: "text",
            nullable: true
        })
    ], moleculus_user_kyc.prototype, "token");
    __decorate([
        (0, typeorm_1.Column)({
            type: "text",
            nullable: true
        })
    ], moleculus_user_kyc.prototype, "api_repsonse");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": kyc_status_enum,
            "default": kyc_status_enum.Pending
        })
    ], moleculus_user_kyc.prototype, "kyc_status");
    __decorate([
        (0, typeorm_1.Column)({
            type: "timestamptz",
            nullable: true
        })
    ], moleculus_user_kyc.prototype, "created_datetime");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_user_kyc.prototype, "created_ip");
    moleculus_user_kyc = __decorate([
        (0, typeorm_1.Entity)()
    ], moleculus_user_kyc);
    return moleculus_user_kyc;
}(typeorm_1.BaseEntity));
exports.moleculus_user_kyc = moleculus_user_kyc;
