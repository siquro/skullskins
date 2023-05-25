import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginDto } from '@st/common/dto/login.dto';
import { HttpErrorsEnum } from '@st/common/enum/errors.enum';
import axios from 'axios';
import { AESService, ISteamUser, PrismaService, STEAM_API_KEY } from '@st/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aesService: AESService,
  ) { }

  public async login(dto: LoginDto) {
    const steamUser = await this.verifyObject(dto); //Steam user
    const { personaname, steamid, avatarmedium } = steamUser
    // Check if user exists in DB, if not create new RECORD
    let user = await this.prisma.user.findUnique({
      where: {
        steamId: steamid
      }
    })

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          userName: personaname,
          avatarURL: avatarmedium,
          steamId: steamid,
          createdAt: new Date()
        }
      })
    }

    const accessToken = this.aesService.encodingUserPayload({
      steamId: user.steamId
    })

    return accessToken
  }



  private async verifyObject(dto: LoginDto) {
    const validOpEndpoint = 'https://steamcommunity.com/openid/login';
    const identifierRegex =
      /^https?:\/\/steamcommunity\.com\/openid\/id\/(\d+)$/;

    if (
      dto['openid.op_endpoint'] !== validOpEndpoint ||
      !identifierRegex.test(dto['openid.identity'])
    )
      throw new BadRequestException(HttpErrorsEnum.STEAM_LOGIN_OBJECT_ERROR);
    const steamID = identifierRegex.exec(dto['openid.identity'])[0];

    const url = await this.buildCheckUrl(dto);
    try {
      const { data: checkData } = await axios.get(url);
      const isValid = checkData.split('is_valid:')[1].split('\n')[0];
      if (isValid && isValid !== 'false')
        throw new BadRequestException(HttpErrorsEnum.STEAM_OPENID_VERIFY_ERROR);

      const profileUrl = await this.buildProfileUrl(steamID);

      const { data } = await axios.get<ISteamUser>(profileUrl);
      if (!data.response)
        throw new InternalServerErrorException(
          HttpErrorsEnum.STEAM_DIDNT_GET_PROFILE,
        );
      return data.response.players[0];
    } catch (e) {
      throw new HttpException(
        e?.message ?? HttpErrorsEnum.INTERNAL_SERVER_ERROR,
        e?.statusCode ?? 500,
      );
    }
  }

  private async buildCheckUrl(dto: LoginDto) {
    const url = new URL('https://steamcommunity.com/openid/login');
    url.searchParams.append('openid.ns', 'http://specs.openid.net/auth/2.0');
    url.searchParams.append('openid.mode', 'check_authentication');
    url.searchParams.append('openid.op_endpoint', dto['openid.op_endpoint']);
    url.searchParams.append('openid.claimed_id', dto['openid.claimed_id']);
    url.searchParams.append('openid.identity', dto['openid.identity']);
    url.searchParams.append('openid.return_to', dto['openid.return_to']);
    url.searchParams.append(
      'openid.response_nonce',
      dto['openid.response_nonce'],
    );
    url.searchParams.append('openid.assoc_handle', dto['openid.assoc_handle']);
    url.searchParams.append('openid.sig', dto['openid.sig']);
    return url.toString();
  }

  private async buildProfileUrl(steamId: string) {
    const url = new URL(
      'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/',
    );
    url.searchParams.append('key', STEAM_API_KEY);
    url.searchParams.append('steamids', steamId);
    return url.toString();
  }
}
