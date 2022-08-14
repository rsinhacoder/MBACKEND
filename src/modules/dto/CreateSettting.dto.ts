/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";
import { setting_status_enum } from "../entities/settings.entity";

export class CreateSettingDto {
  @IsNotEmpty()
  setting_name: string;

  @IsString()
  setting_value: string;

  @IsString()
  setting_keyword: string;
}
