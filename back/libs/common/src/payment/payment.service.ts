import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginDto } from '@st/common/dto/login.dto';
import { HttpErrorsEnum } from '@st/common/enum/errors.enum';
import axios from 'axios';
import { CreatePurchaseDTO, CreateRedirectUrlDto, IPurchase, ISteamUser, InitiatePaymentDto, PrismaService, S2SPaymentDTO, STEAM_API_KEY } from '@st/common';
import { PAYMENT_BASE_URL, PAYMENT_S2S_KEY } from './secret';
import { PAYMENT_BRAND_ID } from './secret';
import { PAYMENT_KEY } from './secret';
import { OrderStatus } from '../enum/order.enum';


@Injectable()
export class PaymentService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async initiatePayment(dto: InitiatePaymentDto, steamId: string) {
    const { cardholder_name, cvc, card_number, expires, ...rest } = dto
    const data = await this.getRedirectURL(rest, steamId)
    if (!data) throw new Error('FAILED_TO_CREATE_PURCHASE')
    return data
  }

  async handleS2SPayment(dto: S2SPaymentDTO): Promise<any> {
    const { direct_post_url, ...body2 } = dto
    // console.log(body)
    const s2sURL = `${dto.direct_post_url}?s2s=true`
    console.log(s2sURL)
    const body = {
      cardholder_name: dto.cardholder_name,
      card_number: dto.card_number,
      expires: dto.expires,
      cvc: dto.cvc,
      remote_ip: dto.remote_ip
    }
    const data = await axios.post<any, any>(s2sURL, body, {
      headers: {
        Authorization: `Bearer ${PAYMENT_S2S_KEY}`,
        "Content-Type": 'application/json',
      }
    })
    if (!data) throw new InternalServerErrorException("PAYMENT_S2S_FAILED")
    return data

  }


  private async getRedirectURL(dto: CreateRedirectUrlDto, steamId: string): Promise<any> {
    const purchaseURL = `${PAYMENT_BASE_URL}purchases/`
    const user = await this.prisma.user.findUnique({ where: { steamId } })
    const { items } = await this.prisma.order.findFirst({
      where: {
        userSteamId: user.steamId,
        status: OrderStatus.RESERVED
      },
      select: {
        items: true
      }
    })
    console.log(items)
    const body = {
      client: {
        ...dto,
        email: user.email,
      },
      purchase: {
        products: items.map((el) => ({
          name: el.assetId,
          price: el.price * 100
        }))
      },
      brand_id: PAYMENT_BRAND_ID,
      success_redirect: "http://localhost:3000",
      failure_redirect: "http://localhost:3000"
    }
    return axios.post<IPurchase, any>(purchaseURL, body, {
      headers: {
        Authorization: `Bearer ${PAYMENT_KEY}`,
        "Content-Type": 'application/json',
      }
    }).catch((err) => { return new Error(err) })

  }


}
