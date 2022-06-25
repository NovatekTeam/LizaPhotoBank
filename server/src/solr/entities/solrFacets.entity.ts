import { Field, ObjectType } from "@nestjs/graphql";
import { SolrFacetsFields } from "./solrFacetsFields.entity";

    
@ObjectType()
export class SolrFacets {
  @Field(() => SolrFacetsFields, { description: 'Поля фасетов'  })
  facet_fields: SolrFacetsFields;

  
}



