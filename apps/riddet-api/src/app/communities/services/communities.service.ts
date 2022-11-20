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
            imageUrl: "https://cdn.dribbble.com/users/5745266/screenshots/13977782/media/1bd8a00b559752b86996197fcd7645dd.png?compress=1&resize=400x300&vertical=top",
            isPublic: true
        });
    }

    async updateCommunity(_id: string, community: Partial<Community>): Promise<Community> {
        return this.communityRepository.findOneAndUpdate({ _id }, community);
    }

    async deleteCommunity(_id: string): Promise<Community> {
        return this.communityRepository.findOneAndDelete({ _id });
    }
}