import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { CreateCommunityDto } from '../dto/create-community.dto';
import { UpdateCommunityDto } from '../dto/update-community.dto';

import { Community } from "../schemas/community.schema";
import { CommunitiesService } from '../services/communities.service';

@Controller('community')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<Community> {
    return this.communitiesService.getCommunityById(userId);
  }

  @Get()
  async getUsers(): Promise<Community[]> {
      return this.communitiesService.getCommunities();
  }

  @Post()
  async createUser(@Body() createCommunityDto: CreateCommunityDto): Promise<Community> {

    Logger.log(createCommunityDto);

      return this.communitiesService.createCommunity(createCommunityDto.name, createCommunityDto.description);
  }

  @Patch(':userId')
  async updateUser(@Param('userId') userId: string, @Body() updateCommunityDto: UpdateCommunityDto): Promise<Community> {
      return this.communitiesService.updateCommunity(userId, updateCommunityDto);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string): Promise<Community> {
      return this.communitiesService.deleteCommunity(userId);
  }
}