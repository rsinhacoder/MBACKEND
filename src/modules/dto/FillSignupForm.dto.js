"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FillSignUpFormDto = void 0;
// This DTO is used during signup
var class_validator_1 = require("class-validator");
var FillSignUpFormDto = /** @class */ (function () {
    function FillSignUpFormDto() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)()
    ], FillSignUpFormDto.prototype, "first_name");
    __decorate([
        (0, class_validator_1.IsNotEmpty)()
    ], FillSignUpFormDto.prototype, "last_name");
    __decorate([
        (0, class_validator_1.IsNotEmpty)()
    ], FillSignUpFormDto.prototype, "country");
    __decorate([
        (0, class_validator_1.IsNotEmpty)()
    ], FillSignUpFormDto.prototype, "user_id");
    return FillSignUpFormDto;
}());
exports.FillSignUpFormDto = FillSignUpFormDto;
