import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    forwardRef,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AESService } from '../aes';
import { HttpErrorsEnum } from '../enum/errors.enum';
import { IRequest } from '../types';


@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(
        private readonly aesService: AESService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const req = context.switchToHttp().getRequest() as IRequest;
            //const authorizationHeader = req.signedCookies[COOKIE_NAME];
            const authorizationHeader = req.headers['authorization'];
            if (!authorizationHeader)
                throw new UnauthorizedException({
                    message: HttpErrorsEnum.MISSING_ACCESS_TOKEN,
                    statusCode: 400,
                });
            req.steamId = this.aesService.decodingUserToken(authorizationHeader).steamId
            return true;
        } catch (e) {
            throw new UnauthorizedException(
                e?.message ?? HttpErrorsEnum.MISSING_ACCESS_TOKEN,
            );
        }
    }
}
