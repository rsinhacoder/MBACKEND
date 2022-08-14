import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";
import { Repository } from "typeorm";
import { moleculus_email_template as EmailEntity } from "../../modules/entities/email-template.entity";
import { CreateEmailTemplateDto } from "../dtos/CreateEmailTemplate.dto";
import { UpdateEmailDto } from "../dtos/UpdateEmailTemplate.dto";
require("dotenv").config({ debug: false });
@Injectable()
export class EmailTemplateService {
  constructor(
    @InjectRepository(EmailEntity)
    private readonly emailRepository: Repository<EmailEntity>
  ) {}

  async getAllEmailTemplates() {
    const emails = await this.emailRepository.find({
      where: { is_deleted: false },
      order: { email_template_id: "DESC" },
    });
    if (!emails || emails == null || emails == undefined) {
      return null;
    } else {
      return emails;
    }
  }

  async DeleteEmailTemplates(email_template_id: number) {
    const email = await this.emailRepository.findOne({
      where: { email_template_id: email_template_id },
    });
    if (!email || email == null || email == undefined) {
      return null;
    } else {
      email.is_deleted = true;
      await this.emailRepository.save(email);
      return true;
    }
  }

  async getEmailTemplateDetails(email_template_id: number) {
    try {
      const email_template_details = await this.emailRepository.findOne({
        where: { email_template_id: email_template_id, is_deleted: false },
      });
      if (!email_template_details || email_template_details === null) {
        Logger.error(`Email Template Not Found`, "PageService");
        return false;
      } else {
        return email_template_details;
      }
    } catch (error) {
      Logger.error(error);
      return false;
    }
  }

  async create(createEmailTemplateDto: CreateEmailTemplateDto) {
    try {
      const new_page = this.emailRepository.create(createEmailTemplateDto);
      new_page.created_datetime = new Date();
      const req_data = await axios
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
      Logger.log(`Email Template Successfully`, "PageService");
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  }

  async update(updateEmailDto: UpdateEmailDto, email_template_id_: number) {
    try {
      const update_page = await this.emailRepository.findOne({
        where: { email_template_id: email_template_id_ },
      });
      if (!update_page || update_page === null || update_page === undefined) {
        Logger.error(`Email Template Not Found`, "PageService");
        return false;
      } else {
        update_page.email_title = updateEmailDto.email_title;
        update_page.description = updateEmailDto.description;
        update_page.subject = updateEmailDto.subject;
        await this.emailRepository.save(update_page);
        return true;
      }
    } catch (error) {
      Logger.error(error);
      return false;
    }
  }
}
