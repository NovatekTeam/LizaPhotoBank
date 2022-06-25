import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { SolrDocs } from './entities/solrDocs.entity';
import { SolrPaginated } from './entities/solrPaginated.enitity';
import { SolrResponseHeader } from './entities/solrResponseHeader.entity';
import { PutSolrDocsInput } from './entities/types/create-solrDocs.input';
import { solrInputResponse } from './entities/solrInputResponse.input';
import { solrParamInput } from './entities/types/solrParam.input';
import { SolrService } from './solr.service';

@Resolver(() => SolrPaginated)
export class SolrResolver {
  constructor(private readonly solrService: SolrService) {}

 
  @Query(() => SolrPaginated, { name: 'SolrQuery' })
  async findByDefault(@Args('params', { type: () => solrParamInput }) params: solrParamInput) {
    return this.solrService.findByDefault(params);
  }

  @Mutation(() => solrInputResponse)
  async putSolrDocs(@Args('solrDocs', { type: () => [PutSolrDocsInput] }) solrDocs: PutSolrDocsInput[]) {
    return this.solrService.putSolr(solrDocs);
  }



}
