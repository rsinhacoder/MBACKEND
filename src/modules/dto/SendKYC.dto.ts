import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
export class sendKYCResponse {
//   @IsNotEmpty()
//   @IsString()
//   first_name: string;

  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  kyc_response: any;
}
