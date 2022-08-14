import { IsNotEmpty, IsString } from "class-validator";

export class UpdateEmailDto {
  @IsString()
  subject: string;

  @IsString()
  email_title: string;

  @IsNotEmpty()
  description: string;
}
