import { Field, InputType, Int } from "@nestjs/graphql";
import { MediaCreateInput } from "../../media/dto/create-media.input";

@InputType()
export class TagsCreateWithoutMediasInput {

    @Field(() => String, {nullable:false})
    tagGroup!: string;

    @Field(() => String, {nullable:false})
    tagName!: string;

    @Field(() => Int, {nullable:true})
    tagCode?: number;

    @Field(() => String, {nullable:false})
    tagDes!: string;
}

