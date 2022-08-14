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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagesController = void 0;
const common_1 = require("@nestjs/common");
const CreatePage_dto_1 = require("../../dto/CreatePage.dto");
const pages_service_1 = require("./pages.service");
let PagesController = class PagesController {
    constructor(pagesService) {
        this.pagesService = pagesService;
    }
    async createPage(createPageDto, res) {
        const new_page = await this.pagesService.createPage(createPageDto);
        if (new_page === true) {
            return res.status(200).json({
                code: 200,
                status: "success",
                message: "Page created successfully",
                data: new_page,
            });
        }
        else {
            return res.status(500).json({
                code: 500,
                status: "error",
                message: "Page not created",
                data: null,
            });
        }
    }
    async getPageContentByKeyword(res, pageKeyWord) {
        const page = await this.pagesService.getPageContentByKeyword(pageKeyWord);
        if (page) {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Page found successfully! ",
                data: page,
            });
        }
        else {
            return res.status(500).json({
                code: "500",
                status: "error",
                message: "Error Occured",
                data: null,
            });
        }
    }
    async getPageContentById(res, id) {
        const page = await this.pagesService.getpageContentById(parseInt(id));
        if (page) {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Page found successfully! ",
                data: page,
            });
        }
        else {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured",
                data: null,
            });
        }
    }
    async deletePage(res, id) {
        const delete_result = await this.pagesService.getpageContentById(parseInt(id));
        if (delete_result) {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Page Deleted successfully! ",
                data: null,
            });
        }
        else {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured",
                data: null,
            });
        }
    }
};
__decorate([
    (0, common_1.Post)("create"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePage_dto_1.CreatePageDto, Object]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "createPage", null);
__decorate([
    (0, common_1.Get)("getpage/:pageKeyWord"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("pageKeyWord")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "getPageContentByKeyword", null);
__decorate([
    (0, common_1.Get)("getpage/id/:id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "getPageContentById", null);
__decorate([
    (0, common_1.Delete)("delete/:id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "deletePage", null);
PagesController = __decorate([
    (0, common_1.Controller)("users/pages"),
    __param(0, (0, common_1.Inject)("PAGES_SERVICE")),
    __metadata("design:paramtypes", [pages_service_1.PagesService])
], PagesController);
exports.PagesController = PagesController;
//# sourceMappingURL=pages.controller.js.map