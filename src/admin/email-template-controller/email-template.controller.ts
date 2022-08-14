import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Response } from "express";
import { CreateEmailTemplateDto } from "../dtos/CreateEmailTemplate.dto";
import { UpdateEmailDto } from "../dtos/UpdateEmailTemplate.dto";
import { EmailTemplateService } from "./email-template.service";

@Controller("admin/email-template")
export class EmailTemplateController {
  constructor(
    @Inject("EMAIL_TEMPLATE_SERVICE")
    private readonly emailTemplateService: EmailTemplateService
  ) {}

  @Post("create")
  @UsePipes(ValidationPipe)
  async create(
    @Res() res: Response,
    @Body() createEmailTemplateDto: CreateEmailTemplateDto
  ) {
    Logger.log(createEmailTemplateDto, "EmailTemplateService");
    const result = await this.emailTemplateService.create(
      createEmailTemplateDto
    );
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

  @Get("/getalltemplates")
  async getAllEmailTemplates(@Res() res: Response) {
    const email_templates =
      await this.emailTemplateService.getAllEmailTemplates();

    if (
      !email_templates ||
      email_templates == null ||
      email_templates == undefined
    ) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured, No Email templates Found ",
        data: [],
      });
    } else {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Email templates Found Successfully",
        data: email_templates,
      });
    }
  }

  @Post("/delete")
  async DeleteEmailTemplates(@Res() res: Response, @Body() body: any) {
    const email_template_id = body.email_template_id;
    const deleted_email = await this.emailTemplateService.DeleteEmailTemplates(
      parseInt(email_template_id)
    );
    if (
      !deleted_email ||
      deleted_email === null ||
      deleted_email === undefined
    ) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured ",
        data: [],
      });
    } else {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Email-Template Deleted Successfully",
        data: [],
      });
    }
  }

  @Post("/viewemailtemplate")
  async viewEmailTemplate(@Res() res: Response, @Body() body: any) {
    const email_template_id = body.email_template_id;
    const result = await this.emailTemplateService.getEmailTemplateDetails(
      parseInt(email_template_id)
    );

    if (!result || result == null || result == undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured, No such email template found",
        data: [],
      });
    } else {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Email-Template Found Successfully",
        data: result,
      });
    }
  }

  @Put("update/:id")
  @UsePipes(ValidationPipe)
  async update(
    @Param("id") email_template_id: string,
    @Res() res: Response,
    @Body() updateEmailDto: UpdateEmailDto
  ) {
    const email_template_id_ = parseInt(email_template_id);
    const result = await this.emailTemplateService.update(
      updateEmailDto,
      email_template_id_
    );
    if (!result || result === null || result === undefined) {
      Logger.log("No such email-template found");
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
}
