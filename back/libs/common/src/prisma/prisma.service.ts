import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IOrdersObject } from '../types';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
  async updateItemsInDB(inventory: Array<IOrdersObject>) {
    try {
      for (const item of inventory) {
        try {

          const data = await this.steamItem.upsert({
            where: {
              assetId: item.assetId
            },
            update: {
              price: item.price,
              quantity: item.quantity
            },
            create: {
              assetId: item.assetId,
              classId: item.classId,
              marketHashName: item.market_hash_name,
              imageURL: item.icon_url,
              appId: item.appId,
              price: item.price,
              tags: item.tags,
              steamLink: item.steamLink,
              quantity: item.quantity
            }
          })
          console.log(`Item with assetId: ${data.assetId} successfuly inserted!`)
        }
        catch (e) {
          console.error(e)
        }

      }
      return 'Done'
    } catch (e) {
      console.error(e)
      return 'Error occured'
    }

  }
}


