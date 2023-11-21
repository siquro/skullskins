import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '@st/common';

@Controller('axuth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('/login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }
}
