import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SolrResponseHeader {
    @Field(() => Int, { description: 'Статус' })
    status: number;

    @Field(() => Int, { description: 'Время ответа' })
    QTime: number;

    // @Field(() => String, { description: 'Поисковой запрос' })
    // q: string;

    // @Field(() => Boolean, { description: 'Вложенность' })
    // indent: boolean;

    // @Field(() => String, { description: 'Опции поиска' })
    // "q.op": string;


}