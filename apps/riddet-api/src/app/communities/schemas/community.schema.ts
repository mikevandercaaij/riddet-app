import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommunityDocument = Community & Document;

@Schema()
export class Community {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  creationDate: Date;

  @Prop()
  image: string;
}

export const CommunitySchema = SchemaFactory.createForClass(Community);
