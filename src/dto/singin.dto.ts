import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 30, { message: 'Password has to be at between 6 and 30 chars' })
  public password: string;
}
