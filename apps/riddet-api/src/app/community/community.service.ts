import { Body, Injectable } from "@nestjs/common";
import { CreateCommunityDto } from "./community.dto";
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

    async createCommunity(@Body() createCommunityDto : CreateCommunityDto): Promise<Community> {
        return this.communityRepository.create(createCommunityDto);
    }

    async updateCommunity(_id: string, community: Partial<Community>): Promise<Community> {
        return this.communityRepository.findOneAndUpdate({ _id }, community);
    }

    async deleteCommunity(_id: string): Promise<Community> {
        return this.communityRepository.findOneAndDelete({ _id });
    }
}