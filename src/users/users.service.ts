/* eslint-disable @typescript-eslint/no-empty-function */
import { PrismaService } from './../../prisma/prisma.service';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getMyUser(id: string, req: Request) {
    const user = this.prisma.user.findUnique({ where: { id: id } });

    if (!user) {
      throw new NotFoundException();
    }

    const decodedUser = req.user as { id: string; email: string };

    if ((await user).id !== decodedUser.id) {
      throw new ForbiddenException();
    }

    delete (await user).hashedPassword;

    return user;
  }

  async getUsers() {
    return await this.prisma.user.findMany({
      select: { id: true, email: true },
    });
  }
}
