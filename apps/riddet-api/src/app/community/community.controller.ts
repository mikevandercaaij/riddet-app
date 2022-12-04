import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Req } from '@nestjs/common';
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

    return await this.communitiesService.getById(id);
  }

  @Public()
  @Get()
  async getAll(): Promise<Community[]> {
      Logger.log(`Getting all communities (READ)`);

      return this.communitiesService.getAll();
  }


  @Post()
  async create(@Body() createCommunityDto: CreateCommunityDto, @Req() req): Promise<Community> {
      Logger.log(`Creating community (CREATE)`);

      return this.communitiesService.create(createCommunityDto, req);
  }

  @Patch(':id')
  async update(@Param('id', ParseObjectIdPipe) id: string, @Req() req, @Body() updateCommunityDto: UpdateCommunityDto): Promise<Community> {

    Logger.log(`Getting community with id: ${id} (UPDATE)`);

    return this.communitiesService.update(id, updateCommunityDto, req);
  }

  @Delete(':id')
  async delete(@Param('id', ParseObjectIdPipe) id: string, @Req() req): Promise<Community> {

    Logger.log(`Getting community with id: ${id} (DELETE)`);

    return this.communitiesService.delete(id, req);
  }


  //participation routes

  @Post(':id/join')
  async join(@Param('id', ParseObjectIdPipe) id: string, @Req() req): Promise<Community> {

    Logger.log(`Getting community with id: ${id} (DELETE)`);

    return this.communitiesService.join(id, req);
  }

  @Post(':id/leave')
  async leave(@Param('id', ParseObjectIdPipe) id: string, @Req() req): Promise<Community> {

    Logger.log(`Getting community with id: ${id} (DELETE)`);

    return this.communitiesService.leave(id, req);
  }
}