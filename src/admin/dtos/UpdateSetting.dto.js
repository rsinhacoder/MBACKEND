"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateSettingsDto = void 0;
var class_validator_1 = require("class-validator");
var UpdateSettingsDto = /** @class */ (function () {
    function UpdateSettingsDto() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)()
    ], UpdateSettingsDto.prototype, "setting_id");
    __decorate([
        (0, class_validator_1.IsString)()
    ], UpdateSettingsDto.prototype, "setting_value");
    return UpdateSettingsDto;
}());
exports.UpdateSettingsDto = UpdateSettingsDto;
