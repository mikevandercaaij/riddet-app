import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Patch, Post } from '@nestjs/common';
import { ParseObjectIdPipe } from '../../shared/pipes/ParseObjectIdPipe';
import { ThreadDto } from '../dto/thread-dto';
import { Thread } from "../schemas/thread.schema";
import { ThreadService } from '../services/thread.service';

@Controller('threads')
export class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

  @Get(':id')
  async getThread(
    @Param('id', ParseObjectIdPipe) id: string): Promise<Thread> {
      
    Logger.log(`Getting community with id: ${id} (READ)`);

    const community = await this.threadService.getThreadById(id);
    
    if(!community) {
      throw new HttpException(`Community with id of ${id}, can't be found!`, HttpStatus.NOT_FOUND);
    }

    return community;
  }

  @Get()
  async getThreads(): Promise<Thread[]> {
      return this.threadService.getThreads();
  }

  @Get('/communities/:id')
  async getThreadsByCommunityId(
    @Param('id', ParseObjectIdPipe) communityId : string): Promise<Thread[]> {
      console.log(communityId)
      return this.threadService.getThreadsByCommunityId(communityId);
  }

  @Post()
  async createThread(@Body() ThreadDto: ThreadDto): Promise<Thread> {
      return this.threadService.createThread(ThreadDto);
  }

  @Patch(':id')
  async updateThread(@Param('id', ParseObjectIdPipe) id: string, @Body() threadDto: ThreadDto): Promise<Thread> {


    Logger.log(`Getting community with id: ${id} (UPDATE)`);

    const community = await this.threadService.getThreadById(id);
    
    if(!community) {
      throw new HttpException(`Community with id of ${id}, can't be found!`, HttpStatus.NOT_FOUND);
    }

    return this.threadService.updateThread(id, threadDto);
  }

  @Delete(':id')
  async deleteThread(@Param('id', ParseObjectIdPipe) id: string): Promise<Thread> {

    Logger.log(`Getting community with id: ${id} (DELETE)`);

    const community = await this.threadService.getThreadById(id);
    
    if(!community) {
      throw new HttpException(`Community with id of ${id}, can't be found!`, HttpStatus.NOT_FOUND);
    }
    
      return this.threadService.deleteThread(id);
  }
}