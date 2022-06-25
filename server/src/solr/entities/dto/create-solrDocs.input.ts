import { ObjectType, Field, ID, Int, InputType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@InputType()
export class SolrDocsInput {
    @Field(() => ID, { description: 'ID документа' })
    id!: number;

    @Field(() => String, { description: 'Имя файла', nullable: true})
    media_name!: string;

    @Field(() => String, { description: 'Путь до файла', nullable: true })
    media_path?: string;

    @Field(() => String, { description: 'Тип файла', nullable: true })
    media_type!: string;

    @Field(() => Int, { description: 'Размер файла' , nullable: true})
    media_size?: number;

    @Field(() => String, { description: 'Заголовок' , nullable: true})
    title?: string;

    @Field(() => String, { description: 'Превью документа' , nullable: true})
    media_preview_url?: string;
    
    @Field(() => [String], { description: 'Тэги', nullable: true })
    media_tags?: string[];

}