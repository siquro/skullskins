import { NestFactory } from '@nestjs/core';
import { AppModule } from './models/app/app.module';
import { APP_PORT } from '@st/common';
import { NestExpressApplication } from '@nestjs/platform-express';

const GATEWAY_CORE_WHITELIST = [
  'http://localhost:3000'
]
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: GATEWAY_CORE_WHITELIST,
    credentials: true,
  });

  await app.listen(APP_PORT);
}
bootstrap();
