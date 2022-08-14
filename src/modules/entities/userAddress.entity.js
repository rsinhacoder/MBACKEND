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
exports.moleculus_user_address = void 0;
var typeorm_1 = require("typeorm");
var moleculus_user_address = /** @class */ (function (_super) {
    __extends(moleculus_user_address, _super);
    function moleculus_user_address() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)({
            type: "bigint",
            generated: true
        })
    ], moleculus_user_address.prototype, "address_id");
    __decorate([
        (0, typeorm_1.Column)({
            type: "bigint",
            nullable: true
        })
    ], moleculus_user_address.prototype, "user_address_id");
    __decorate([
        (0, typeorm_1.Column)({
            type: "text",
            nullable: true
        })
    ], moleculus_user_address.prototype, "address_line1");
    __decorate([
        (0, typeorm_1.Column)({
            type: "text",
            nullable: true
        })
    ], moleculus_user_address.prototype, "address_line2");
    __decorate([
        (0, typeorm_1.Column)({
            type: "text",
            nullable: true
        })
    ], moleculus_user_address.prototype, "other_info");
    __decorate([
        (0, typeorm_1.Column)({
            type: "timestamptz",
            nullable: true
        })
    ], moleculus_user_address.prototype, "created_datetime");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            "default": ""
        })
    ], moleculus_user_address.prototype, "created_ip");
    moleculus_user_address = __decorate([
        (0, typeorm_1.Entity)()
    ], moleculus_user_address);
    return moleculus_user_address;
}(typeorm_1.BaseEntity));
exports.moleculus_user_address = moleculus_user_address;
