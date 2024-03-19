// eslint-disable-next-line import/no-extraneous-dependencies
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumberString,
  Length,
  // IsBase64,
  // IsInt,
  // IsDateString,
  // IsAlpha
} from 'class-validator';

export default class LoginDto {

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  email: string;

  @Length(11, 11)
  @IsNumberString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  constructor(data: Partial<LoginDto>) {
    Object.assign(this, data);
  }

}
