import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';

@ObjectType()
export class YdiskItems {
  @Field(() => String, { description: 'Имя файла' })
  name: string;

  @Field(() => String, { description: 'Ссылка для скачивания' })
  file: string;

  @Field(() => String, { description: 'Путь внутри яндекс диска' })
  path: string;

  @Field(() => String, { description: 'Ссылка на превью файла' })
  preview: string;

  @Field(() => String, { description: 'Тип файла' })
  media_type: string;

  @Field(() => Int, { description: 'Размер файла' })
  size: number;

  @Field(() => String, { description: 'Расширение файла' })
  mime_type: string;

  @Field(() => String, { description: 'Дата изменения' })
  modified: string;
   

}

