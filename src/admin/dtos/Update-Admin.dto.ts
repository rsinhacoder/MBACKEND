import { IsNotEmpty } from "class-validator";

export class UpdateAdminDto {
  first_name: string;

  @IsNotEmpty()
  admin_id: string;

  last_name: string;

  email_id: string;

  username: string;
}
