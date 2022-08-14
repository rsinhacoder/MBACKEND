// This DTO is used during signup
import { IsNotEmpty, IsString } from "class-validator";
export class FillSignUpFormDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  country: string;

  phone_number: string;
  phone_code: string;

  @IsNotEmpty()
  user_id: string;
}
