import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SteamService } from './steam.service';

@Controller('steam')
export class SteamController {
  constructor(private steamService: SteamService) { }

  @Get('items')
  getItemListings(@Query('appId') appId: string, @Query('page') page: string) {
    return this.steamService.getItemsListings(+appId, +page)
  }
  @Post('items/check')
  checkItemForQuantity(@Body() dto: { assetId: string, appId: string }) {
    return this.steamService.checkItemForQuantity(dto.assetId, dto.appId)
  }

  @Post('items/update')
  update(){
    return this.steamService.addItemsToShop('76561199503137510', 252490)
  }
  // Обновления товаров в юд!!!
  // return this.steamService.addItemsToShop('76561199503137510', 252490)
}
