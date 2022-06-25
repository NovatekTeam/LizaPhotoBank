import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MediaDbModule } from 'src/media-db/media-db.module';
import { SolrResolver } from './solr.resolver';
import { SolrService } from './solr.service';



@Module({
  imports: [HttpModule, MediaDbModule],
  providers: [SolrService,SolrResolver],
  exports: [SolrService]
})
export class SolrModule { }
