import { IsDefined, IsString, MinLength } from "class-validator";
import { Types } from "mongoose";

export class ThreadDto {
  @IsString({ message: 'Title must be a string!' })
  @IsDefined({ message: 'Title is required!' })
  @MinLength(5, { message: 'Title must be at least 5 characters long!' })
  title: string;

  content: string;

  imageUrl: string;

  externLink: string;

  communityId: Types.ObjectId;
  
}