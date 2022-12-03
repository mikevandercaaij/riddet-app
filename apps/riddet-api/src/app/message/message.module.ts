import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageController } from './message.controller';
import { Message, MessageSchema } from './message.schema';
import { MessageService } from './message.service';

@Module({
    imports: [
        MongooseModule.forFeature([
          { name: Message.name, schema: MessageSchema },
        ]),
      ],
    providers: [MessageService],
    controllers: [MessageController],
    exports: [MessageService]
})
export class MessageModule {}