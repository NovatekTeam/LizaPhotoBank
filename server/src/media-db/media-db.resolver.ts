import { Resolver, Args, Mutation, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Media } from './entities/media/media.entity';
import { MediaDbService } from './media-db.service';
import { UpdateOneMediaArgs } from './entities/media/dto/update-one-media.args';
import { MediaWhereUniqueInput } from './entities/media/dto/unique-where-media.input';
import { Tags } from './entities/tags/tags.entity';

@Resolver(() => Media)
export class MediaResolver {
  constructor(private readonly mediaDbService: MediaDbService) {}

  @Query(() => Media, { name: 'MediaQuery' })
  findMedia(@Args('args', { type: () => MediaWhereUniqueInput }) args: MediaWhereUniqueInput) {
    return this.mediaDbService.findMedia(args)
  }

  @Mutation(() => Media)
  updateMedia(@Args() mediaArgs: UpdateOneMediaArgs) {
    return this.mediaDbService.updateMedia(mediaArgs)
  }

  @ResolveField('tags', returns => [Tags])
  getPosts(@Parent() media: Media) {
    const { id } = media;
    return this.mediaDbService.findMediaTags(id)
  }



}
