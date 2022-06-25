import { Module } from '@nestjs/common';
import { YdiskService } from './ydisk.service';
import { YdiskResolver } from './ydisk.resolver';
import { HttpModule } from '@nestjs/axios';
import { MediaDbService } from 'src/media-db/media-db.service';
import { MediaDbModule } from 'src/media-db/media-db.module';


@Module({
  imports: [MediaDbModule,HttpModule.register({
    headers: { 'Authorization': `OAuth AQAAAAAjQFG9AAgAciRqjhqyQ0UYiNkggsM6reE` }
  })],
  providers: [YdiskResolver, YdiskService]
})
export class YdiskModule { }
