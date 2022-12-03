import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Patch, Post } from '@nestjs/common';
import { Public } from '../auth/auth.module';
import { ParseObjectIdPipe } from '../shared/pipes/ParseObjectIdPipe';
import { CreateCommunityDto, UpdateCommunityDto } from './community.dto';
import { Community } from "./community.schema";
import { CommunitiesService } from './community.service';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Public()
  @Get(':id')
  async getById(
    @Param('id', ParseObjectIdPipe) id: string): Promise<Community> {
      
    Logger.log(`Getting community with id: ${id} (READ)`);

    const community = await this.communitiesService.getCommunityById(id);

    if(!community) {
      throw new HttpException(`Community with id of ${id} doesn't exist!`, HttpStatus.NOT_FOUND);
    }

    return community;
  }

  @Public()
  @Get()
  async getAll(): Promise<Community[]> {
      Logger.log(`Getting all communities (READ)`);

      return this.communitiesService.getCommunities();
  }


  @Public()
  @Post()
  async create(@Body() createCommunityDto: CreateCommunityDto): Promise<Community> {
      Logger.log(`Creating community (CREATE)`);

      return this.communitiesService.createCommunity(createCommunityDto);
  }

  @Public()
  @Patch(':id')
  async update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateCommunityDto: UpdateCommunityDto): Promise<Community> {

    Logger.log(`Getting community with id: ${id} (UPDATE)`);

    const community = await this.communitiesService.getCommunityById(id);
    
    if(!community) {
      throw new HttpException(`Community with id of ${id} doesn't exist!`, HttpStatus.NOT_FOUND);
    }

    return this.communitiesService.updateCommunity(id, updateCommunityDto);
  }

  @Public()
  @Delete(':id')
  async delete(@Param('id', ParseObjectIdPipe) id: string): Promise<Community> {

    Logger.log(`Getting community with id: ${id} (DELETE)`);

    const community = await this.communitiesService.getCommunityById(id);
    
    if(!community) {
      throw new HttpException(`Community with id of ${id} doesn't exist!`, HttpStatus.NOT_FOUND);
    }
    
    return this.communitiesService.deleteCommunity(id);
  }
}