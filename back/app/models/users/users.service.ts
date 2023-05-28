import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { AESService, Client, EmailService, IUser, PrismaService, UpdateEmailDTO } from '@st/common';

export type User = {
  id: number;
  name: string;
  userName: string;
  password: string;
};

interface updateBillingInfoDTO {
  fullName: string
  adress1: string
  adress2: string
  country: string
  city: string
}

@Injectable()

export class UsersService {
  constructor(private readonly prisma: PrismaService,
    private readonly aesService: AESService,
    private readonly emailService: EmailService
  ) { }

  async getUserBillingInfo(accessToken: string): Promise<any> {
    const { steamId } = this.aesService.decodingUserToken(accessToken)
    return this.prisma.customer.findFirst({
      where: {
        userSteamId: steamId
      },
      select: {
        fullName: true,
        adress1: true,
        adress2: true,
        country: true,
        city: true
      }
    })
  }
  async sendTestEmail(text: string){
    return this.emailService.sendEmail(text)
  }

  // async updateUserBullingInfo(dto:updateBillingInfoDTO,accessToken: string): Promise<any> {
  //   const { steamId } = this.aesService.decodingUserToken(accessToken)
  //   // const {id} = this.prisma.user.findFirst({where: {steamId: steamId}, select : {}})
  //   return this.prisma.customer.update({
  //     where: {
        
  //     },
  //     data: {
  //       ...dto
  //     }
  //   })
  // }
  
  async getUserInfo(steamId: string): Promise<IUser | undefined> {
    const user = await this.prisma.user.findFirst({
      where: {
        steamId
      }
    });
    return user;
  }

  async sendVerificationEmail(dto: UpdateEmailDTO, accessToken: string): Promise<any> {

    const { steamId } = this.aesService.decodingUserToken(accessToken)

    const user = await this.prisma.user.findUnique({ where: { steamId } })
    if (!user) { throw new NotFoundException('ERROR34') }

    const emailExists = await this.prisma.user.findFirst({ where: { email: dto.email } })
    if (emailExists) { throw new NotFoundException('EMAIL_ALREADY_EXISTS37') }


    const token = await this.generateToken(dto.email, user.steamId)
    const verificationURL = `${process.env.BASE_URL}/user/verify/${token}`

    const TokenData = await this.createTokenRecord(token)
    if (!TokenData) { throw new Error('TOKEN_FAILED') }

    return this.emailService.sendEmailVerificationURL(dto.email,verificationURL)
  }

  async updateEmail(token: string): Promise<any> {
    try {
      const record = this.prisma.token.findFirst({
        where: {
          token: token
        }
      })
      if (!record) throw new Error('INVALID_TOKEN')

      const { steamId, email } = this.aesService.decodingUserToken(token)
      return this.prisma.user.update({
        where: {
          steamId
        },
        data: {
          email
        }

      })
    } catch (e) {
      return e
    }

  }

  async updateTradeURL(tradeURL: string, accessToken: string) {
    const user = this.aesService.decodingUserToken(accessToken)
    try {
      const data = await this.prisma.user.update({
        where: { steamId: user.steamId },
        data: {
          tradeOfferLink: tradeURL
        }
      })
      return data
    } catch (e) {
      throw new Error('TRADEURL_UPDATE_ERROR_OCCURRED')
    }
  }

  private async generateToken(email: string, steamId: string) {
    return this.aesService.encodingUserPayload({
      steamId,
      email
    })
  }
  private async createTokenRecord(token: string) {
    return this.prisma.token.create({
      data: {
        token
      }
    })
  }
}
