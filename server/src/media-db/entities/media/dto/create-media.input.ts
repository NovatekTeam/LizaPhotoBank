import { Field, InputType, Int } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { TagsCreateWithoutMediasInput } from "../../tags/dto/create-tags.input";
import { TagsConnectedMediasInput } from "./connect-tags-media.input";


@InputType()
export class MediaCreateInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:false})
    mediaName!: string;

    @Field(() => String, {nullable:false})
    mediaPath!: string;

    @Field(() => Int, {nullable:false})
    mediaSize!: number;

    @Field(() => String, {nullable:false})
    @Type(() => String)
    mediaType!: string;

    @Field(() => TagsConnectedMediasInput, {nullable:true})
    @Type(() => TagsConnectedMediasInput)
    tags?: TagsConnectedMediasInput;
}