import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Req } from "@nestjs/common";
import { ParseObjectIdPipe } from "../shared/pipes/ParseObjectIdPipe";
import { Thread } from "../thread/thread.schema";
import { MessageDto } from "./message.dto";
import { Message } from "./message.schema";
import { MessageService } from "./message.service";

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('communities/:communityId/threads/:threadId/messages/:messageId')
  async getById(
    @Param('communityId', ParseObjectIdPipe) communityId : string,
    @Param('threadId', ParseObjectIdPipe) threadId: string,
    @Param('messageId', ParseObjectIdPipe) messageId: string
    ): Promise<Message> {
      
    Logger.log(`Getting message with id: ${messageId} (READ)`);

    return await this.messageService.getById(communityId, threadId, messageId);
    }

    @Get('communities/:communityId/threads/:threadId/messages')
    async getAll(
      @Param('communityId', ParseObjectIdPipe) communityId : string,
      @Param('threadId', ParseObjectIdPipe) threadId : string
      ) : Promise<Message[]> {
        
      Logger.log(`Getting all messages (READ)`);
      
      return await this.messageService.getAll(communityId, threadId);
    }

    @Post('communities/:communityId/threads/:threadId/messages')
    async create(
      @Param('communityId', ParseObjectIdPipe) communityId : string,
      @Param('threadId', ParseObjectIdPipe) threadId : string,  
      @Req() req, 
      @Body() messageDto: MessageDto
      ) : Promise<Message> {
        
      Logger.log(`Getting all messages (READ)`);
      return await this.messageService.create(communityId, threadId, req, messageDto);
    }

    @Patch('communities/:communityId/threads/:threadId/messages/:messageId')
    async update(@Param('communityId', ParseObjectIdPipe) communityId: string,
    @Param('threadId', ParseObjectIdPipe) threadId: string,
    @Param('messageId', ParseObjectIdPipe) messageId : string,
    @Req() req,
    @Body() messageDto: MessageDto): Promise<Message> {
      Logger.log(`Getting thread with id: ${threadId} (UPDATE)`);

      return this.messageService.update(communityId, threadId, messageId, messageDto, req);
    }
  
    @Delete('communities/:communityId/threads/:threadId/messages/:messageId')
    async delete(@Param('communityId', ParseObjectIdPipe) communityId: string, 
    @Param('threadId', ParseObjectIdPipe) threadId: string, 
    @Param('messageId', ParseObjectIdPipe) messageId : string,
    @Req() req): Promise<Thread> {
  
      Logger.log(`Getting thread with id: ${threadId} from community with id: ${communityId} (DELETE)`);
      
      return this.messageService.delete(communityId, threadId, messageId, req);
    }

    @Post('communities/:communityId/threads/:threadId/messages/:messageId/like')
    async like(@Param('communityId', ParseObjectIdPipe) communityId : string,
     @Param('threadId', ParseObjectIdPipe) threadId : string,
     @Param('messageId', ParseObjectIdPipe) messageId : string,
     @Req() req): Promise<Message> {
        Logger.log(`Getting thread with id: ${threadId} (LIKE)`);
  
        return this.messageService.like(communityId, threadId, messageId, req);
    }
  }