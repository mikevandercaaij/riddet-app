import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CategoryDto } from "./category.dto";
import { Category, CategoryDocument } from "./category.schema";

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

    async getById(_id: string): Promise<Category> {
        await this.doesExist(_id);

        return this.categoryModel.findOne({ _id });
    }

    async getAll(): Promise<Category[]> {
        return this.categoryModel.find({});
    }

    async create(categoryDto : CategoryDto): Promise<Category> {
        await this.validate(undefined, categoryDto.name);

        return this.categoryModel.create(categoryDto);
    }
    
    async delete(_id: string): Promise<Category> {
        await this.doesExist(_id);

        return this.categoryModel.findOneAndDelete({ _id });
    }

    async validate(id : string, name: string): Promise<void> {
        if(await this.categoryModel.find({$and: [{_id: {$ne: id}}, {name: name}]}).countDocuments() > 0) {
          throw new HttpException(`Category with name of ${name} already exists!`, HttpStatus.BAD_REQUEST);
        }
    }

    async doesExist(id : string): Promise<void> {
        const category = await this.categoryModel.findOne({_id: id});
    
        if(!category) {
          throw new HttpException(`Category with id of ${id} doesn't exist!`, HttpStatus.BAD_REQUEST);
        }
    }
}