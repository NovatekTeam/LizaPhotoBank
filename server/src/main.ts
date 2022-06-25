import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await app.get(ConfigService) 
  const port = config.get('SERVER_PORT')
  await app.listen(port);
  console.log(`Server run on ${port}`)
}
bootstrap();
