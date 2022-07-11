import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule],
})
export class AppModule {}
