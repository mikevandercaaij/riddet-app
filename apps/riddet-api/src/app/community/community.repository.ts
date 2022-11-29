import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateCommunityDto } from './community.dto';
import { Community, CommunityDocument } from './community.schema';

@Injectable()
export class CommunitiesRepository {
  constructor(@InjectModel(Community.name) private communityModel: Model<CommunityDocument>) {}

  async findOne(communityFilterQuery: FilterQuery<Community>): Promise<Community> {
    return this.communityModel.findOne(communityFilterQuery);
  }

  async find(communityFilterQuery: FilterQuery<Community>): Promise<Community[]> {
    return this.communityModel.find(communityFilterQuery);
  }

  async create(createCommunityDto: CreateCommunityDto): Promise<Community> {

    const newCommunity = new this.communityModel({...createCommunityDto, creationDate: new Date(), isPublic: true});
    
    return newCommunity.save();
  }

  async findOneAndUpdate(communityFilterQuery: FilterQuery<Community>, community: Partial<Community>): Promise<Community> {
    return this.communityModel.findOneAndUpdate(communityFilterQuery, community, { new: true });
  }

  async findOneAndDelete(communityFilterQuery: FilterQuery<Community>): Promise<Community> {
    return this.communityModel.findOneAndDelete(communityFilterQuery);
  }
}
