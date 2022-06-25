import { Field, InputType, Int } from "@nestjs/graphql";
import { Type } from "class-transformer";

@InputType()
export class solrParamInput {

    @Field(() => String, {nullable:true})
    @Type(() => String)
    q?: string;

    
    @Field(() => Int, {nullable:true})
    @Type(() => Number)
    start?: number;
   
}
