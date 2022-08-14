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
exports.moleculus_index_tokens = exports.page_status_enum = void 0;
const typeorm_1 = require("typeorm");
var page_status_enum;
(function (page_status_enum) {
    page_status_enum["Enable"] = "Enable";
    page_status_enum["Disable"] = "Disable";
})(page_status_enum = exports.page_status_enum || (exports.page_status_enum = {}));
let moleculus_index_tokens = class moleculus_index_tokens extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        type: "bigint",
        generated: true,
    }),
    __metadata("design:type", Number)
], moleculus_index_tokens.prototype, "index_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
        unique: true,
    }),
    __metadata("design:type", String)
], moleculus_index_tokens.prototype, "token_code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_index_tokens.prototype, "index_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 255,
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_index_tokens.prototype, "index_price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_index_tokens.prototype, "index_description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 255,
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_index_tokens.prototype, "index_profit", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 255,
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_index_tokens.prototype, "index_profit_percent", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_index_tokens.prototype, "index_total_value", void 0);
moleculus_index_tokens = __decorate([
    (0, typeorm_1.Entity)()
], moleculus_index_tokens);
exports.moleculus_index_tokens = moleculus_index_tokens;
//# sourceMappingURL=index_tokens.entity.js.map