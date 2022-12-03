import { ICommunity } from "@riddet-app/data";
import { Types } from "mongoose";


export class Community implements ICommunity {
    _id = Types.ObjectId;
    name = '';
    description = '';
    creationDate = new Date();
    imageUrl = '';
    isPublic = true;
}