
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import solrConfig from 'src/config/solr.config';
import { map } from 'rxjs';
import { SolrDocsInput } from './entities/dto/create-solrDocs.input';
import { solrParamInput } from './entities/dto/solrParam.input';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { MediaCreateInput } from 'src/media-db/entities/media/dto/create-media.input';
import { MediaUpdateInput } from 'src/media-db/entities/media/dto/update-media.input';
import { MediaDbService } from 'src/media-db/media-db.service';
import { UpdateOneMediaArgs } from 'src/media-db/entities/media/dto/update-one-media.args';


@Injectable()
export class SolrService {
  constructor(
    @Inject(solrConfig.KEY)
    private sConfig: ConfigType<typeof solrConfig>,
    private httpService: HttpService,
    private mediaDbService: MediaDbService
  ) {
  }



  findByDefault(solrParams: solrParamInput) {
    const addParams = { ...solrParams, facet: true }
    const facetsString = 'facet.field=media_name&facet.field=media_path&facet.field=title&facet.field=media_type&facet.field=media_tags'
    return this.httpService.get(`${this.sConfig.url}${this.sConfig.core}/select?${facetsString}`, { params: addParams }).pipe(
      map(res =>
        res.data
      )
    )
  }


  addSolrDocs(docs: SolrDocsInput[]) {

    return this.httpService.axiosRef.post(`${this.sConfig.url}${this.sConfig.core}/update?overwrite=true&wt=json&commit=true`, JSON.stringify(docs), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }



  async updateSolrDocs(docs: SolrDocsInput) {

    Object.keys(docs).map(key => {
      if (key !== "id") {
        docs[key] = {
          set: docs[key]
        }
      }
    })


    const res = await this.httpService.axiosRef.post(`${this.sConfig.url}${this.sConfig.core}/update?commit=true`, JSON.stringify([docs]), {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return res.data



  }
}
