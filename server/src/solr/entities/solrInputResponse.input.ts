import {  ObjectType, PickType } from "@nestjs/graphql";
import { SolrPaginated } from "./solrPaginated.enitity";

@ObjectType()
export class solrInputResponse extends PickType(SolrPaginated, ['responseHeader'] as const) {}