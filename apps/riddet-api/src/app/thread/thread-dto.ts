import { IsDefined, IsOptional, IsString, MinLength } from "class-validator";
import { Types } from "mongoose";

export class CreateThreadDto {
  @IsString({ message: 'Title must be a string!' })
  @IsDefined({ message: 'Title is required!' })
  @MinLength(5, { message: 'Title must be at least 5 characters long!' })
  title: string;

  @IsString({ message: 'Content must be a string!' })
  @IsDefined({ message: 'Content is required!' })
  content: string;

  @IsString({ message: 'ImageUrl must be a string!' })
  @IsDefined({ message: 'ImageUrl is required!' })
  imageUrl: string;

  @IsString({ message: 'ExternLink must be a string!' })
  @IsDefined({ message: 'ExternLink is required!' })
  externLink: string;

  communityId: Types.ObjectId;
}

export class UpdateThreadDto {
  @IsOptional()
  @IsString({ message: 'Title must be a string!' })
  @IsDefined({ message: 'Title is required!' })
  @MinLength(5, { message: 'Title must be at least 5 characters long!' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Content must be a string!' })
  @IsDefined({ message: 'Content is required!' })
  content: string;

  @IsOptional()
  @IsString({ message: 'ImageUrl must be a string!' })
  @IsDefined({ message: 'ImageUrl is required!' })
  imageUrl: string;

  @IsOptional()
  @IsString({ message: 'ExternLink must be a string!' })
  @IsDefined({ message: 'ExternLink is required!' })
  externLink: string;

  @IsOptional()
  communityId: Types.ObjectId;
}