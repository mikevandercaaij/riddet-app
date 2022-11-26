import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Patch, Post } from '@nestjs/common';
import { Public } from '../auth/auth.module';
import { ParseObjectIdPipe } from '../shared/pipes/ParseObjectIdPipe';
import { ThreadDto } from './thread-dto';
import { Thread } from "./thread.schema";
import { ThreadService } from './thread.service';

@Controller()
export class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

  @Public()
  @Get('threads/:id')
  async getThread(
    @Param('id', ParseObjectIdPipe) id: string): Promise<Thread> {
      
    Logger.log(`Getting thread with id: ${id} (READ)`);

    const thread = await this.threadService.getThreadById(id);
    
    if(!thread) {
      throw new HttpException(`Thread with id of ${id}, can't be found!`, HttpStatus.NOT_FOUND);
    }

    return thread;
  }

  @Public()
  @Get('threads')
  async getThreads(): Promise<Thread[]> {

    Logger.log(`Getting all threads (READ)`);

    return this.threadService.getThreads();
  }

  @Public() //auth

  @Get('communities/:id/threads')
  async getThreadsByCommunityId(
    @Param('id', ParseObjectIdPipe) communityId : string): Promise<Thread[]> {

      Logger.log(`Getting all threads from community with an id of: ${communityId} (READ)`);

      return this.threadService.getThreadsByCommunityId(communityId);
    }

  @Public() //auth
  @Post('threads')
  async createThread(@Body() ThreadDto: ThreadDto): Promise<Thread> {

      Logger.log(`Creating thread (CREATE)`);

      return this.threadService.createThread(ThreadDto);
  }

  @Public() //auth
  @Patch('threads/:id')
  async updateThread(@Param('id', ParseObjectIdPipe) id: string, @Body() threadDto: ThreadDto): Promise<Thread> {

    Logger.log(`Getting thread with id: ${id} (UPDATE)`);

    const thread = await this.threadService.getThreadById(id);
    
    if(!thread) {
      throw new HttpException(`Thread with id of ${id}, can't be found!`, HttpStatus.NOT_FOUND);
    }

    return this.threadService.updateThread(id, threadDto);
  }

  @Public() //auth
  @Delete('threads/:id')
  async deleteThread(@Param('id', ParseObjectIdPipe) id: string): Promise<Thread> {

    Logger.log(`Getting thread with id: ${id} (DELETE)`);

    const thread = await this.threadService.getThreadById(id);
    
    if(!thread) {
      throw new HttpException(`Thread with id of ${id}, can't be found!`, HttpStatus.NOT_FOUND);
    }
    
    return this.threadService.deleteThread(id);
  }
}