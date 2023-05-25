import { PaymentService } from './payment.service';
import { Module } from '@nestjs/common';
import { AESModule, PrismaService } from '@st/common';

@Module({
  imports: [AESModule],
  providers: [PaymentService, PrismaService],
  exports: [PaymentService],
})
export class PaymentModule { }
