import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { YdiskService } from './ydisk.service';
import { YdiskPagination } from './entities/ydiskPagination.entity';

@Resolver(() => YdiskPagination)
export class YdiskResolver {
  constructor(private readonly ydiskService: YdiskService) {}

 
  @Query(() => YdiskPagination, { name: 'ydiskPagination' })
  async findAll() {
    return this.ydiskService.findAll();
    
  }



}
