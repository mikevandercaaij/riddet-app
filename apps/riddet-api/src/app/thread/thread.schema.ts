import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IThread } from '@riddet-app/data';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsNumber,
  IsString,
  MinLength
} from 'class-validator';
import { Document, Types } from 'mongoose';
 
export type ThreadDocument = Thread & Document;

@Schema()
export class Thread implements IThread {

  _id : Types.ObjectId

  @IsString({ message: 'Name must be a string!' })
  @IsDefined({ message: 'Name is required!' })
  @MinLength(5, { message: 'Name must be at least 5 characters long!' })
  @Prop()
  title: string;

  @Prop()
  content: string;

  @IsDate({ message: 'Publication date must be a date!' })
  @Prop()
  publicationDate: Date;

  @IsString({ message: 'Image URL must be a string!' })
  @Prop()
  imageUrl: string;

  @IsString({ message: 'ExternLink must be a string!' })
  @Prop()
  externLink: string;

  @IsBoolean()
  @Prop()
  isPublic: boolean;

  @IsNumber()
  @Prop()
  upvotes: number;

  @Prop()
  communityId: Types.ObjectId;
}

export const ThreadSchema = SchemaFactory.createForClass(Thread);