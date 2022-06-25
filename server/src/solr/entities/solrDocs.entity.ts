import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class SolrDocs {
    @Field(() => ID, { description: 'ID документа' , nullable: false})
    id: string;

    @Field(() => String, { description: 'Имя файла', nullable: true})
    media_name: string;

    @Field(() => String, { description: 'Путь до файла', nullable: true })
    media_path: string;

    @Field(() => String, { description: 'Тип файла', nullable: true })
    media_type: string;

    @Field(() => String, { description: 'Размер файла' , nullable: true})
    media_size: string;

    @Field(() => String, { description: 'Заголовок' , nullable: true})
    title: string;
    
    @Field(() => [String], { description: 'Тэги', nullable: true })
    media_tags: string[];

    @Field(() => Int, { description: 'Версия' })
    _version_: number;

}

