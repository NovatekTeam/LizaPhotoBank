import { Field, ObjectType } from "@nestjs/graphql";

    
@ObjectType()
export class SolrFacetsFields {
  @Field(() => [String], { nullable: true})
  media_name?: string[];

  @Field(() => [String], {  nullable: true })
  media_path?: string[];

  @Field(() => [String], {  nullable: true })
  media_type?: string[];

  @Field(() => [String], { nullable: true})
  media_size?: string[];

  @Field(() => [String], {  nullable: true})
  title?: string[];
  
  @Field(() => [String], { nullable: true })
  media_tags?: string[];
 
  
}