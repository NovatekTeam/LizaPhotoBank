import { Module } from '@nestjs/common';
import { WsgiModule } from './wsgi/wsgi.module';

@Module({
  imports: [WsgiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
