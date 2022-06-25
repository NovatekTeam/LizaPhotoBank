import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import solrConfig from 'config/solr.config';
import { MediaDbModule } from './media-db/media-db.module';
import { PrismaModule } from './prisma/prisma.module';
import { SolrModule } from './solr/solr.module';
import { WsgiModule } from './wsgi/wsgi.module';
import { YdiskModule } from './ydisk/ydisk.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    playground: true,
    autoSchemaFile: true,
  }), 
  MediaDbModule,
  WsgiModule,
  YdiskModule,
  SolrModule,
  PrismaModule,  
ConfigModule.forRoot({
  envFilePath: `.env`,
  isGlobal: true,
  load: [solrConfig]
})],
  controllers: [],
  providers: [],
})
export class AppModule {}
