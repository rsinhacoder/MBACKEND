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
exports.moleculus_pages = exports.page_status_enum = void 0;
var typeorm_1 = require("typeorm");
var page_status_enum;
(function (page_status_enum) {
    page_status_enum["Enable"] = "Enable";
    page_status_enum["Disable"] = "Disable";
})(page_status_enum = exports.page_status_enum || (exports.page_status_enum = {}));
var moleculus_pages = /** @class */ (function (_super) {
    __extends(moleculus_pages, _super);
    function moleculus_pages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)({
            type: "bigint",
            generated: true
        })
    ], moleculus_pages.prototype, "pagetitle_id");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_pages.prototype, "pagetitle");
    __decorate([
        (0, typeorm_1.Column)({
            length: 255,
            type: "varchar",
            nullable: true,
            unique: true
        })
    ], moleculus_pages.prototype, "pageKeyWord");
    __decorate([
        (0, typeorm_1.Column)({
            type: "text",
            nullable: true
        })
    ], moleculus_pages.prototype, "description");
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            "enum": page_status_enum,
            "default": page_status_enum.Enable
        })
    ], moleculus_pages.prototype, "page_status");
    __decorate([
        (0, typeorm_1.Column)({
            type: "timestamptz",
            nullable: true
        })
    ], moleculus_pages.prototype, "created_datetime");
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            length: 255,
            nullable: true
        })
    ], moleculus_pages.prototype, "created_ip");
    __decorate([
        (0, typeorm_1.Column)({
            type: "bigint",
            "default": 0,
            nullable: true
        })
    ], moleculus_pages.prototype, "page_country_id");
    __decorate([
        (0, typeorm_1.Column)({
            type: "text",
            nullable: true
        })
    ], moleculus_pages.prototype, "page_state_id");
    __decorate([
        (0, typeorm_1.Column)({
            type: "boolean",
            "default": false
        })
    ], moleculus_pages.prototype, "is_deleted");
    moleculus_pages = __decorate([
        (0, typeorm_1.Entity)()
    ], moleculus_pages);
    return moleculus_pages;
}(typeorm_1.BaseEntity));
exports.moleculus_pages = moleculus_pages;
