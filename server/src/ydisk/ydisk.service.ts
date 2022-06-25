import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { createWriteStream } from 'fs';
import { MediaCreateInput } from 'src/media-db/entities/media/dto/create-media.input';
import { MediaDbService } from 'src/media-db/media-db.service';
import { Stream } from 'stream';
import { YDiskResource } from './entities/ydiskRecource.entity';


@Injectable()
export class YdiskService {
  constructor(
    private httpService: HttpService,
    private mediaDbService: MediaDbService) { }

   async syncFiles() {
    const res = await this.httpService.axiosRef.get<YDiskResource>(`https://cloud-api.yandex.net/v1/disk/resources?path=app%3A%2F`)

    res.data._embedded.items.forEach(async (item) => {
      const writer = createWriteStream(`./tmp/${item.name}`)
      const response = await this.httpService.axiosRef.get<Stream>(item.file, { responseType: 'stream' })
         
      response.data.pipe(writer)

      writer.on('finish', async () => { 
        console.log(item.name)
        const media = new MediaCreateInput()
        media.mediaName = item.name
        media.mediaPath = item.path
        media.mediaSize = item.size
        media.mediaType = item.media_type        
        await this.mediaDbService.createMedia(media)          
      });
      writer.on('error', (error) => { 
        console.log(error)
       });
      
    });

    return `Synced files 222`
  }   


}




