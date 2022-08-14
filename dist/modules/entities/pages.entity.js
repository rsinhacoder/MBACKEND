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
exports.moleculus_pages = exports.page_status_enum = void 0;
const typeorm_1 = require("typeorm");
var page_status_enum;
(function (page_status_enum) {
    page_status_enum["Enable"] = "Enable";
    page_status_enum["Disable"] = "Disable";
})(page_status_enum = exports.page_status_enum || (exports.page_status_enum = {}));
let moleculus_pages = class moleculus_pages extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        type: "bigint",
        generated: true,
    }),
    __metadata("design:type", Number)
], moleculus_pages.prototype, "pagetitle_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_pages.prototype, "pagetitle", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 255,
        type: "varchar",
        nullable: true,
        unique: true,
    }),
    __metadata("design:type", String)
], moleculus_pages.prototype, "pageKeyWord", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_pages.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: page_status_enum,
        default: page_status_enum.Enable,
    }),
    __metadata("design:type", String)
], moleculus_pages.prototype, "page_status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamptz",
        nullable: true,
    }),
    __metadata("design:type", Date)
], moleculus_pages.prototype, "created_datetime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_pages.prototype, "created_ip", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "bigint",
        default: 0,
        nullable: true,
    }),
    __metadata("design:type", Number)
], moleculus_pages.prototype, "page_country_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_pages.prototype, "page_state_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        default: false,
    }),
    __metadata("design:type", Boolean)
], moleculus_pages.prototype, "is_deleted", void 0);
moleculus_pages = __decorate([
    (0, typeorm_1.Entity)()
], moleculus_pages);
exports.moleculus_pages = moleculus_pages;
//# sourceMappingURL=pages.entity.js.map