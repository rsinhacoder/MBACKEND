import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  MinLength,
} from "class-validator";

export class UpdateUserDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  document_type;

  @IsString()
  full_legal_name: string;

  @IsNotEmpty()
  dob: string;

  document_value: string;

  citizenship: string;

  country_id: string;

  @IsNotEmpty()
  phone_number: string;
  phone_code: string;
}
