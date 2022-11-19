import { IsBoolean, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdateCommunityDto {
  @IsString({ message: 'Name must be a string!' })
  @MinLength(5, { message: 'Name must be at least 5 characters long!' })
  name: string;

  @IsString({ message: 'Description must be a string!' })
  @IsNotEmpty({ message: 'Description cannot be empty!' })
  description: string;

  @IsBoolean({ message: 'isPublic must be a boolean!' })
  isPublic: boolean;
  }