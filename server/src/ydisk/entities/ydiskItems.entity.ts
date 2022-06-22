import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class YdiskItems {
  @Field(() => String, { description: 'Имя файла' })
  name: string;

  @Field(() => String, { description: 'Ссылка для скачивания' })
  file: string;

  @Field(() => String, { description: 'Путь внутри яндекс диска' })
  path: string;

  @Field(() => String, { description: 'Превью файла' })
  preview: String;
}



// "name": "gfdg.xlsx",
//         "exif": {},
//         "created": "2022-06-22T12:38:13+00:00",
//         "resource_id": "591417789:cf9a23d94ae3450110a501a6234f41797970e48816012a80c5ad915091bc805f",
//         "modified": "2022-06-22T12:38:13+00:00",
//         "mime_type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//         "file": "https://downloader.disk.yandex.ru/disk/83683e36597e7ff6ca2a96355aea80f75059c23ce60d3d573eb4a5335cb24419/62b3457b/K7Z9rlSG2lqvs0_ZganLD1mNZZaz-rjk7o3rvJ3jLlMOyKIZOucrJt9ZDTOmrLJbrsx4tvLJEAK6XynNHdTvlw%3D%3D?uid=591417789&filename=gfdg.xlsx&disposition=attachment&hash=&limit=0&content_type=application%2Fvnd.openxmlformats-officedocument.spreadsheetml.sheet&owner_uid=591417789&fsize=23868&hid=c2c52bf09ae27a703825303ec9ca3663&media_type=document&tknv=v2&etag=044ced5378710f33a2acaeb1a9a3a1c3",
//         "media_type": "document",
//         "preview": "https://downloader.disk.yandex.ru/preview/00b2f348f7e7bdf5242c9a3c0ec14f321ba7c47ea071a9afbe00f45c010e3ad5/inf/4EK9k8-HHkUTcfOxO2Hvy-PFw_fOSBA1J6W2cavpKVTVRBNDXQv_ONT8T-9ImHCLkyEay24U3qqgFxOXnn9NOg%3D%3D?uid=591417789&filename=gfdg.xlsx&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=591417789&tknv=v2&size=S&crop=0",
//         "path": "disk:/Приложения/YaDiskHack/gfdg.xlsx",
//         "sha256": "ca53c4d858e402165debb3816a81e5e50f5947167729b61d5f2e3e0e3d9a6d71",
//         "type": "file",
//         "md5": "044ced5378710f33a2acaeb1a9a3a1c3",
//         "revision": 1655901493631003