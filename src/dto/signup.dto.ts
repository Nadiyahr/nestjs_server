import { IsNotEmpty, IsString, IsEmail, Length, IsInt } from 'class-validator';
// import { PrismaClient, User } from '@prisma/client';
// import { User, Companies } from '@prisma/client';
// import { PrismaService } from './../../prisma/prisma.service';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 30, { message: 'Password has to be at between 6 and 30 chars' })
  public password: string;

  @IsNotEmpty()
  @IsInt()
  public phone_number: number;

  @IsNotEmpty()
  @IsString()
  public last_name: string;

  @IsNotEmpty()
  @IsString()
  public first_name: string;

  @IsString()
  public nick_name: string;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsNotEmpty()
  @IsString()
  public position: string;
}
