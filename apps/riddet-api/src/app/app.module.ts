import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommunityModule } from '../app/community/community.module';
import { ThreadModule } from '../app/thread/thread.module';
import { environment } from '../environments/environment.prod';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MongooseModule.forRoot( environment.DATABASE_CONNECTION ), CommunityModule, ThreadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
