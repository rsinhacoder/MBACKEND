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
const CreatePage_dto_1 = require("../../modules/dto/CreatePage.dto");
const common_1 = require("@nestjs/common");
const pages_service_1 = require("./pages.service");
const Update_page_dto_1 = require("../dtos/Update-page.dto");
let PagesController = class PagesController {
    constructor(pageService) {
        this.pageService = pageService;
    }
    async create(res, createPageDto) {
        const result = await this.pageService.create(createPageDto);
        if (!result || result === null || result === undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured in Creating Page",
                data: null,
            });
        }
        return res.status(200).json({
            code: "200",
            status: "success",
            message: "Page Created Successfully",
            data: {},
        });
    }
    async update(pagetitle_id, res, updatePageDto) {
        const result = await this.pageService.update(updatePageDto, pagetitle_id);
        if (!result || result === null || result === undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured ",
                data: null,
            });
        }
        return res.status(200).json({
            code: "200",
            status: "success",
            message: "Page Updated Successfully",
            data: {},
        });
    }
};
__decorate([
    (0, common_1.Post)("create"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreatePage_dto_1.CreatePageDto]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Update_page_dto_1.UpdatePageDto]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "update", null);
PagesController = __decorate([
    (0, common_1.Controller)("admin/pages"),
    __param(0, (0, common_1.Inject)("PAGE_SERVICE")),
    __metadata("design:paramtypes", [pages_service_1.PageService])
], PagesController);
exports.PagesController = PagesController;
//# sourceMappingURL=pages.controller.js.map