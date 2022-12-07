import { IThread } from "@riddet-app/data";
import { Types } from "mongoose";
import { User } from "../user/user.model";

export class Thread implements IThread {
    _id = Types.ObjectId;
    title = '';	
    content = '';
    publicationDate = new Date();
    imageUrl = '';
    externLink = '';
    views = 0;
    messages = [];
    createdBy = User
}