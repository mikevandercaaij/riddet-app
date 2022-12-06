import { ICommunity } from "@riddet-app/data";
import { Types } from "mongoose";
import { Thread } from "../thread/thread.model";
import { User } from "../user/user.model";


export class Community implements ICommunity {
    _id = Types.ObjectId;
    name = '';
    description = '';
    creationDate = new Date();
    imageUrl = '';
    isPublic = true;
    threads: Thread[] = [];
    participants: Types.ObjectId[] = [];
    createdBy : User = new User();
}