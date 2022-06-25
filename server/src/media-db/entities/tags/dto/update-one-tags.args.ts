import { ArgsType, Field } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { TagsWhereUniqueInput } from "./unique-where-tags.input";
import { TagsUpdateInput } from "./update-tags.input";

@ArgsType()
export class UpdateOneTagsArgs {

    @Field(() => TagsUpdateInput, {nullable:false})
    @Type(() => TagsUpdateInput)
    data!: TagsUpdateInput;

    @Field(() => TagsWhereUniqueInput, {nullable:false})
    @Type(() => TagsWhereUniqueInput)
    where!: TagsWhereUniqueInput;
}