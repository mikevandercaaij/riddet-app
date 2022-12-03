import { Body, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCommunityDto } from "./community.dto";
import { Community, CommunityDocument } from "./community.schema";

@Injectable()
export class CommunitiesService {
    constructor(@InjectModel(Community.name) private communityModel: Model<CommunityDocument>) {}

    async getCommunityById(_id: string): Promise<Community> {
        return this.communityModel.findOne({ _id });
    }

    async getCommunities(): Promise<Community[]> {
        return this.communityModel.find({});
    }

    async createCommunity(@Body() createCommunityDto : CreateCommunityDto): Promise<Community> {
        return this.communityModel.create(createCommunityDto);
    }

    async updateCommunity(_id: string, community: Partial<Community>): Promise<Community> {
        return this.communityModel.findOneAndUpdate({ _id }, community, { new: true });
    }

    async deleteCommunity(_id: string): Promise<Community> {
        return this.communityModel.findOneAndDelete({ _id });
    }
}