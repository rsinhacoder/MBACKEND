import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  MinLength,
} from "class-validator";

export class UpdateProfileDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  user_id: string;

  @IsString()
  last_name: string;

  @IsNotEmpty()
  full_legal_name: string;

  // @IsNumberString()
  tin: string;
  ssn: string;

  @IsNotEmpty()
  dob: string;
}
