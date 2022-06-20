import { Module } from '@nestjs/common';
import { WsgiService } from './wsgi.service';
import { WsgiController } from './wsgi.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [WsgiController],
  providers: [WsgiService]
})
export class WsgiModule {}
