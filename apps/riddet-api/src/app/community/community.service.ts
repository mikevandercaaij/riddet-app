import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category } from "../category/category.schema";
import { CategoryService } from "../category/category.service";
import { ValidationException } from "../shared/filters/validation.exception";
import { ParseObjectIdPipe } from "../shared/pipes/ParseObjectIdPipe";
import { UserService } from "../user/user.service";
import { CreateCommunityDto, UpdateCommunityDto } from "./community.dto";
import { Community, CommunityDocument } from "./community.schema";

@Injectable()
export class CommunitiesService {
    constructor(@InjectModel(Community.name) private communityModel: Model<CommunityDocument>,
    private readonly categoryService : CategoryService,
    private readonly userService : UserService) {}
    

    async getById(_id: string): Promise<Community> {
        return this.communityModel.findOne({ _id });
    }

    async getAll(): Promise<Community[]> {
        return this.communityModel.find({});
    }

    async create(createCommunityDto : CreateCommunityDto, req): Promise<Community> {
        await this.validate(createCommunityDto);

        const embedCategories : Category[] = [];

        for await (const category of createCommunityDto.categories) {
            embedCategories.push(await this.categoryService.getById(category));
        }

        const mergedCommunity = new this.communityModel(
            {...createCommunityDto, 
            creationDate: new Date(), 
            categories : embedCategories, 
            createdBy: await this.userService.getById(req.user.id) 
        });

        return this.communityModel.create(mergedCommunity);
    }

    async update(_id: string, updateCommunityDto: UpdateCommunityDto, updateId : string): Promise<Community> {
        await this.validate(updateCommunityDto, updateId);

        let updateObject = {};

        if(updateCommunityDto.categories) {
            const categories : Category[] = [];

            for await (const category of updateCommunityDto.categories) {
                categories.push(await this.categoryService.getById(category));
            }

            delete updateCommunityDto.categories;

            updateObject = {categories};
        }

        updateObject = {...updateCommunityDto, ...updateObject};

        return this.communityModel.findOneAndUpdate({ _id }, updateObject, { new: true });
    }

    async delete(_id: string): Promise<Community> {
        return this.communityModel.findOneAndDelete({ _id });
    }


    async validate(community : CreateCommunityDto, currentCommunityId?: string) {
        if(community.name) {
            if((await this.communityModel.find({$and: [{name: community.name }, {_id : { $ne: currentCommunityId }}]})).length > 0 ) {
                throw new ValidationException([`Community with the name of ${community.name} already exists!`]);
            }
        }

        if(community.categories) {
            if(!(await this.areValidObjectIds(community.categories as string[]))) {
                throw new ValidationException([`Categories contains invalid data, all input must be of type ObjectId!`]);
            }
        }
    }

    async areValidObjectIds(value: string[]) {
        return value.every((id) => ParseObjectIdPipe.isValidObjectId(id));
    }
}