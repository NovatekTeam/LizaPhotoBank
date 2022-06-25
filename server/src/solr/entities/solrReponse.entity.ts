
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SolrDocs } from './solrDocs.entity';

@ObjectType()
export class SolrResponse {
    @Field(() => Int, { description: 'Кол-во совпадений', nullable: true })
    numFound: number;

    @Field(() => Int, { description: '' , nullable: true })
    start: number;

    @Field(() => Boolean, { description: 'Точное совпадение', nullable: true })
    numFoundExact: boolean;

    @Field(() => [SolrDocs], { description: 'Найденные документы', nullable: true }) 
    docs: SolrDocs[];

}