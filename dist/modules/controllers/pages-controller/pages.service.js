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
exports.PagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const axios_1 = require("axios");
const pages_entity_1 = require("../../entities/pages.entity");
let PagesService = class PagesService {
    constructor(settingRepository) {
        this.settingRepository = settingRepository;
    }
    async createPage(createPageDto) {
        try {
            const new_page = this.settingRepository.create(createPageDto);
            new_page.created_datetime = new Date();
            const req_data = await axios_1.default
                .get("https://ipinfo.io")
                .then((res) => res.data);
            new_page.created_ip = req_data.ip;
            new_page.description = createPageDto.description;
            await this.settingRepository.save(new_page);
            return true;
        }
        catch (e) {
            common_1.Logger.log(e);
            return e.detail;
        }
    }
    async getPageContentByKeyword(pageKeyWord) {
        try {
            const page = await this.settingRepository.find({
                where: { pageKeyWord: pageKeyWord },
            });
            if (page) {
                return page;
            }
        }
        catch (e) {
            common_1.Logger.log(e);
            return null;
        }
    }
    async getpageContentById(id) {
        try {
            const page = await this.settingRepository.find({
                where: { pagetitle_id: id },
            });
            if (page) {
                return page;
            }
        }
        catch (err) {
            common_1.Logger.log(err);
            return null;
        }
    }
    async deletePageById(id) {
        try {
            const page = await this.settingRepository.findOne({
                where: { pagetitle_id: id },
            });
            if (page) {
                page.is_deleted = true;
                return true;
            }
        }
        catch (err) {
            common_1.Logger.log(err);
            return false;
        }
    }
};
PagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pages_entity_1.moleculus_pages)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PagesService);
exports.PagesService = PagesService;
//# sourceMappingURL=pages.service.js.map