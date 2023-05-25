import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IOrdersObject, ISteamInventory, ISteamMarket, PrismaService } from '@st/common';

@Injectable()
export class SteamService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async getItemsListings(appId: number, page: number): Promise<Array<any>> {
    // Takes 10 elements by default
    const take = 10
    const skip = page * take - take
    return this.prisma.steamItem.findMany({
      where: {
        appId: appId,
        quantity: {
          gt: 0
        }
      },
      skip,
      take
    })
  }
  async checkItemForQuantity(assetId: string, appId: string): Promise<boolean> {
    const items = this.prisma.steamItem.findFirst({
      where: {
        assetId,
        appId: +appId,
        quantity: {
          gt: 0
        }
      }
    })
    return items ? true : false

  }
  async addItemsToShop(steamId: string, appid: number): Promise<any> {
    const inventory = await this.getUserInventory(steamId, appid)
    return this.prisma.updateItemsInDB(inventory)
  }

  private async getUserInventory(steamId: string, appid: number) {
    const { data } = await axios.get<ISteamInventory>(
      `http://steamcommunity.com/inventory/${steamId}/${appid}/2?l=english&count=5000`,
    );

    if (!data) return null;

    const assets = data.assets

    const inventory = data.descriptions
      .filter((el) => el.tradable === 1)
      .filter((el) => el.marketable === 1);

    const temp: Array<IOrdersObject> = [];

    for (const [idx, inv] of inventory.entries()) {
      const url = new URL('http://steamcommunity.com/market/priceoverview/');
      url.searchParams.append('appid', appid.toString());
      url.searchParams.append('market_hash_name', inv.market_hash_name);
      url.searchParams.append('currency', '1');

      try {
        const res = await axios.get<ISteamMarket>(url.toString());
        const price = parseFloat(res.data.lowest_price.split('$')[1]);
        const finalPrice = price * 1.1;

        temp.push({
          price: parseFloat(finalPrice.toFixed(2)),
          icon_url: inv.icon_url_large,
          market_hash_name: inv.market_hash_name,
          classId: inv.classid,
          appId: inv.appid,
          tags: "",
          steamLink: "",
          assetId: assets[idx].assetid,
          quantity: parseInt(assets[idx].amount)
        });
      } catch (error) {
        console.error(error);
      }
    }

    return temp;
  }

}
