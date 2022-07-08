import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup() {
    // this.prisma.user.
    return { message: 'signup was ok' };
  }
  async signin() {
    return '';
  }
  async signout() {
    return '';
  }
}
