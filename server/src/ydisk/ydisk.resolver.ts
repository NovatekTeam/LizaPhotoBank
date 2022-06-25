import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { YdiskService } from './ydisk.service';
import { YDiskResource } from './entities/ydiskRecource.entity';

@Resolver(() => YDiskResource)
export class YdiskResolver {
  constructor(private readonly ydiskService: YdiskService) {}

 
  @Query(() => String, { name: 'syncFiles' })
  async syncFiles(@Args('path', { type: () => String }) path: string) {
    return this.ydiskService.syncFiles(path);
    
  }



}
