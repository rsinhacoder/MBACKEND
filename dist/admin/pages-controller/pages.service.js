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
exports.PageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const axios_1 = require("axios");
const typeorm_2 = require("typeorm");
const pages_entity_1 = require("../../modules/entities/pages.entity");
require("dotenv").config({ debug: false });
let PageService = class PageService {
    constructor(pagesRepository) {
        this.pagesRepository = pagesRepository;
    }
    async create(createPageDto) {
        try {
            const new_page = this.pagesRepository.create(createPageDto);
            new_page.created_datetime = new Date();
            const req_data = await axios_1.default
                .get("https://ipinfo.io")
                .then((res) => res.data);
            new_page.created_ip = req_data.ip;
            new_page.description = createPageDto.description;
            new_page.pagetitle = createPageDto.pagetitle;
            await this.pagesRepository.save(new_page);
            common_1.Logger.log(`Page Created Successfully`, "PageService");
            return true;
        }
        catch (error) {
            common_1.Logger.error(error);
            return false;
        }
    }
    async update(updatePageDto, pagetitle_id) {
        try {
            const pagetitle_id_ = parseInt(pagetitle_id);
            const page = await this.pagesRepository.findOne({
                where: { pagetitle_id: pagetitle_id_ },
            });
            if (page) {
                page.pagetitle = updatePageDto.pagetitle;
                page.description = updatePageDto.description;
                await this.pagesRepository.save(page);
                common_1.Logger.log(`Page Updated Successfully`, "PageService");
                return true;
            }
        }
        catch (error) {
            common_1.Logger.error(error);
            return false;
        }
    }
};
PageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pages_entity_1.moleculus_pages)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PageService);
exports.PageService = PageService;
//# sourceMappingURL=pages.service.js.map