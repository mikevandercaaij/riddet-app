import { Types } from "mongoose";
export interface ICommunity {
  name: string ,
  description: string ,
  creationDate: Date,
  imageUrl: string ,
  isPublic: boolean,
}
export interface IThread {
  title: string;
  content: string;
  publicationDate: Date;
  imageUrl: string;
  externLink: string;
  upvotes: number;
  communityId: Types.ObjectId;
}
