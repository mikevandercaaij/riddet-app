import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICommunity } from '@riddet-app/data';
import {
  IsDate, IsDefined, IsNotEmpty, IsString, MinLength
} from 'class-validator';
import { Document, ObjectId, Types } from 'mongoose';
import { Category } from '../category/category.schema';
import { Thread } from '../thread/thread.schema';
import { User } from '../user/user.schema';
 
export type CommunityDocument = Community & Document;

@Schema()
export class Community implements ICommunity {
  _id : Types.ObjectId

  @IsString({ message: 'Name must be a string!' })
  @IsDefined({ message: 'Name is required!' })
  @MinLength(5, { message: 'Name must be at least 5 characters long!' })
  @Prop({unique: true})
  name: string;


  @IsString({ message: 'Description must be a string!' })
  @IsDefined({ message: 'Description is required!' })
  @IsNotEmpty({ message: 'Description cannot be empty!' })
  @Prop()
  description: string;

  @IsDate({ message: 'Creation date must be a date!' })
  @Prop()
  creationDate: Date;

  @IsString({ message: 'Image must be a string!' })
  @Prop()
  imageUrl: string;

  @Prop()
  isPublic: boolean;

  @Prop({
    default: [],
  })
  categories: [Category]

  @Prop({
    default: [],
    ref: 'User',
  })
  participants: [ObjectId]

  @Prop({
    default: [],
  })
  threads: [Thread]

  @Prop()
  createdBy: User
}

export const CommunitySchema = SchemaFactory.createForClass(Community);
