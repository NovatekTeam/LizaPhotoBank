
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import solrConfig from 'src/config/solr.config';
import { map } from 'rxjs';
import { PutSolrDocsInput } from './entities/types/create-solrDocs.input';
import { solrParamInput } from './entities/types/solrParam.input';


@Injectable()
export class SolrService {
  constructor(
    @Inject(solrConfig.KEY)
    private sConfig: ConfigType<typeof solrConfig>,
    private httpService: HttpService,
    ) {  
  }
   

  findByDefault(solrParams: solrParamInput) {
    return this.httpService.get(`${this.sConfig.url}${this.sConfig.core}/select`, { params: solrParams }).pipe(
      map(res =>     
        res.data
      )
    )
  }

  putSolr(docs: PutSolrDocsInput[]){
    return this.httpService.post(`${this.sConfig.url}${this.sConfig.core}/update?overwrite=true&wt=json`, JSON.stringify(docs), { headers: {
      'Content-Type': 'application/json'
    }}).pipe(
      map(res => res.data)
    )
  }


}
