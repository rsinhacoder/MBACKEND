import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
export class CreateUserAuth0 {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  auth_response: any;
}
