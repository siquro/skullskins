import { Controller, Get, Body, Post, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  AESService,
  AuthorizationGuard,
  CreateUserDto,
  EmailService,
  IRequest,
  PrismaService,
  UpdateEmailDTO,
  UpdateUserDto,
} from '@st/common';

// @UseGuards(AuthorizationGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UsersService,
    private readonly aesService: AESService,
  ) {
  }


  @Post('/email')
  updateEmail(@Body() dto: UpdateEmailDTO, @Req() req: any): any {
    const accessToken = req.headers.authorization;
    return this.userService.sendVerificationEmail(dto, accessToken);
  }

  @Post('/email/verify')
  updateUser(@Body() { token }: { token: string }): any {
    return this.userService.updateEmail(token);
  }

  @Post('/tradeURL')
  updateUserTradeURL(@Body() { tradeURL }: { tradeURL: string }, @Req() req: any): any {
    const accessToken = req.headers.authorization;
    return this.userService.updateTradeURL(tradeURL, accessToken);
  }

  @Get()
  getUserInfo(@Req() req: any): any {
    const user = this.aesService.decodingUserToken(req.query.accessToken);
    return this.userService.getUserInfo(user.steamId);
  }

  @Get('/billing')
  getBillingInfo(@Req() req: any): any {
    const accessToken = req.headers.authorization;
    return this.userService.getUserBillingInfo(accessToken);
  }

  @Get('/trades')
  getUserTrades(@Req() req: any) {
    const accessToken = req.headers.authorization;
    return this.userService.getUserTrades(accessToken);
  }
}
