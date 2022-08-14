import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";

export class UpdateAddressDto {
  @IsNotEmpty()
  user_id;

  @IsString()
  address_line1: string;

  @IsString()
  address_line2: string;

  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  other_info: string;

  @IsNotEmpty()
  @IsNumberString()
  zipcode: string;
}
