import { Repository } from "typeorm";
import { moleculus_email_template as EmailEntity } from "../../modules/entities/email-template.entity";
import { CreateEmailTemplateDto } from "../dtos/CreateEmailTemplate.dto";
import { UpdateEmailDto } from "../dtos/UpdateEmailTemplate.dto";
export declare class EmailTemplateService {
    private readonly emailRepository;
    constructor(emailRepository: Repository<EmailEntity>);
    getAllEmailTemplates(): Promise<EmailEntity[]>;
    DeleteEmailTemplates(email_template_id: number): Promise<boolean>;
    getEmailTemplateDetails(email_template_id: number): Promise<false | EmailEntity>;
    create(createEmailTemplateDto: CreateEmailTemplateDto): Promise<boolean>;
    update(updateEmailDto: UpdateEmailDto, email_template_id_: number): Promise<boolean>;
}
