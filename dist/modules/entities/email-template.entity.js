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
exports.moleculus_email_template = exports.page_email_enum = void 0;
const typeorm_1 = require("typeorm");
var page_email_enum;
(function (page_email_enum) {
    page_email_enum["Enable"] = "Enable";
    page_email_enum["Disable"] = "Disable";
})(page_email_enum = exports.page_email_enum || (exports.page_email_enum = {}));
let moleculus_email_template = class moleculus_email_template extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        type: "bigint",
        generated: true,
    }),
    __metadata("design:type", Number)
], moleculus_email_template.prototype, "email_template_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_email_template.prototype, "email_title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 255,
        type: "varchar",
        nullable: true,
        unique: true,
    }),
    __metadata("design:type", String)
], moleculus_email_template.prototype, "email_keyword", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 255,
        type: "varchar",
        nullable: true,
        default: "%  %",
    }),
    __metadata("design:type", String)
], moleculus_email_template.prototype, "email_variable", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_email_template.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_email_template.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: page_email_enum,
        default: page_email_enum.Enable,
    }),
    __metadata("design:type", String)
], moleculus_email_template.prototype, "email_template_status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamptz",
        nullable: true,
    }),
    __metadata("design:type", Date)
], moleculus_email_template.prototype, "created_datetime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_email_template.prototype, "created_ip", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "bigint",
        default: 0,
        nullable: true,
    }),
    __metadata("design:type", Number)
], moleculus_email_template.prototype, "email_country_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_email_template.prototype, "email_state_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        default: false,
    }),
    __metadata("design:type", Boolean)
], moleculus_email_template.prototype, "is_deleted", void 0);
moleculus_email_template = __decorate([
    (0, typeorm_1.Entity)()
], moleculus_email_template);
exports.moleculus_email_template = moleculus_email_template;
//# sourceMappingURL=email-template.entity.js.map