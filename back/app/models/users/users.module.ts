import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AESModule, EmailModule, PrismaService } from '@st/common';
import { UserController } from './users.controller';

@Module({
  imports: [AESModule, EmailModule],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
  controllers: [UserController]
})
export class UsersModule { }
