import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThreadController } from './controllers/thread.controller';
import { ThreadRepository } from './repositories/thread.repository';
import { Thread, ThreadSchema } from './schemas/thread.schema';
import { ThreadService } from './services/thread.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Thread.name, schema: ThreadSchema },
    ]),
  ],
  controllers: [ThreadController],
  providers: [ThreadService, ThreadRepository],
})
export class ThreadModule {}
