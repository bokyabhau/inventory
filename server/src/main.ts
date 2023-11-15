import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ROUTE_PREFIX} from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix(ROUTE_PREFIX);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
