import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TagsCount {

    @Field(() => Int, {nullable:false})
    medias?: number;
}
