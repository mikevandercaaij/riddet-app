import { Injectable, Logger } from "@nestjs/common";
import { CommunitiesRepository } from "../repositories/communities.repository";
import { Community } from "../schemas/community.schema";

@Injectable()
export class CommunitiesService {
    constructor(private readonly communityRepository : CommunitiesRepository) {}

    async getCommunityById(_id: string): Promise<Community> {
        return this.communityRepository.findOne({ _id });
    }

    async getCommunities(): Promise<Community[]> {
        return this.communityRepository.find({});
    }

    async createCommunity(name : string, description : string): Promise<Community> {
        Logger.log(name);
        Logger.log(description);
        return this.communityRepository.create({
            name,  
            description, 
            creationDate: new Date(), 
            image: "img_url" 
        });
    }

    async updateCommunity(_id: string, community: Partial<Community>): Promise<Community> {
        return this.communityRepository.findOneAndUpdate({ _id }, community);
    }

    async deleteCommunity(_id: string): Promise<Community> {
        return this.communityRepository.findOneAndDelete({ _id });
    }
}