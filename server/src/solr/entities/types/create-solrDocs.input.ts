import { ObjectType, Field, ID, Int, InputType } from '@nestjs/graphql';

@InputType()
export class PutSolrDocsInput {
    @Field(() => ID, { description: 'ID документа' })
    id: string;

    @Field(() => String, { description: 'Имя файла', nullable: true})
    media_name?: number;

    @Field(() => String, { description: 'Путь до файла', nullable: true })
    media_path?: string;

    @Field(() => String, { description: 'Тип файла', nullable: true })
    media_type?: string;

    @Field(() => String, { description: 'Размер файла' , nullable: true})
    media_size?: string;

    @Field(() => String, { description: 'Заголовок' , nullable: true})
    title?: string;
    
    @Field(() => [String], { description: 'Тэги', nullable: true })
    media_tags?: string[];

}