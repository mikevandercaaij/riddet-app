import { IThread } from "@riddet-app/data";
import { Types } from "mongoose";

export class Thread implements IThread {
    _id = Types.ObjectId;
    title = '';	
    content = '';
    publicationDate = new Date();
    imageUrl = '';
    externLink = '';
    upvotes = 0;
    communityId = Types.ObjectId as unknown as Types.ObjectId;
}