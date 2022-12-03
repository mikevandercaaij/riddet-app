import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICommunity } from '@riddet-app/data';
import {
  IsDate, IsDefined, IsNotEmpty, IsString, MinLength
} from 'class-validator';
import { Document, Types } from 'mongoose';
 
export type CommunityDocument = Community & Document;

@Schema()
export class Community implements ICommunity {
  _id : Types.ObjectId

  @IsString({ message: 'Name must be a string!' })
  @IsDefined({ message: 'Name is required!' })
  @MinLength(5, { message: 'Name must be at least 5 characters long!' })
  @Prop()
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

  // @Prop()

  // @Prop()
  // createdBy: UserDocument

}

export const CommunitySchema = SchemaFactory.createForClass(Community);
