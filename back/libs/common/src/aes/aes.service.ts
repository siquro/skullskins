import { ForbiddenException, Injectable } from '@nestjs/common';
import { AES_SECRET } from '@st/common';
import * as CryptoAes from 'crypto-js/aes';
import * as CryptoEncBase64 from 'crypto-js/enc-base64';
import * as CryptoEncUtf8 from 'crypto-js/enc-utf8';
import { AESUserPayload } from './aes.interface';
import { HttpErrorsEnum } from '../enum/errors.enum';

@Injectable()
export class AESService {
  public encodingUserPayload(payload: AESUserPayload): string {
    try {
      const encrypted = CryptoAes.encrypt(JSON.stringify(payload), AES_SECRET);
      return CryptoEncBase64.stringify(
        CryptoEncUtf8.parse(encrypted.toString()),
      );
    } catch (e) {
      throw new Error(e);
    }
  }

  public decodingUserToken(token: string): AESUserPayload {
    try {
      const decrypted = CryptoEncBase64.parse(token).toString(CryptoEncUtf8);
      const result = CryptoAes.decrypt(decrypted, AES_SECRET).toString(
        CryptoEncUtf8,
      );
      return JSON.parse(result);
    } catch (e) {
      throw new ForbiddenException(HttpErrorsEnum.USER_TOKEN_ERROR);
    }
  }
}
