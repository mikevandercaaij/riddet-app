import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Patch, Post } from '@nestjs/common';
import { CreateCommunityDto } from '../dto/create-community.dto';
import { UpdateCommunityDto } from '../dto/update-community.dto';

import { Community } from "../schemas/community.schema";
import { CommunitiesService } from '../services/communities.service';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Get(':id')
  async getUser(
    @Param('id') id: string): Promise<Community> {
      
    Logger.log(`Getting community with id: ${id} (READ)`);

    const community = await this.communitiesService.getCommunityById(id);
    
    if(!community) {
      throw new HttpException(`Community with id of ${id}, can't be found!`, HttpStatus.NOT_FOUND);
    }

    return community;
  }

  @Get()
  async getUsers(): Promise<Community[]> {
      return this.communitiesService.getCommunities();
  }

  @Post()
  async createUser(@Body() createCommunityDto: CreateCommunityDto): Promise<Community> {
      return this.communitiesService.createCommunity(createCommunityDto.name, createCommunityDto.description)
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateCommunityDto: UpdateCommunityDto): Promise<Community> {


    Logger.log(`Getting community with id: ${id} (UPDATE)`);

    const community = await this.communitiesService.getCommunityById(id);
    
    if(!community) {
      throw new HttpException(`Community with id of ${id}, can't be found!`, HttpStatus.NOT_FOUND);
    }

      return this.communitiesService.updateCommunity(id, updateCommunityDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<Community> {

    Logger.log(`Getting community with id: ${id} (DELETE)`);

    const community = await this.communitiesService.getCommunityById(id);
    
    if(!community) {
      throw new HttpException(`Community with id of ${id}, can't be found!`, HttpStatus.NOT_FOUND);
    }
    
      return this.communitiesService.deleteCommunity(id);
  }
}