import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

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

    @Field(() => String, { description: 'Url превью' , nullable: true})
    media_preview_url: string;

    @Field(() => String, { description: 'Комментарии' , nullable: true})
    title: string;
    
    @Field(() => [String], { description: 'Тэги', nullable: true })
    media_tags: string[];

    @Field(() => Int, { description: 'Версия' })
    _version_: number;

}


// export class SolrDocsToMedia {
//     @Expose()
//     media_name
// }

