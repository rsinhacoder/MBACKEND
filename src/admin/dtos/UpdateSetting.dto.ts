import { IsNotEmpty, IsString } from "class-validator";

export class UpdateSettingsDto {
  @IsNotEmpty()
  setting_id: string;

  @IsString()
  setting_value: string;
}
