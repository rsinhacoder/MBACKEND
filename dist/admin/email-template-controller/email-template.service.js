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
exports.EmailTemplateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const axios_1 = require("axios");
const typeorm_2 = require("typeorm");
const email_template_entity_1 = require("../../modules/entities/email-template.entity");
require("dotenv").config({ debug: false });
let EmailTemplateService = class EmailTemplateService {
    constructor(emailRepository) {
        this.emailRepository = emailRepository;
    }
    async getAllEmailTemplates() {
        const emails = await this.emailRepository.find({
            where: { is_deleted: false },
            order: { email_template_id: "DESC" },
        });
        if (!emails || emails == null || emails == undefined) {
            return null;
        }
        else {
            return emails;
        }
    }
    async DeleteEmailTemplates(email_template_id) {
        const email = await this.emailRepository.findOne({
            where: { email_template_id: email_template_id },
        });
        if (!email || email == null || email == undefined) {
            return null;
        }
        else {
            email.is_deleted = true;
            await this.emailRepository.save(email);
            return true;
        }
    }
    async getEmailTemplateDetails(email_template_id) {
        try {
            const email_template_details = await this.emailRepository.findOne({
                where: { email_template_id: email_template_id, is_deleted: false },
            });
            if (!email_template_details || email_template_details === null) {
                common_1.Logger.error(`Email Template Not Found`, "PageService");
                return false;
            }
            else {
                return email_template_details;
            }
        }
        catch (error) {
            common_1.Logger.error(error);
            return false;
        }
    }
    async create(createEmailTemplateDto) {
        try {
            const new_page = this.emailRepository.create(createEmailTemplateDto);
            new_page.created_datetime = new Date();
            const req_data = await axios_1.default
                .get("https://ipinfo.io")
                .then((res) => res.data)
                .catch((err) => {
                req_data: "";
            });
            new_page.created_ip = req_data.ip || "";
            new_page.email_title = createEmailTemplateDto.email_title;
            new_page.description = createEmailTemplateDto.description;
            new_page.email_keyword = createEmailTemplateDto.email_keyword;
            new_page.email_variable = createEmailTemplateDto.email_variable;
            new_page.subject = createEmailTemplateDto.subject;
            await this.emailRepository.save(new_page);
            common_1.Logger.log(`Email Template Successfully`, "PageService");
            return true;
        }
        catch (error) {
            common_1.Logger.error(error);
            return false;
        }
    }
    async update(updateEmailDto, email_template_id_) {
        try {
            const update_page = await this.emailRepository.findOne({
                where: { email_template_id: email_template_id_ },
            });
            if (!update_page || update_page === null || update_page === undefined) {
                common_1.Logger.error(`Email Template Not Found`, "PageService");
                return false;
            }
            else {
                update_page.email_title = updateEmailDto.email_title;
                update_page.description = updateEmailDto.description;
                update_page.subject = updateEmailDto.subject;
                await this.emailRepository.save(update_page);
                return true;
            }
        }
        catch (error) {
            common_1.Logger.error(error);
            return false;
        }
    }
};
EmailTemplateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(email_template_entity_1.moleculus_email_template)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmailTemplateService);
exports.EmailTemplateService = EmailTemplateService;
//# sourceMappingURL=email-template.service.js.map