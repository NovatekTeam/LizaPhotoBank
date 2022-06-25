import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {  plainToInstance } from 'class-transformer';
import { createWriteStream } from 'fs';
import { MediaCreateInput } from 'src/media-db/entities/media/dto/create-media.input';
import { MediaDbService } from 'src/media-db/media-db.service';
import { SolrDocsInput } from 'src/solr/entities/dto/create-solrDocs.input';
import { SolrService } from 'src/solr/solr.service';
import { Stream } from 'stream';
import { YDiskResource } from './entities/ydiskRecource.entity';
import * as fs from 'fs'


@Injectable()
export class YdiskService {
  constructor(
    private httpService: HttpService,
    private solrService: SolrService,
    private mediaDbService: MediaDbService) { }

  createCheckpoint() {
    const cp = new Date()
    fs.writeFileSync('./tmp/checkpoint', cp.toISOString());
    return cp
  }

  fetchFromYdisk(param: any) {
    return this.httpService.axiosRef.get<YDiskResource>(`https://cloud-api.yandex.net/v1/disk/public/resources`, { params: param })
  }

  async syncFiles() {
    let cp: Date = null
    try {
      cp = new Date(fs.readFileSync('./tmp/checkpoint', 'utf8'));
    } catch (error) {
      cp = this.createCheckpoint()
    }
    let yparam = { public_key: "https://disk.yandex.ru/d/L80wUZQrcBDVIQ/dataset", solr: 'modified asc', limit: 0, offset: 0 }
    const totalRes = await this.fetchFromYdisk(yparam)
    yparam.limit = 20

    const pages = Math.floor(totalRes.data._embedded.total / yparam.limit)
  

    for (let page = 0; page <= Math.max(pages-1,0); page++){   
      yparam.offset = yparam.limit * page
      const res = await this.fetchFromYdisk(yparam)
      const docs = res.data._embedded.items.filter(item => new Date(item.modified) > cp)
      docs.forEach(async (item) => {
        const writer = createWriteStream(`./tmp/${item.name}`)
        const response = await this.httpService.axiosRef.get<Stream>(item.file, { responseType: 'stream' })

        response.data.pipe(writer)

        writer.on('finish', async () => {
          const solrDoc = new SolrDocsInput()
          solrDoc.media_name = item.name
          solrDoc.media_path = item.path
          solrDoc.media_size = item.size
          solrDoc.media_type = item.media_type
          solrDoc.media_preview_url = item.preview
          const media = plainToInstance(MediaCreateInput, solrDoc)
          const returnMedia = await this.mediaDbService.createMedia(media)
          solrDoc.id = returnMedia.id
          await this.solrService.updateSolrDocs([solrDoc])
          writer.end()
        });
        writer.on('error', (error) => {
          console.log(error)
          writer.end()
        });

      });
    }
  




    return `Files synced`
  }


}




