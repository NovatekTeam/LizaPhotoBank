import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class TagsWhereUniqueInput {

    @Field(() => Int, {nullable:true})
    id?: number;
}
