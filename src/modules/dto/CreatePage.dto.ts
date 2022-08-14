import { IsNotEmpty, IsString } from "class-validator";

export class CreatePageDto {
  @IsNotEmpty()
  pagetitle: string;

  @IsString()
  description: string;

  @IsString()
  pageKeyWord: string;
}
