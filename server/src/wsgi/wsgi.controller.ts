import { Controller, Get } from '@nestjs/common';
import { WsgiService } from './wsgi.service';

@Controller('wsgi')
export class WsgiController {
  constructor(private readonly wsgiService: WsgiService) {}

  @Get()
  getResult(){
    return this.wsgiService.findAll()
  }
}
