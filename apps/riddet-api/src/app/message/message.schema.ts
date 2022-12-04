import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IMessage } from '@riddet-app/data';
import {
  IsDate, IsDefined, IsNumber, IsString
} from 'class-validator';
import { Document, ObjectId, Types } from 'mongoose';
 
export type MessageDocument = Message & Document;

@Schema()
export class Message implements IMessage{
  _id : Types.ObjectId

  @IsString({ message: 'Text must be a string!' })
  @IsDefined({ message: 'Text is required!' })
  @Prop({unique: true})
  text: string;

  @IsNumber()
  @Prop()
  likes: number;

  @IsNumber()
  @Prop()
  dislikes: number;

  @IsDate({ message: 'Creation date must be a date!' })
  @Prop()
  publicationDate: Date;

  @Prop({default: []})
  replies: [Message]

  @Prop({
    ref: 'User',
  })
  createdBy : ObjectId
}

export const MessageSchema = SchemaFactory.createForClass(Message);
