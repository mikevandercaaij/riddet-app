import { Body, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ValidationException } from "../shared/filters/validation.exception";
import { CategoryDto } from "./category.dto";
import { Category, CategoryDocument } from "./category.schema";

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

    async getById(_id: string): Promise<Category> {
        return this.categoryModel.findOne({ _id });
    }

    async getAll(): Promise<Category[]> {
        return this.categoryModel.find({});
    }

    async create(@Body() categoryDto : CategoryDto): Promise<Category> {
        await this.alreadyExists(undefined, categoryDto.name);

        return this.categoryModel.create(categoryDto);
    }

    async update(_id: string, category: Partial<Category>): Promise<Category> {
        await this.alreadyExists(_id, category.name);
        
        return this.categoryModel.findOneAndUpdate({ _id }, category, { new: true });
    }

    async delete(_id: string): Promise<Category> {
        return this.categoryModel.findOneAndDelete({ _id });
    }


    async alreadyExists(id : string, name: string): Promise<void> {
        if(await this.categoryModel.find({$and: [{_id: {$ne: id}}, {name: name}]}).countDocuments() > 0) {
            throw new ValidationException([`Category with name of ${name} already exists!`]);
        }
    }

}