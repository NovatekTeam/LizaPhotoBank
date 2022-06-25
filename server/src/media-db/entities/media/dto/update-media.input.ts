import { InputType, PartialType } from "@nestjs/graphql";
import { MediaCreateInput } from "./create-media.input";

@InputType()
export class MediaUpdateInput extends PartialType(MediaCreateInput){}