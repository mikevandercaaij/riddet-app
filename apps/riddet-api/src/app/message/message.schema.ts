import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IMessage } from '@riddet-app/data';
import {
  IsDate, IsDefined, IsString
} from 'class-validator';
import { Document, ObjectId, Types } from 'mongoose';
 
export type MessageDocument = Message & Document;

@Schema()
export class Message implements IMessage{
  hasLikes: boolean;
  containsReplies: boolean;
  _id : Types.ObjectId

  @IsString({ message: 'Text must be a string!' })
  @IsDefined({ message: 'Text is required!' })
  @Prop({unique: true})
  text: string;

  @Prop({
    dedfault: [],
    ref: 'User',
  })
  likes : [ObjectId]

  @IsDate({ message: 'Creation date must be a date!' })
  @Prop()
  publicationDate: Date;


  @Prop({
    ref: 'User',
  })
  createdBy : ObjectId
}

export const MessageSchema = SchemaFactory.createForClass(Message);
