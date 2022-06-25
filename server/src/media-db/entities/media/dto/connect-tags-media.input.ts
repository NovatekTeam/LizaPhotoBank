import { Field, InputType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { TagsWhereUniqueInput } from "../../tags/dto/unique-where-tags.input";

@InputType()
export class TagsConnectedMediasInput {  

    @Field(() => [TagsWhereUniqueInput], {nullable:true})
    @Type(() => TagsWhereUniqueInput)
    connect?: Array<TagsWhereUniqueInput>;
}