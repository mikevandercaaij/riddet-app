import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICategory } from '@riddet-app/data';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';
 
export type CategoryDocument = Category & Document;

@Schema()
export class Category implements ICategory {
  _id : Types.ObjectId

  @IsString({ message: 'Name must be a string!' })
  @IsDefined({ message: 'Name is required!' })
  @IsNotEmpty({ message: 'Name cannot be empty!' })
  @Prop()
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);