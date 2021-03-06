import { SignInDto } from './../dto/singin.dto';
import { jwtSecret } from './../utils/constants';
import { SignupDto } from '../dto/signup.dto';
import { PrismaService } from './../../prisma/prisma.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signup(dto: SignupDto) {
    const {
      email,
      password,
      phone_numb,
      last_name,
      first_name,
      nick_name,
      description,
      position,
    } = dto;

    const foundUser = await this.prisma.user.findUnique({ where: { email } });

    if (foundUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    await this.prisma.user.create({
      data: {
        email,
        hashedPassword,
        last_name,
        first_name,
        nick_name,
        description,
        position,
        phone_numb,
      },
    });

    return { message: 'Registration was successful!' };
  }

  async signin(dto: SignInDto, rec: Request, res: Response) {
    const { email, password } = dto;

    const foundUser = await this.prisma.user.findUnique({ where: { email } });

    if (!foundUser) {
      throw new BadRequestException('Wrong credentials');
    }

    const isMatch = await this.comparePasswwords({
      password,
      hash: foundUser.hashedPassword,
    });

    if (!isMatch) {
      throw new BadRequestException('Wrong credentials');
    }

    const token = await this.signToken({
      id: foundUser.id,
      email: foundUser.email,
    });

    if (!token) {
      throw new ForbiddenException();
    }

    res.cookie('token', token);

    return res.send({ message: 'Logged in!!' });
  }

  async signout(rec: Request, res: Response) {
    res.clearCookie('token');
    return res.send({ message: 'You have successfully logged in!' });
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;

    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePasswwords(args: { password: string; hash: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  async signToken(args: { id: string; email: string }) {
    const payload = args;

    return this.jwt.signAsync(payload, { secret: jwtSecret });
  }
}
