import { ObjectType, Field, Int } from '@nestjs/graphql';
import { YDiskPaginated } from './ydiskEmbedded.entity';
@ObjectType()
export class YDiskResource {

  @Field(() => YDiskPaginated, { description: 'Вложенные элементы' })
  _embedded: YDiskPaginated
    
}




