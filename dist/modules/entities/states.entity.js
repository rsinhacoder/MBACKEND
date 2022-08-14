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
exports.moleculus_states = exports.Login_log_enum = void 0;
const typeorm_1 = require("typeorm");
var Login_log_enum;
(function (Login_log_enum) {
    Login_log_enum["Enable"] = "Enable";
    Login_log_enum["Disable"] = "Disable";
})(Login_log_enum = exports.Login_log_enum || (exports.Login_log_enum = {}));
let moleculus_states = class moleculus_states extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        type: "bigint",
        generated: true,
    }),
    __metadata("design:type", Number)
], moleculus_states.prototype, "pk_state_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_states.prototype, "state_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], moleculus_states.prototype, "state_abbreviation", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        nullable: true,
    }),
    __metadata("design:type", Number)
], moleculus_states.prototype, "state_country_id", void 0);
moleculus_states = __decorate([
    (0, typeorm_1.Entity)()
], moleculus_states);
exports.moleculus_states = moleculus_states;
//# sourceMappingURL=states.entity.js.map