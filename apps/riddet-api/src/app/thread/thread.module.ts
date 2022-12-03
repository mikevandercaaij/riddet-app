import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThreadController } from './thread.controller';
import { Thread, ThreadSchema } from './thread.schema';
import { ThreadService } from './thread.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Thread.name, schema: ThreadSchema },
    ]),
  ],
  controllers: [ThreadController],
  providers: [ThreadService],
})
export class ThreadModule {}
