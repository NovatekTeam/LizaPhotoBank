import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SolrResolver } from './solr.resolver';
import { SolrService } from './solr.service';



@Module({
  imports: [HttpModule],
  providers: [SolrService,SolrResolver]
})
export class SolrModule { }
