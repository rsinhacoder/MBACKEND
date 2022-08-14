import { IsNotEmpty, IsString } from "class-validator";

export class UpdatePageDto {
  pagetitle_id;

  @IsString()
  pagetitle: string;

  @IsNotEmpty()
  description: string;
}
