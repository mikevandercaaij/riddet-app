import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Req } from '@nestjs/common';
import { Public } from '../auth/auth.module';
import { ParseObjectIdPipe } from '../shared/pipes/ParseObjectIdPipe';
import { CreateCommunityDto, UpdateCommunityDto } from './community.dto';
import { Community } from "./community.schema";
import { CommunityService } from './community.service';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communityService: CommunityService) {}

  @Public()
  @Get(':id')
  async getById(
    @Param('id', ParseObjectIdPipe) id: string): Promise<Community> {
      
    Logger.log(`Getting community with id: ${id} (READ)`);

    return await this.communityService.getById(id);
  }

  @Public()
  @Get()
  async getAll(): Promise<Community[]> {
      Logger.log(`Getting all communities (READ)`);

      return this.communityService.getAll();
  }


  @Post()
  async create(@Body() createCommunityDto: CreateCommunityDto, @Req() req): Promise<Community> {
      Logger.log(`Creating community (CREATE)`);

      return this.communityService.create(createCommunityDto, req);
  }

  @Patch(':id')
  async update(@Param('id', ParseObjectIdPipe) id: string, @Req() req, @Body() updateCommunityDto: UpdateCommunityDto): Promise<Community> {

    Logger.log(`Getting community with id: ${id} (UPDATE)`);

    return this.communityService.update(id, updateCommunityDto, req);
  }

  @Delete(':id')
  async delete(@Param('id', ParseObjectIdPipe) id: string, @Req() req): Promise<Community> {

    Logger.log(`Getting community with id: ${id} (DELETE)`);

    return this.communityService.delete(id, req);
  }


  //participation routes

  @Post(':id/join')
  async join(@Param('id', ParseObjectIdPipe) id: string, @Req() req): Promise<Community> {

    Logger.log(`Getting community with id: ${id} (DELETE)`);

    return this.communityService.join(id, req);
  }

  @Post(':id/leave')
  async leave(@Param('id', ParseObjectIdPipe) id: string, @Req() req): Promise<Community> {

    Logger.log(`Getting community with id: ${id} (DELETE)`);

    return this.communityService.leave(id, req);
  }
}