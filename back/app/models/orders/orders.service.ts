import {
  HttpCode,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import {
  CreateOrderDTO,
  CreateRedirectUrlDto,
  InitiatePaymentDto,
  PaymentService,
  PaymentStatus,
  PrismaService,
  SteamBotService,
} from '@st/common';
import { OrderStatus } from '../../../libs/common/src/enum/order.enum';
import { TransactionStatus } from '../../../libs/common/src/enum/payment.enum';
import { Order } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

enum TradeBotStatus {
  SENT = 'SENT',
  WAITING = 'WAITING',
  REJECTED = 'REJECTECTED',
  ACCEPTED = 'ACCEPTED',
}

@Injectable()
export class OrderService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly payment: PaymentService,
    private readonly tradeBot: SteamBotService,
  ) {}

  onModuleInit() {
    this.tradeBot.login({
      accountName: process.env.STEAM_NAME,
      password: process.env.STEAM_PASSWORD,
      disableMobile: true
    });
  }

  async initiateTransaction(paymentDto: InitiatePaymentDto, steamId: string) {
    const purchase = await this.payment.initiatePayment(paymentDto, steamId);
    if (!purchase) throw new InternalServerErrorException('TRANSACTION_FAILED');
    // console.log('PURCHASE', purchase);

    const userOrder = await this.prisma.order.findFirst({
      where: {
        userSteamId: steamId,
        status: OrderStatus.RESERVED,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (!userOrder) throw new InternalServerErrorException('ORDER_NOT FOUND');

    // Check for unpaid order

    const transaction = await this.prisma.transaction.create({
      data: {
        id: new Date().getTime().toString(),
        status: TransactionStatus.SUCCESS,
        order: {
          connect: {
            id: userOrder.id,
          },
        },
        amount: userOrder.totalPrice,
      },
    });
    if (!transaction) throw new Error('FAILED_TO_CREATE_TRANSACTION');

    // Check for payment
    const s2s = await this.payment.handleS2SPayment({
      direct_post_url: purchase.data.checkout_url,
      cardholder_name: paymentDto.cardholder_name,
      card_number: paymentDto.card_number,
      expires: paymentDto.expires,
      cvc: paymentDto.cvc,
      remote_ip: paymentDto.remote_ip,
    });
    if (!s2s.data) throw new Error('S2S_FAILED');
    if (s2s.data.status === 'executed') {
      console.log('success without 3d');
    } else if (s2s.data.status === 'error') {
      console.log('s2s data status === error');
    } else if (s2s.data.status === '3DS_required') {
      return s2s.data;
    }
    console.log('respone from 3ds', s2s);
    return this.createSteamBotTradeOffer(steamId, userOrder.id);
  }

  private async createSteamBotTradeOffer(userSteamId: string, orderId: number) {
    const paidOrder = await this.prisma.order.findFirst({
      where: {
        userSteamId,
        id: orderId,
        transaction: {
          status: TransactionStatus.SUCCESS,
        },
      },
    });

    if (!paidOrder)
      throw new InternalServerErrorException('PAID_ORDER_NOT_FOUND');

    const tradeOffer = await this.prisma.tradeBotOffer.create({
      data: {
        order: {
          connect: {
            id: orderId,
          },
        },
        status: TradeBotStatus.WAITING,
        botSteamId: '76561198077709562',
      },
    });
    if (!tradeOffer)
      throw new InternalServerErrorException('TRADEOFFER_FAILED_TO_CREATE');
    return tradeOffer;
  }

  public async createOrder(
    dto: CreateOrderDTO,
    steamId: string,
  ): Promise<Order> {
    return this.prisma.order
      .create({
        data: {
          items: {
            connect: dto.items.map((el) => ({ assetId: el.assetId })),
          },
          status: OrderStatus.RESERVED,
          totalPrice: dto.items.reduce((total, el) => {
            return total + el.price;
          }, 0),
          user: {
            connect: {
              steamId: steamId,
            },
          },
          createdAt: new Date(),
        },
      })
      .then(async (res) => {
        const reservation = await this.prisma.steamItem.updateMany({
          where: {
            assetId: {
              in: dto.items.map((el) => el.assetId),
            },
          },
          data: {
            quantity: {
              decrement: 1,
            },
          },
        });

        if (reservation) return res;
      });
  }

  public async sendTradeOrder(orderId: number, userSteamId: string) {
    const user = await this.prisma.user.findUnique({
      where: { steamId: userSteamId },
    });
    if (!user) throw new InternalServerErrorException('NO USER FOUND');
    if (!user.tradeOfferLink)
      throw new InternalServerErrorException('NO_TRADE_OFFER_LINK');

    const userOrderById = await this.prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        items: true,
      },
    });

    if (!userOrderById) throw new Error('BOT_SEND_ORDER_FIND_ERROR');

    const offerId = await this.tradeBot.sendTrade({
      steamId: '76561198077709562',
      tradeUrl: user.tradeOfferLink,
      appId: 252490,
      itemsName: userOrderById.items.map((el) => el.marketHashName),
      nonce: Date.now().toString(),
    });

    const updateTradeOffer = await this.prisma.tradeBotOffer.update({
      where: {
        orderId: orderId,
      },
      data: {
        offerId,
        status: TradeBotStatus.SENT,
      },
    });
    return updateTradeOffer;
  }
}
