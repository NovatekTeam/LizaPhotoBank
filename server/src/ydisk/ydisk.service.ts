import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';


@Injectable()
export class YdiskService {
  constructor(private httpService: HttpService){}


  async findAll() {
    return this.httpService.get(`https://cloud-api.yandex.net/v1/disk/resources?path=app%3A%2F`).pipe(
      map(res => res.data['_embedded'])
    )
    
  }



}
