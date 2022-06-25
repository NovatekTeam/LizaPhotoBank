import { ObjectType, Field } from '@nestjs/graphql';
import { SolrFacets } from './solrFacets.entity';
import { SolrResponse } from './solrReponse.entity';
import { SolrResponseHeader } from './solrResponseHeader.entity';
    
@ObjectType()
export class SolrPaginated {
  @Field(() => SolrResponseHeader, { description: 'Заголовок'  })
  responseHeader: SolrResponseHeader;

  @Field(() => SolrResponse, { description: 'Ответ'})
  response: SolrResponse;

  @Field(() => SolrFacets, { description: 'Фасеты'})
  facet_counts: SolrFacets;
  
}

