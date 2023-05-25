import { HttpCode, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDTO, CreateRedirectUrlDto, InitiatePaymentDto, PaymentService, PaymentStatus, PrismaService } from '@st/common';
import { OrderStatus } from '../../../libs/common/src/enum/order.enum';
import { TransactionStatus } from '../../../libs/common/src/enum/payment.enum';
import { Order } from '@prisma/client';

@Injectable()

export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly payment: PaymentService
  ) { }

  
  async initiateTransaction(createOrderDto: CreateOrderDTO, paymentDto: InitiatePaymentDto, steamId: string) {
    const  reservation =  await this.createOrder(createOrderDto,steamId)
    if (!reservation) throw new Error('RESERVATION_FAILED')
    
    const purchase = await this.payment.initiatePayment(paymentDto, steamId)
    if (!purchase) throw new Error('PURCHASE_CREATION_FAILED')

    const transaction = await this.prisma.transaction.create({
      data: {
        id: purchase.data.id,
        status: TransactionStatus.WAITING,
        order: {
          connect: {
            id: reservation.id
          }
        },
        amount: reservation.totalPrice
      }
    })
    if (!transaction) throw new Error('FAILED_TO_CREATE_TRANSACTION')

    const s2s = await this.payment.handleS2SPayment({
      direct_post_url: purchase.data.direct_post_url,
      cardholder_name: paymentDto.cardholder_name,
      card_number: paymentDto.card_number,
      expires: paymentDto.expires,
      cvc: paymentDto.cvc,
      remote_ip: paymentDto.remote_ip
    })
    if (!s2s.data) throw new Error('S2S_FAILED')
    
    if (s2s.data.status === 'executed') {
      // платежка прошла без 3д проверки 
    } else if(s2s.data.status === 'error' ) {
      // Error
    } else if (s2s.data.status === '3DS_required') {
      console.log(s2s.data)
    }

  }

  private async createOrder(dto: CreateOrderDTO, steamId: string): Promise<Order> {

    return this.prisma.order.create({
      data: {
        items: {
          connect: dto.items.map((el) => ({ assetId: el.assetId }))
        },
        status: OrderStatus.RESERVED,
        totalPrice: dto.items.reduce((total, el) => {
          return total + el.price
        }, 0),
        user: {
          connect: {
            steamId: steamId
          }
        },
        createdAt: new Date()
      }
    }).then(async (res) => {
      
      const reservation = await this.prisma.steamItem.updateMany({
        where: {
          assetId: {
            in: dto.items.map((el) => el.assetId)
          }
        },
        data: {
          quantity: {
            decrement: 1
          }
        }
      })

      if (reservation) return res

    })
  }
}
