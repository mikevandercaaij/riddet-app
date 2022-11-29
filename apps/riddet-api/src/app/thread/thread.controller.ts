import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Patch, Post } from '@nestjs/common';
import { Public } from '../auth/auth.module';
import { ParseObjectIdPipe } from '../shared/pipes/ParseObjectIdPipe';
import { CreateThreadDto, UpdateThreadDto } from './thread-dto';
import { Thread } from "./thread.schema";
import { ThreadService } from './thread.service';

@Controller()
export class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

  @Public()
  @Get('threads/:id')
  async getById(
    @Param('id', ParseObjectIdPipe) id: string): Promise<Thread> {
      
    Logger.log(`Getting thread with id: ${id} (READ)`);

    const thread = await this.threadService.getById(id);
    
    if(!thread) {
      throw new HttpException(`Thread with id of ${id} doesn't exist!`, HttpStatus.NOT_FOUND);
    }

    return thread;
  }

  @Public()
  @Get('threads')
  async getAll(): Promise<Thread[]> {

    Logger.log(`Getting all threads (READ)`);

    return this.threadService.getAll();
  }

  @Public()
  @Get('communities/:id/threads')
  async getAllByCommunityId(
    @Param('id', ParseObjectIdPipe) communityId : string): Promise<Thread[]> {

      Logger.log(`Getting all threads from community with an id of: ${communityId} (READ)`);

      return this.threadService.getAllByCommunityId(communityId);
    }

  @Public()
  @Post('threads')
  async create(@Body() createThreadDto: CreateThreadDto): Promise<Thread> {

      Logger.log(`Creating thread (CREATE)`);

      return this.threadService.create(createThreadDto);
  }

  @Public()
  @Patch('threads/:id')
  async update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateThreadDto: UpdateThreadDto): Promise<Thread> {

    Logger.log(`Getting thread with id: ${id} (UPDATE)`);

    const thread = await this.threadService.getById(id);
    
    if(!thread) {
      throw new HttpException(`Thread with id of ${id} doesn't exist!`, HttpStatus.NOT_FOUND);
    }

    return this.threadService.update(id, updateThreadDto);
  }

  @Public()
  @Delete('threads/:id')
  async delete(@Param('id', ParseObjectIdPipe) id: string): Promise<Thread> {

    Logger.log(`Getting thread with id: ${id} (DELETE)`);

    const thread = await this.threadService.getById(id);
    
    if(!thread) {
      throw new HttpException(`Thread with id of ${id} doesn't exist!`, HttpStatus.NOT_FOUND);
    }
    
    return this.threadService.delete(id);
  }
}