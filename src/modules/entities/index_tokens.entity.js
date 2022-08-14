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
exports.moleculus_index_tokens = exports.page_status_enum = void 0;
var typeorm_1 = require("typeorm");
var page_status_enum;
(function (page_status_enum) {
    page_status_enum["Enable"] = "Enable";
    page_status_enum["Disable"] = "Disable";
})(page_status_enum = exports.page_status_enum || (exports.page_status_enum = {}));
var moleculus_index_tokens = /** @class */ (function (_super) {
    __extends(moleculus_index_tokens, _super);
    function moleculus_index_tokens() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)({
            type: "bigint",
            generated: true
        })
    ], moleculus_index_tokens.prototype, "index_id");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true,
            unique: true
        })
    ], moleculus_index_tokens.prototype, "token_code");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_index_tokens.prototype, "index_name");
    __decorate([
        (0, typeorm_1.Column)({
            length: 255,
            type: "varchar",
            nullable: true
        })
    ], moleculus_index_tokens.prototype, "index_price");
    __decorate([
        (0, typeorm_1.Column)({
            type: "text",
            nullable: true
        })
    ], moleculus_index_tokens.prototype, "index_description");
    __decorate([
        (0, typeorm_1.Column)({
            length: 255,
            type: "varchar",
            nullable: true
        })
    ], moleculus_index_tokens.prototype, "index_profit");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_index_tokens.prototype, "index_total_value");
    moleculus_index_tokens = __decorate([
        (0, typeorm_1.Entity)()
    ], moleculus_index_tokens);
    return moleculus_index_tokens;
}(typeorm_1.BaseEntity));
exports.moleculus_index_tokens = moleculus_index_tokens;
