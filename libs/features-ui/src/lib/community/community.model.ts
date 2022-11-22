import { ICommunity } from "@riddet-app/data";

export class Community implements ICommunity {
    id = '';
    name = '';
    description = '';
    creationDate = new Date();
    imageUrl = '';
    isPublic = true;
}