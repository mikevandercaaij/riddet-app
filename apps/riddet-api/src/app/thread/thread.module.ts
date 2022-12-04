import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommunityModule } from '../community/community.module';
import { UserModule } from '../user/user.module';
import { ThreadController } from './thread.controller';
import { Thread, ThreadSchema } from './thread.schema';
import { ThreadService } from './thread.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Thread.name, schema: ThreadSchema },
    ]), CommunityModule, UserModule
  ],
  controllers: [ThreadController],
  providers: [ThreadService, MongooseModule],
})
export class ThreadModule {}
