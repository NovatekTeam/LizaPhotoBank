import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SolrResponse } from './solrReponse.entity';
import { SolrResponseHeader } from './solrResponseHeader.entity';
    
@ObjectType()
export class SolrPaginated {
  @Field(() => SolrResponseHeader, { description: 'Заголовок'  })
  responseHeader: SolrResponseHeader;

  @Field(() => SolrResponse, { description: 'Ответ'})
  response: SolrResponse;
  
}

