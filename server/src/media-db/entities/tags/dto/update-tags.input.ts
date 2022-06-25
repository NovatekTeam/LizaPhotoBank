import { InputType, PartialType } from "@nestjs/graphql";
import { TagsCreateWithoutMediasInput } from "./create-tags.input";

@InputType()
export class TagsUpdateInput extends PartialType(TagsCreateWithoutMediasInput){}