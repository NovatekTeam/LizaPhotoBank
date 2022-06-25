import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { SolrDocs } from './entities/solrDocs.entity';
import { SolrPaginated } from './entities/solrPaginated.enitity';
import { SolrResponseHeader } from './entities/solrResponseHeader.entity';
import { SolrDocsInput } from './entities/dto/create-solrDocs.input';
import { solrInputResponse } from './entities/solrInputResponse.input';
import { solrParamInput } from './entities/dto/solrParam.input';
import { SolrService } from './solr.service';

@Resolver(() => SolrPaginated)
export class SolrResolver {
  constructor(private readonly solrService: SolrService) {}

 
  @Query(() => SolrPaginated, { name: 'SolrQuery' })
  async findByDefault(@Args('params', { type: () => solrParamInput }) params: solrParamInput) {
    return this.solrService.findByDefault(params);
  }

  @Mutation(() => solrInputResponse,  { name: 'solrMediaMutation' })
  async updateMediaDocs(@Args('solrDocs', { type: () => [SolrDocsInput] }) solrDocs: SolrDocsInput[]) {
    return this.solrService.updateMediaWDocs(solrDocs);
  }



}
