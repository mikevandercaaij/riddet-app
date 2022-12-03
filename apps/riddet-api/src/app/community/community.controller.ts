import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Patch, Post, Req } from '@nestjs/common';
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

    const community = await this.communitiesService.getById(id);

    if(!community) {
      throw new HttpException(`Community with id of ${id} doesn't exist!`, HttpStatus.NOT_FOUND);
    }

    return community;
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

    const community = await this.communitiesService.getById(id);
    
    if(!community) {
      throw new HttpException(`Community with id of ${id} doesn't exist!`, HttpStatus.NOT_FOUND);
    }

    return this.communitiesService.update(id, updateCommunityDto, id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseObjectIdPipe) id: string): Promise<Community> {

    Logger.log(`Getting community with id: ${id} (DELETE)`);

    const community = await this.communitiesService.getById(id);
    
    if(!community) {
      throw new HttpException(`Community with id of ${id} doesn't exist!`, HttpStatus.NOT_FOUND);
    }
    
    return this.communitiesService.delete(id);
  }
}