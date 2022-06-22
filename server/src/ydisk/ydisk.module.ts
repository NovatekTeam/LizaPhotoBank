import { Module } from '@nestjs/common';
import { YdiskService } from './ydisk.service';
import { YdiskResolver } from './ydisk.resolver';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [HttpModule.register({
    headers: { 'Authorization': `OAuth AQAAAAAjQFG9AAgAciRqjhqyQ0UYiNkggsM6reE` }
  })],
  providers: [YdiskResolver, YdiskService]
})
export class YdiskModule { }
