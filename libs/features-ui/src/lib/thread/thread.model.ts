import { IThread } from "@riddet-app/data";

export class Thread implements IThread {
    id = '';
    title = '';	
    content = '';
    publicationDate = new Date();
    imageUrl = '';
    externLink = '';
    upvotes = 0;
    communityId = '';
}