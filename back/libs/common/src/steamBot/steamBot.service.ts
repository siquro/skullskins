import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import SteamUser from 'steam-user';
import SteamCommunity from 'steamcommunity';
import TradeOfferManager from 'steam-tradeoffer-manager';
import SteamGuard, { getConfirmationKey, time } from 'steam-totp';
import CEconItem from 'steamcommunity/classes/CEconItem';
import CConfirmation from 'steamcommunity/classes/CConfirmation';
import { HttpErrorsEnum } from '@st/common/enum/errors.enum';

interface IBotCollection {
  readonly user: SteamUser;
  readonly manager: TradeOfferManager;
  readonly community: SteamCommunity;
  readonly sharedSecret: string;
  readonly identitySecret: string;
}
interface SteamLogin {
  readonly id: string;
  readonly login: string;
  readonly password: string;
  readonly sharedSecret: string;
  readonly identitySecret: string;
}

interface SendTradeOffer {
  steamId: string;
  targetSteamId?: string;
  tradeUrl: string;
  appId: number;
  itemsName: Array<string>;
  nonce: string;
}

enum ConfirmationTag {
  GetAll = 'conf',
  GetDetails = 'details',
  Accept = 'allow',
  Cancel = 'cancel',
}

enum ConfirmationType {
  Trade = 2,
  MarketListing = 3,
}

interface ExCConfirmation extends CConfirmation {
  offerID: any;
}

@Injectable()
export class SteamBotService {
  private readonly botsCollection: Map<string, IBotCollection> = new Map<
    string,
    IBotCollection
  >();
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  public async login(dto: SteamLogin) {
    let isError = false;
    const user = new SteamUser();
    const manager = new TradeOfferManager({
      steam: user,
      domain: 'warskins.com',
      language: 'en',
    });
    const community = new SteamCommunity();
    const logOnOptions = {
      accountName: dto.login,
      password: dto.password,
      twoFactorCode: SteamGuard.getAuthCode(dto.sharedSecret), //2fa key
    };
    user.logOn(logOnOptions);

    user.on('loggedOn', () => {
      Logger.log(`[STEAM SERVICE] SteamID ${dto.id} logged}`);
    });
    user.on('webSession', (sessionId, cookies) => {
      manager.setCookies(cookies, (err) => {
        if (err) {
          Logger.error(`[STEAM Service] SteamID ${dto.id} loggin error`);
          isError = true;
          return;
        }
        if (!isError) community.setCookies(cookies);
      });
    });
    manager.on('sentOfferChanged', function (offer, oldState) {
      Logger.log(
        `[STEAM SERVICE] SteamID ${dto.id} Offer #${offer.id} changed: ${TradeOfferManager.ETradeOfferState[oldState]
        } -> ${TradeOfferManager.ETradeOfferState[offer.state]}`,
      );
    });

    if (isError) {
      user.logOff();
      manager.shutdown();
      Logger.log(
        `[STEAM SERVICE] SteamID ${dto.id} is logoff because have cookies error`,
      );
    } else {
      this.botsCollection.set(dto.id, {
        user,
        manager,
        community,
        sharedSecret: dto.sharedSecret,
        identitySecret: dto.identitySecret,
      });
    }
  }

  public async sendTrade(dto: SendTradeOffer) {
    const bot = this.botsCollection.get(dto.steamId);
    let offerId;
    // if bot send to user items
    bot.manager.getInventoryContents(dto.appId, 2, true, (err, inventory) => {
      if (err) {
        throw new InternalServerErrorException(
          HttpErrorsEnum.STEAM_CANT_GET_INVETORY,
        );
      }
      if (inventory.length === 0) {
        throw new InternalServerErrorException(
          HttpErrorsEnum.STEAM_BOT_INVETORY_EMPTY,
        );
      }
      const offer = bot.manager.createOffer(dto.tradeUrl);
      const items: Array<CEconItem> = [];
      dto.itemsName.map((name) => {
        items.push(inventory.filter((el) => el.name === name)[0]);
      });
      offer.addMyItems(items);

      offer.send((err, status) => {
        if (err) {
          //TRADE BAN or new connection(less 7 day)
          throw new InternalServerErrorException(
            HttpErrorsEnum.STEAM_BOT_INTERNAL_ERROR,
          );
        }
        if (status === 'pending') {
          //Confirmation logic
          offerId = offer.id;
          bot.community.getConfirmations(
            time(),
            getConfirmationKey(
              bot.identitySecret,
              time(),
              ConfirmationTag.GetAll,
            ),
            async (err, confirmations) => {
              const _confirmations: Array<ExCConfirmation> = [];
              for (const confirmation of confirmations) {
                _confirmations.push(
                  confirmation.type == ConfirmationType.Trade
                    ? await this.populateConfirmation(
                      confirmation,
                      bot.identitySecret,
                    )
                    : confirmation,
                );
              }
              const trade = _confirmations.find(
                (el) => el.offerID === offer.id,
              );
              trade.respond(time(), trade.key, true, this.confirmationCb);
            },
          );
        } else {
          console.log('[STEAM SERVICE] bot succesfully sent trade');
        }
      });
    });
    return offerId;
  }

  /**
   *
   * @param confirmation
   * @param identity_secret
   * @private
   * @return confirmation with offerId
   */
  private async populateConfirmation(
    confirmation: CConfirmation,
    identity_secret: string,
  ) {
    return new Promise<any>((resolve) => {
      confirmation.getOfferID(
        time(),
        getConfirmationKey(identity_secret, time(), ConfirmationTag.GetDetails),
        (err, offerID) => {
          if (err) return resolve(confirmation);
          resolve({ ...confirmation, offerID });
        },
      );
    });
  }

  private async confirmationCb(err: any) {
    if (err) {
      throw new InternalServerErrorException(
        HttpErrorsEnum.STEAM_BOT_COMMYNITY_CONFIRMATION_ERROR,
      );
    }
  }
}
