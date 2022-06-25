import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MediaResolver } from './media-db.resolver';
import { MediaDbService } from './media-db.service';


@Module({
  imports: [PrismaModule],
  providers: [MediaDbService, MediaResolver],
  exports: [MediaDbService]
})
export class MediaDbModule { }
