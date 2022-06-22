import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class WsgiService {
    constructor(private httpService:HttpService) {}

    findAll() {
        return this.httpService.get('http://wsgi-liza-alert:5000/wsgi/test').pipe(
           map(res => res.data)
        );
    }

}
