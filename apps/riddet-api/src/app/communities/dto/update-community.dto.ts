import { IsBoolean, IsDefined, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdateCommunityDto {
  @IsString({ message: 'Name must be a string!' })
  @MinLength(5, { message: 'Name must be at least 5 characters long!' })
  name: string;

  @IsString({ message: 'Description must be a string!' })
  @IsNotEmpty({ message: 'Description cannot be empty!' })
  description: string;

  @IsString({ message: 'ImageUrl must be a string!' })
  @IsDefined({ message: 'ImageUrl is required!' })
  @IsNotEmpty({ message: 'ImageUrl cannot be empty!' })
  imageUrl: string;

  @IsBoolean({ message: 'isPublic must be a boolean!' })
  isPublic: boolean;
  }