import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email_id: string;

  phone_number: string;
  phone_code: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(25)
  password: string;
}
