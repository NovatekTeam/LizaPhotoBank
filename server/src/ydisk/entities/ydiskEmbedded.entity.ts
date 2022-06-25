import { Field, Int, ObjectType } from "@nestjs/graphql";
import { YdiskItems } from "./ydiskItems.entity";

@ObjectType()
export class YDiskPaginated {
@Field(() => String, { description: 'Сортировка' })
  sort: string;

  @Field(() => [YdiskItems], { description: 'Элементы' })
  items: [YdiskItems];

  @Field(() => Int, { description: 'Ограничение' })
  limit: number;

  @Field(() => Int, { description: 'Офсет' })
  offset: number;

  @Field(() => String, { description: 'Путь на диске' })
  path: string;

  @Field(() => Int, { description: 'Всего файлов' })
  total: number;

  @Field(() => String, { description: 'Описание' })
  info: string;
}