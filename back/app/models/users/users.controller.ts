import { Controller, Get, Body, Post, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthorizationGuard, CreateUserDto, EmailService, IRequest, PrismaService, UpdateEmailDTO, UpdateUserDto } from '@st/common';

// @UseGuards(AuthorizationGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UsersService,
  ) { }


  @Post('/email')
  updateEmail(@Body() dto: UpdateEmailDTO, @Req() req: any): any {

    const accessToken = req.headers.authorization
    return this.userService.sendVerificationEmail(dto, accessToken)
  }

  @Post('/email/verify')
  updateUser(@Body() { token }: { token: string }): any {
    return this.userService.updateEmail(token);
  }
  @Post('/tradeURL')
  updateUserTradeURL(@Body() { tradeURL }: { tradeURL: string }, @Req() req: any): any {
    const accessToken = req.headers.authorization
    return this.userService.updateTradeURL(tradeURL, accessToken);
  }

  @Get()
  getUserInfo(@Req() req: IRequest): any {
    return this.userService.getUserInfo(req.steamId);
  }
  @Get('/billing')
  getBillingInfo( @Req() req: any): any {
    const accessToken = req.headers.authorization
    return this.userService.getUserBillingInfo(accessToken)
  }
}
