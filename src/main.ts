import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initIO } from './libs/socket';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const server = await app.listen(3000);

  initIO(server);
}
bootstrap();
