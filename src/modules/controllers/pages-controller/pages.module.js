"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PagesModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var pages_entity_1 = require("../../entities/pages.entity");
var pages_service_1 = require("./pages.service");
var pages_controller_1 = require("./pages.controller");
var PagesModule = /** @class */ (function () {
    function PagesModule() {
    }
    PagesModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([pages_entity_1.moleculus_pages])],
            controllers: [pages_controller_1.PagesController],
            providers: [{ provide: "PAGES_SERVICE", useClass: pages_service_1.PagesService }]
        })
    ], PagesModule);
    return PagesModule;
}());
exports.PagesModule = PagesModule;
