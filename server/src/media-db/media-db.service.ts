
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MediaCreateInput } from './entities/media/dto/create-media.input';
import { MediaWhereUniqueInput } from './entities/media/dto/unique-where-media.input';
import { UpdateOneMediaArgs } from './entities/media/dto/update-one-media.args';
import { TagsCreateWithoutMediasInput } from './entities/tags/dto/create-tags.input';
import { UpdateOneTagsArgs } from './entities/tags/dto/update-one-tags.args';


@Injectable()
export class MediaDbService {
  constructor(
    private prisma: PrismaService) { }

  createMedia(createMedia: MediaCreateInput) {
    return this.prisma.media.create({ data: createMedia })
  }

  createMedias(createMedias: MediaCreateInput[]) {
    return this.prisma.media.createMany({data: createMedias})
  }

  findMediaById(args: MediaWhereUniqueInput) {
    return this.prisma.media.findUnique({ where: args })
  }

  updateMedia(updateMediaArgs: UpdateOneMediaArgs) {
    return this.prisma.media.update(updateMediaArgs)
  }

  allMediasWithTags(){
    return this.prisma.media.findMany({
      select : {
        id: true,
        mediaPreviewUrl: true,
        tags : {
          select : {
            tagName : true
          }
        }      
      }
    })
  }

  


  createTags(createTags: TagsCreateWithoutMediasInput) {
    return this.prisma.tags.create({ data: createTags })
  }

  updateTags(updateTags: UpdateOneTagsArgs) {
    return this.prisma.tags.update(updateTags)
  }

  findAllTags() {
    return this.prisma.tags.findMany({
      include: {
        _count :{
          select : {medias : true}
        }
      }
    })
  }

 

  findMediaTags(mediaId: number) {
    return this.prisma.tags.findMany({
      where: {
        medias: {
          some: {
            id: mediaId
          }
        }
      }
    })
  }

}
