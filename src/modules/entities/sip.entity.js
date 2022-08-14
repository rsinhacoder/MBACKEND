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
exports.moleculus_sip = exports.sip_day_enum = exports.sip_status_enum = void 0;
/* eslint-disable prettier/prettier */
var typeorm_1 = require("typeorm");
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
var moleculus_sip = /** @class */ (function (_super) {
    __extends(moleculus_sip, _super);
    function moleculus_sip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)({
            type: "bigint",
            generated: true
        })
    ], moleculus_sip.prototype, "user_sip_id");
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({
            type: "int",
            nullable: true
        })
    ], moleculus_sip.prototype, "sip_user_id");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_sip.prototype, "token_name");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_sip.prototype, "token_price");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_sip.prototype, "token_code");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_sip.prototype, "token_current_price");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": sip_day_enum,
            "default": sip_day_enum.Bimonthly
        })
    ], moleculus_sip.prototype, "sip_day");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": sip_status_enum,
            "default": sip_status_enum.Active
        })
    ], moleculus_sip.prototype, "sip_status");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_sip.prototype, "sip_comment");
    __decorate([
        (0, typeorm_1.Column)({
            type: "timestamptz",
            nullable: true
        })
    ], moleculus_sip.prototype, "sip_start_date");
    __decorate([
        (0, typeorm_1.Column)({
            type: "timestamptz",
            nullable: true
        })
    ], moleculus_sip.prototype, "sip_end_date");
    __decorate([
        (0, typeorm_1.Column)({
            type: "timestamptz",
            nullable: true
        })
    ], moleculus_sip.prototype, "sip_next_date");
    __decorate([
        (0, typeorm_1.Column)({
            type: "int",
            nullable: true
        })
    ], moleculus_sip.prototype, "sip_bank_id");
    __decorate([
        (0, typeorm_1.Column)({
            type: "timestamptz",
            "default": function () { return "CURRENT_TIMESTAMP"; }
        })
    ], moleculus_sip.prototype, "created_datetime");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_sip.prototype, "created_ip");
    moleculus_sip = __decorate([
        (0, typeorm_1.Entity)()
    ], moleculus_sip);
    return moleculus_sip;
}(typeorm_1.BaseEntity));
exports.moleculus_sip = moleculus_sip;
