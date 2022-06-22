import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { WsgiModule } from './wsgi/wsgi.module';
import { YdiskModule } from './ydisk/ydisk.module';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    playground: true,
    autoSchemaFile: true,
  }), WsgiModule, YdiskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
