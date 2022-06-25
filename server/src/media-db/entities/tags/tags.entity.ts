import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { Media } from "../media/media.entity";
import { TagsCount } from "./tags-count.entity";

@ObjectType()
export class Tags {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    tagGroup!: string;

    @Field(() => String, {nullable:false})
    tagName!: string;

    @Field(() => Int, {nullable:true})
    tagCode!: number | null;

    @Field(() => String, {nullable:false})
    tagDes!: string;

    @Field(() => [Media], {nullable:true})
    medias?: Array<Media>;

    @Field(() => TagsCount, {nullable:false})
    _count?: TagsCount;
}