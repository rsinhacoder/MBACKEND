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
exports.moleculus_email_template = exports.page_email_enum = void 0;
var typeorm_1 = require("typeorm");
var page_email_enum;
(function (page_email_enum) {
    page_email_enum["Enable"] = "Enable";
    page_email_enum["Disable"] = "Disable";
})(page_email_enum = exports.page_email_enum || (exports.page_email_enum = {}));
var moleculus_email_template = /** @class */ (function (_super) {
    __extends(moleculus_email_template, _super);
    function moleculus_email_template() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)({
            type: "bigint",
            generated: true
        })
    ], moleculus_email_template.prototype, "email_template_id");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_email_template.prototype, "email_title");
    __decorate([
        (0, typeorm_1.Column)({
            length: 255,
            type: "varchar",
            nullable: true,
            unique: true
        })
    ], moleculus_email_template.prototype, "email_keyword");
    __decorate([
        (0, typeorm_1.Column)({
            length: 255,
            type: "varchar",
            nullable: true,
            "default": "%  %"
        })
    ], moleculus_email_template.prototype, "email_variable");
    __decorate([
        (0, typeorm_1.Column)({
            type: "text",
            nullable: true
        })
    ], moleculus_email_template.prototype, "description");
    __decorate([
        (0, typeorm_1.Column)({
            type: "text",
            nullable: true
        })
    ], moleculus_email_template.prototype, "subject");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": page_email_enum,
            "default": page_email_enum.Enable
        })
    ], moleculus_email_template.prototype, "email_template_status");
    __decorate([
        (0, typeorm_1.Column)({
            type: "timestamptz",
            nullable: true
        })
    ], moleculus_email_template.prototype, "created_datetime");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_email_template.prototype, "created_ip");
    __decorate([
        (0, typeorm_1.Column)({
            type: "bigint",
            "default": 0,
            nullable: true
        })
    ], moleculus_email_template.prototype, "email_country_id");
    __decorate([
        (0, typeorm_1.Column)({
            type: "text",
            nullable: true
        })
    ], moleculus_email_template.prototype, "email_state_id");
    __decorate([
        (0, typeorm_1.Column)({
            type: "boolean",
            "default": false
        })
    ], moleculus_email_template.prototype, "is_deleted");
    moleculus_email_template = __decorate([
        (0, typeorm_1.Entity)()
    ], moleculus_email_template);
    return moleculus_email_template;
}(typeorm_1.BaseEntity));
exports.moleculus_email_template = moleculus_email_template;
