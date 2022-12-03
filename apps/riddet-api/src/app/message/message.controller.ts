import { Controller, Get, HttpException, HttpStatus, Logger, Param } from "@nestjs/common";
import { ParseObjectIdPipe } from "../shared/pipes/ParseObjectIdPipe";
import { Message } from "./message.schema";
import { MessageService } from "./message.service";

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('communities/:communityId/threads/:threadId/messages/:messageId')
  async getById(
    @Param('threadId', ParseObjectIdPipe) threadId: string): Promise<Message> {
      
    Logger.log(`Getting message with id: ${threadId} (READ)`);

    const message = await this.messageService.getById(threadId);

    if(!message) {
      throw new HttpException(`Message with id of ${threadId} doesn't exist!`, HttpStatus.NOT_FOUND);
    }

    return message;
    }

    @Get('communities/:communityId/threads/:threadId/messages')
    async getAll(
      @Param('communityId', ParseObjectIdPipe) communityId : string,
      @Param('threadId', ParseObjectIdPipe) threadId : string
      ) : Promise<Message[]> {
        
      Logger.log(`Getting all messages (READ)`);
      return await this.messageService.getAll(communityId, threadId);
      }

    
  }