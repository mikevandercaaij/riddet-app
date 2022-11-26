import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Patch, Post } from '@nestjs/common';
import { Public } from '../auth/auth.module';
import { ParseObjectIdPipe } from '../shared/pipes/ParseObjectIdPipe';
import { CommunityDto } from './community.dto';
import { Community } from "./community.schema";
import { CommunitiesService } from './community.service';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Public()
  @Get(':id')
  async getThread(
    @Param('id', ParseObjectIdPipe) id: string): Promise<Community> {
      
    Logger.log(`Getting community with id: ${id} (READ)`);

    const community = await this.communitiesService.getCommunityById(id);

    if(!community) {
      throw new HttpException(`Community with id of ${id}, can't be found!`, HttpStatus.NOT_FOUND);
    }

    return community;
  }

  @Public()
  @Get()
  async getThreads(): Promise<Community[]> {
      Logger.log(`Getting all communities (READ)`);

      return this.communitiesService.getCommunities();
  }

  @Public() //auth
  @Post()
  async createThread(@Body() communityDto: CommunityDto): Promise<Community> {
      Logger.log(`Creating community (CREATE)`);

      return this.communitiesService.createCommunity(communityDto);
  }

  @Public() //auth
  @Patch(':id')
  async updateThread(@Param('id', ParseObjectIdPipe) id: string, @Body() communityDto: CommunityDto): Promise<Community> {

    Logger.log(`Getting community with id: ${id} (UPDATE)`);

    const community = await this.communitiesService.getCommunityById(id);
    
    if(!community) {
      throw new HttpException(`Community with id of ${id}, can't be found!`, HttpStatus.NOT_FOUND);
    }

    return this.communitiesService.updateCommunity(id, communityDto);
  }

  @Public() //auth
  @Delete(':id')
  async deleteThread(@Param('id', ParseObjectIdPipe) id: string): Promise<Community> {

    Logger.log(`Getting community with id: ${id} (DELETE)`);

    const community = await this.communitiesService.getCommunityById(id);
    
    if(!community) {
      throw new HttpException(`Community with id of ${id}, can't be found!`, HttpStatus.NOT_FOUND);
    }
    
    return this.communitiesService.deleteCommunity(id);
  }
}