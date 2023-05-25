import { IsString } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'check your json object' })
  readonly ['openid.mode']: string;
  @IsString({ message: 'check your json object' })
  readonly ['openid.op_endpoint']: string;
  @IsString({ message: 'check your json object' })
  readonly ['openid.claimed_id']: string;
  @IsString({ message: 'check your json object' })
  readonly ['openid.identity']: string;
  @IsString({ message: 'check your json object' })
  readonly ['openid.return_to']: string;
  @IsString({ message: 'check your json object' })
  readonly ['openid.response_nonce']: string;
  @IsString({ message: 'check your json object' })
  readonly ['openid.assoc_handle']: string;
  @IsString({ message: 'check your json object' })
  readonly ['openid.signed']: string;
  @IsString({ message: 'check your json object' })
  readonly ['openid.sig']: string;
}
