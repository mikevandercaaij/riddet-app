import { ICommunity } from "@riddet-app/data";
import { Types } from "mongoose";
import { Category } from "../category/category.model";
import { Thread } from "../thread/thread.model";
import { User } from "../user/user.model";


export class Community implements ICommunity {
    _id = new Types.ObjectId();
    name = '';
    description = '';
    creationDate = new Date();
    imageUrl = '';
    isPublic = true;
    categories: Category[] = [];
    threads: Thread[] = [];
    participants: Types.ObjectId[] = [];
    createdBy : User = new User();
}