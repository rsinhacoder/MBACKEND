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
exports.moleculus_states = exports.Login_log_enum = void 0;
/* eslint-disable prettier/prettier */
var typeorm_1 = require("typeorm");
var Login_log_enum;
(function (Login_log_enum) {
    Login_log_enum["Enable"] = "Enable";
    Login_log_enum["Disable"] = "Disable";
})(Login_log_enum = exports.Login_log_enum || (exports.Login_log_enum = {}));
var moleculus_states = /** @class */ (function (_super) {
    __extends(moleculus_states, _super);
    function moleculus_states() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)({
            type: "bigint",
            generated: true
        })
    ], moleculus_states.prototype, "pk_state_id");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_states.prototype, "state_name");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_states.prototype, "state_abbreviation");
    __decorate([
        (0, typeorm_1.Column)({
            type: "int",
            nullable: true
        })
    ], moleculus_states.prototype, "state_country_id");
    moleculus_states = __decorate([
        (0, typeorm_1.Entity)()
    ], moleculus_states);
    return moleculus_states;
}(typeorm_1.BaseEntity));
exports.moleculus_states = moleculus_states;
