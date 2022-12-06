import { IThread } from "@riddet-app/data";
import { Types } from "mongoose";

export class Thread implements IThread {
    _id = Types.ObjectId;
    title = '';	
    content = '';
    publicationDate = new Date();
    imageUrl = '';
    externLink = '';
    views = 0;
    messages = [];
    createdBy = Types.ObjectId;
}