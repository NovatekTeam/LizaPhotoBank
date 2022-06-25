import { Field, ID, Int, ObjectType } from "@nestjs/graphql"
import { Tags } from "../tags/tags.entity";


@ObjectType()
export class Media {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    mediaName!: string;

    @Field(() => String, {nullable:false})
    mediaPath!: string;

    @Field(() => Int, {nullable:false})
    mediaSize!: number;

    @Field(() => String, {nullable:false})
    mediaType!: string;

    @Field(() => String, {nullable:false})
    mediaPreviewUrl!: string;

    @Field(() => [Tags], {nullable:true})
    tags?: Array<Tags>;

  
}