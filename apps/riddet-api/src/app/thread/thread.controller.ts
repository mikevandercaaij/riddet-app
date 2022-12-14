import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Req } from '@nestjs/common';
import { Public } from '../auth/auth.module';
import { ParseObjectIdPipe } from '../shared/pipes/ParseObjectIdPipe';
import { CreateThreadDto, UpdateThreadDto } from './thread-dto';
import { Thread } from "./thread.schema";
import { ThreadService } from './thread.service';

@Controller()
export class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

  @Public()
  @Get('communities/:communityId/threads/:threadId')
  async getById(
    @Param('communityId', ParseObjectIdPipe) communityId: string,
    @Param('threadId', ParseObjectIdPipe) threadId: string,
    ): Promise<Thread> {
    
    Logger.log(`Getting thread with id: ${threadId} from community with id of ${communityId} (READ)`);
    
    return await this.threadService.getById(communityId, threadId);
  }

  @Public()
  @Get('communities/:communityId/threads')
  async getAll(
    @Param('communityId', ParseObjectIdPipe) communityId : string): Promise<Thread[]> {

      Logger.log(`Getting all threads from community with an id of: ${communityId} (READ)`);

      return this.threadService.getAll(communityId);
    }

  @Post('communities/:communityId/threads')
  async create(@Param('communityId', ParseObjectIdPipe) communityId : string, 
  @Req() req, 
  @Body() createThreadDto: CreateThreadDto): Promise<Thread> {
      Logger.log(`Creating thread (CREATE)`);

      return this.threadService.create(createThreadDto, communityId, req);
  }

  @Patch('communities/:communityId/threads/:threadId')
  async update(@Param('communityId', ParseObjectIdPipe) communityId: string,
  @Param('threadId', ParseObjectIdPipe) threadId: string,
  @Req() req,
  @Body() updateThreadDto: UpdateThreadDto): Promise<Thread> {
    Logger.log(`Getting thread with id: ${threadId} (UPDATE)`);

    return this.threadService.update(communityId, threadId, req, updateThreadDto);
  }

  @Delete('communities/:communityId/threads/:threadId')
  async delete(@Param('communityId', ParseObjectIdPipe) communityId: string, 
  @Param('threadId', ParseObjectIdPipe) threadId: string, 
  @Req() req): Promise<Thread> {

    Logger.log(`Getting thread with id: ${threadId} from community with id: ${communityId} (DELETE)`);
    
    return this.threadService.delete(communityId, threadId, req);
  }

  @Post('communities/:communityId/threads/:threadId/upvote')
  async upvote(@Param('communityId', ParseObjectIdPipe) communityId : string,
   @Param('threadId', ParseObjectIdPipe) threadId : string,
   @Req() req): Promise<Thread> {
      Logger.log(`Creating thread (CREATE)`);

      return this.threadService.upvote(communityId, threadId, req);
  }

}