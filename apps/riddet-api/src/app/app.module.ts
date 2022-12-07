import { AuthModule } from './auth/auth.module';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { APP_GUARD } from '@nestjs/core';
import { CommunityModule } from '../app/community/community.module';
import { ThreadModule } from '../app/thread/thread.module';
import { environment } from '../environments/environment.prod';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { CategoryModule } from './category/category.module';
import { MessageModule } from './message/message.module';
import { Neo4jModule } from './neo4j/neo4j.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(environment.DATABASE_CONNECTION),
    Neo4jModule.forRoot({
      scheme: 'bolt',
      host: '127.0.0.1',
      port: 7687,
      username: 'neo4j',
      password: 'neo',
    }),
    CommunityModule,
    ThreadModule,
    UserModule,
    AuthModule,
    CategoryModule,
    MessageModule,

  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AppService,
  ],
})
export class AppModule {}
