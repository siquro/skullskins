import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import CEconItem from 'steamcommunity/classes/CEconItem';
import CConfirmation from 'steamcommunity/classes/CConfirmation';
import axios from "axios";
import * as SteamUser from "steam-user";
import * as TradeOfferManager from "steam-tradeoffer-manager";
import * as SteamCommunity from "steamcommunity";
import { IOrderObject2, IOrdersObject, ISteamInventory, ISteamMarket } from '../types';
import { off } from 'process';
import { PrismaService } from '@st/common';
const { getConfirmationKey, time } = require('steam-totp');
interface IBotCollection {
  // @ts-ignore
  readonly user: SteamUser;
  // @ts-ignore
  readonly manager: TradeOfferManager;
  // @ts-ignore
  readonly community: SteamCommunity;
  readonly sharedSecret: string;
  readonly identitySecret: string;
}
interface SteamLogin {
  readonly id: string;
  readonly guardToken: string;
  readonly oAuthToken: string;
  readonly sharedSecret: string;
  readonly identitySecret: string;
}

export interface SendTradeOffer {
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


@Injectable()
export class SteamBotService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }
  private readonly botsCollection: Map<string, IBotCollection> = new Map<
    string,
    IBotCollection
  >();
  // eslint-disable-next-line @typescript-eslint/no-empty-function


  public async login(dto: SteamLogin) {
    let isError = false;
    const community = new SteamCommunity();
    let user: any;
    let manager = new TradeOfferManager({ steam: new SteamUser() })
    community.oAuthLogin(dto.guardToken, dto.oAuthToken, (err, sessionID, cookies) => {
      console.log(sessionID, cookies)
      if (err) isError = true;
      community.setCookies(cookies as any)
      community.getClientLogonToken((err, details) => {
        user = new SteamUser({ enablePicsCache: true });
        // Ensure that we have logged in properly and that our app information has loaded in
        user.logOn(details);
        user.on("loggedOn", () => {
          console.log("[STEAM_TRADE_BOT] Bot has been sucessfully started!")
          manager.setCookies(cookies as any);
          user.on("appOwnershipCached", () => { });
        });
      })
    })
    manager.on('sentOfferChanged', async function (offer, oldState) {


      Logger.log(
        `[STEAM SERVICE] SteamID ${dto.id} Offer #${offer.id} changed: ${TradeOfferManager.ETradeOfferState[oldState]
        } -> ${TradeOfferManager.ETradeOfferState[offer.state]}`,
      );

    });


    if (isError) {
      user.logOff();
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
    return new Promise((resolve, reject) => {
      const bot = this.botsCollection.get(dto.steamId);
      let offerId; // if user send items to bot
      if (dto.targetSteamId) {
        bot.manager.getUserInventoryContents(
          dto.targetSteamId,
          dto.appId,
          2,
          true,
          (err, inventory) => {
            if (err) {
              throw new InternalServerErrorException(
                "USER_INVENTORY_ERROR",
              );
            }
            if (inventory.length === 0) {
              throw new BadRequestException('USER_INVENTORY_EMPTY');
            }

            const offer = bot.manager.createOffer(dto.tradeUrl);
            const items: Array<CEconItem> = [];
            dto.itemsName.map((name) => {
              items.push(inventory.filter((el) => el.name === name)[0]);
            });
            offer.addTheirItems(items);
            offer.setMessage(dto.nonce);
            offer.send((err, status) => {
              if (err) {
                //TRADE BAN or new connection(less 7 day)
                throw new InternalServerErrorException(
                  'CANT_SEND_OFFER',
                );
              }
              console.log(status);
              if (status === 'pending') {
                //confirm
              } else {
                console.log(`Offer ${offer.id} sent`);
              }
            });
          },
        );
      } else {
        // if bot send to user items
        bot.manager.getInventoryContents(dto.appId, 2, true, (err, inventory) => {
          if (err) {
            console.log(err);
            throw new InternalServerErrorException(
              'CANT GET INVENTORY',
            );
          }
          if (inventory.length === 0) {
            throw new InternalServerErrorException(
              'STEAM_BOT_INVENTORY_EMPTY'
            );
          }
          const offer = bot.manager.createOffer(dto.tradeUrl);
          const items: Array<CEconItem> = [];
          dto.itemsName.map((name) => {
            items.push(inventory.find((el) => el.name === name));
          });
          offer.addMyItems(items);

          offer.send((err, status) => {
            if (err) {
              //TRADE BAN or new connection(less 7 day)
              throw new InternalServerErrorException(
                'STEAM_BOT_INTERNAL_ERROR'
              );
            }
            if (status === 'pending') {
              //Confirmation logic
              offerId = offer.id;


              const time = Math.floor(Date.now() / 1000)
              const confKey = getConfirmationKey(bot.identitySecret, time, 'conf')
              const allowKey = getConfirmationKey(bot.identitySecret, time, 'allow')

              bot.community.acceptAllConfirmations(time, confKey, allowKey, (err) => {
              })
              resolve(offerId)

            } else {
              console.log('[STEAM SERVICE] bot succesfyle send trade');
            }
          });
        });
      }

    })

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
      console.log(err);
      throw new InternalServerErrorException(
        "STEAM_BOT_CONFIRM_ERROR"
      );
    }
  }

  public async getUserInventory(steamId: string, appid) {
    const { data } = await axios.get<ISteamInventory>(
      `http://steamcommunity.com/inventory/${steamId}/${appid}/2?l=english&count=5000`,
    );
    if (!data) return null; //Get only without trade ban & marketable
    const inventory = data.descriptions
      .filter((el) => el.tradable === 1)
      .filter((el) => el.marketable === 1);

    const temp: Array<IOrderObject2> = [];

    inventory.map((inv) => {

      const url = new URL('http://steamcommunity.com/market/priceoverview/');
      url.searchParams.append('appid', appid);
      url.searchParams.append('market_hash_name', inv.market_hash_name);
      url.searchParams.append('currency', '1');
      axios
        .get<ISteamMarket>(url.toString())
        .then((res) => {
          const price = parseFloat(res.data.lowest_price.split('$')[1]);
          const result = (price / 100) * 10;
          temp.push({
            price: price + result,
            icon_url: inv.icon_url,
            name: inv.name,
          })
        })
        .catch(() => {
          //console.error('ERROR RATE LIMIT MAYBE idk');
        });
    })
    return temp;
  }
}