import { IsNotEmpty, IsString } from "class-validator";

export class CreateEmailTemplateDto {
  @IsString()
  email_title: string;

  @IsString()
  email_keyword: string;

  @IsString()
  subject: string;

  email_variable: string;

  @IsNotEmpty()
  description: string;
}
