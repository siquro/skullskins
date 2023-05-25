import { Controller, Get, Body, Post, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './orders.service';
import { AESService, CreateOrderDTO, IRequest, InitiatePaymentDto, } from '@st/common';
import { Order } from '@prisma/client';

// @UseGuards(AuthorizationGuard)
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly aesService: AESService
  ) { }


  @Post('/')
  createOrder(@Body() dto: CreateOrderDTO, @Req() req: IRequest): any {
    const user = this.aesService.decodingUserToken(req.headers.authorization)
    // return this.orderService.createOrder(dto, user.steamId)
  }
  @Post('/transaction')
  initiateTransaction(@Body() createOrderDto: CreateOrderDTO,@Body() paymentDto: InitiatePaymentDto, @Req() req: IRequest): Promise<any>{
      const user = this.aesService.decodingUserToken(req.headers.authorization)
      const remote_ip = req.socket.remoteAddress
      return this.orderService.initiateTransaction(createOrderDto,{...paymentDto, remote_ip}, user.steamId)
  }
}
