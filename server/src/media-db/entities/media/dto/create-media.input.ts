import { Field, InputType, Int } from "@nestjs/graphql";
import { Expose, Transform, Type } from "class-transformer";
import { TagsConnectedMediasInput } from "./connect-tags-media.input";


@InputType()
export class MediaCreateInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Expose({name : 'media_name'})
    @Field(() => String, {nullable:false})
    mediaName!: string;

    @Expose({name : 'media_path'})
    @Field(() => String, {nullable:false})
    mediaPath!: string;

    @Expose({name : 'media_size'})
    @Field(() => Int, {nullable:false})
    mediaSize!: number;

    @Expose({name : 'media_type'})
    @Field(() => String, {nullable:false})
    @Type(() => String)
    mediaType!: string;

    @Expose({name : 'media_preview_url'})
    @Field(() => String, {nullable:false})
    @Type(() => String)
    mediaPreviewUrl!: string;

    
    @Field(() => TagsConnectedMediasInput, {nullable:true})
    @Type(() => TagsConnectedMediasInput)
    tags?: TagsConnectedMediasInput;
}