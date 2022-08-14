import {
  IsNotEmpty,
  IsNumberString,
  MaxLength,
  MinLength,
} from "class-validator";

export class UpdatePhoneNumberDto {
  @IsNotEmpty()
  @MaxLength(10)
  @MinLength(10)
  phone_number: string;

  @IsNotEmpty()
  @IsNumberString()
  user_id: number;
}
