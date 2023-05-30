import { Module } from "@nestjs/common";
import { SteamBotService } from "./steamBot.service";
import { PrismaService } from "@st/common";


@Module({
    imports: [],
    providers: [SteamBotService, PrismaService],
    exports: [SteamBotService],
})
export class SteamBotModule { }