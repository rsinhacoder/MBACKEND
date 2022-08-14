import { Response } from "express";
import { CreateEmailTemplateDto } from "../dtos/CreateEmailTemplate.dto";
import { UpdateEmailDto } from "../dtos/UpdateEmailTemplate.dto";
import { EmailTemplateService } from "./email-template.service";
export declare class EmailTemplateController {
    private readonly emailTemplateService;
    constructor(emailTemplateService: EmailTemplateService);
    create(res: Response, createEmailTemplateDto: CreateEmailTemplateDto): Promise<Response<any, Record<string, any>>>;
    getAllEmailTemplates(res: Response): Promise<Response<any, Record<string, any>>>;
    DeleteEmailTemplates(res: Response, body: any): Promise<Response<any, Record<string, any>>>;
    viewEmailTemplate(res: Response, body: any): Promise<Response<any, Record<string, any>>>;
    update(email_template_id: string, res: Response, updateEmailDto: UpdateEmailDto): Promise<Response<any, Record<string, any>>>;
}
