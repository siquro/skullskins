import { Module } from '@nestjs/common';
import { SteamService } from './steam.service';
import { SteamController } from './steam.controller';
import { PrismaService } from '@st/common';

@Module({
  providers: [SteamService, PrismaService],
  controllers: [SteamController],
})
export class SteamModule {}
