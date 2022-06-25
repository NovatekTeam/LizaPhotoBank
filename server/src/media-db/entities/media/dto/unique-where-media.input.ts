import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class MediaWhereUniqueInput {

    @Field(() => Int, {nullable:true})
    id?: number;
}