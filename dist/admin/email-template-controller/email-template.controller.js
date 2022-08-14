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
exports.EmailTemplateController = void 0;
const common_1 = require("@nestjs/common");
const CreateEmailTemplate_dto_1 = require("../dtos/CreateEmailTemplate.dto");
const UpdateEmailTemplate_dto_1 = require("../dtos/UpdateEmailTemplate.dto");
const email_template_service_1 = require("./email-template.service");
let EmailTemplateController = class EmailTemplateController {
    constructor(emailTemplateService) {
        this.emailTemplateService = emailTemplateService;
    }
    async create(res, createEmailTemplateDto) {
        common_1.Logger.log(createEmailTemplateDto, "EmailTemplateService");
        const result = await this.emailTemplateService.create(createEmailTemplateDto);
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
            message: "Email-Template Created Successfully",
            data: null,
        });
    }
    async getAllEmailTemplates(res) {
        const email_templates = await this.emailTemplateService.getAllEmailTemplates();
        if (!email_templates ||
            email_templates == null ||
            email_templates == undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, No Email templates Found ",
                data: [],
            });
        }
        else {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Email templates Found Successfully",
                data: email_templates,
            });
        }
    }
    async DeleteEmailTemplates(res, body) {
        const email_template_id = body.email_template_id;
        const deleted_email = await this.emailTemplateService.DeleteEmailTemplates(parseInt(email_template_id));
        if (!deleted_email ||
            deleted_email === null ||
            deleted_email === undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured ",
                data: [],
            });
        }
        else {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Email-Template Deleted Successfully",
                data: [],
            });
        }
    }
    async viewEmailTemplate(res, body) {
        const email_template_id = body.email_template_id;
        const result = await this.emailTemplateService.getEmailTemplateDetails(parseInt(email_template_id));
        if (!result || result == null || result == undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, No such email template found",
                data: [],
            });
        }
        else {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Email-Template Found Successfully",
                data: result,
            });
        }
    }
    async update(email_template_id, res, updateEmailDto) {
        const email_template_id_ = parseInt(email_template_id);
        const result = await this.emailTemplateService.update(updateEmailDto, email_template_id_);
        if (!result || result === null || result === undefined) {
            common_1.Logger.log("No such email-template found");
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
            message: "Email-template Updated Successfully",
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
    __metadata("design:paramtypes", [Object, CreateEmailTemplate_dto_1.CreateEmailTemplateDto]),
    __metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("/getalltemplates"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "getAllEmailTemplates", null);
__decorate([
    (0, common_1.Post)("/delete"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "DeleteEmailTemplates", null);
__decorate([
    (0, common_1.Post)("/viewemailtemplate"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "viewEmailTemplate", null);
__decorate([
    (0, common_1.Put)("update/:id"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, UpdateEmailTemplate_dto_1.UpdateEmailDto]),
    __metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "update", null);
EmailTemplateController = __decorate([
    (0, common_1.Controller)("admin/email-template"),
    __param(0, (0, common_1.Inject)("EMAIL_TEMPLATE_SERVICE")),
    __metadata("design:paramtypes", [email_template_service_1.EmailTemplateService])
], EmailTemplateController);
exports.EmailTemplateController = EmailTemplateController;
//# sourceMappingURL=email-template.controller.js.map