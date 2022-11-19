import { Types } from 'mongoose';

export interface Community {
  _id: Types.ObjectId;
  name: string;
  description: string;
  creationDate: Date;
  imageUrl: string;
  isPublic: boolean;
}