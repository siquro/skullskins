import { Module } from '@nestjs/common';
import { AESModule, PaymentModule, PrismaService } from '@st/common';
import { OrderService } from './orders.service';
import { OrderController } from './orders.controller';

@Module({
  imports: [AESModule, PaymentModule],
  providers: [OrderService, PrismaService],
  exports: [OrderService],
  controllers: [OrderController]
})
export class OrderModule { }
