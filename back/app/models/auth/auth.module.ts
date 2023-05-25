import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { Module } from '@nestjs/common';
import { AESModule, PrismaService } from '@st/common';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule, AESModule],
  providers: [AuthService, PrismaService],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
