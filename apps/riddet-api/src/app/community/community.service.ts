import { Body, Injectable } from "@nestjs/common";
import { CommunityDto } from "./community.dto";
import { CommunitiesRepository } from "./community.repository";
import { Community } from "./community.schema";

@Injectable()
export class CommunitiesService {
    constructor(private readonly communityRepository : CommunitiesRepository) {}

    async getCommunityById(_id: string): Promise<Community> {
        return this.communityRepository.findOne({ _id });
    }

    async getCommunities(): Promise<Community[]> {
        return this.communityRepository.find({});
    }

    async createCommunity(@Body() communityDto : CommunityDto): Promise<Community> {
        return this.communityRepository.create(communityDto);
    }

    async updateCommunity(_id: string, community: Partial<Community>): Promise<Community> {
        return this.communityRepository.findOneAndUpdate({ _id }, community);
    }

    async deleteCommunity(_id: string): Promise<Community> {
        return this.communityRepository.findOneAndDelete({ _id });
    }
}