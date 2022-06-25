import { ArgsType, Field } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { MediaWhereUniqueInput } from "./unique-where-media.input";
import { MediaUpdateInput } from "./update-media.input";

@ArgsType()
export class UpdateOneMediaArgs {

    @Field(() => MediaUpdateInput, {nullable:false})
    @Type(() => MediaUpdateInput)
    data!: MediaUpdateInput;

    @Field(() => MediaWhereUniqueInput, {nullable:false})
    @Type(() => MediaWhereUniqueInput)
    where!: MediaWhereUniqueInput;
}