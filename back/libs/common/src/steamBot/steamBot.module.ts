import {Module} from "@nestjs/common";
import {SteamBotService} from "./steamBot.service";


@Module({
    imports: [],
    providers: [SteamBotService],
    exports: [SteamBotService],
})
export class SteamBotModule {}