import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { SteamModule } from '../steam/steam.module';
import { OrderModule } from '../orders/orders.module';

@Module({
  imports: [UsersModule, AuthModule, SteamModule, OrderModule],
})
export class AppModule { }
