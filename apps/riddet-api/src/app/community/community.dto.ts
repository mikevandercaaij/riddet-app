import { IsBoolean, IsDefined, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateCommunityDto {
  @IsString({ message: 'Name must be a string!' })
  @IsDefined({ message: 'Name is required!' })
  @MinLength(5, { message: 'Name must be at least 5 characters long!' })
  name: string;

  @IsString({ message: 'Description must be a string!' })
  @IsDefined({ message: 'Description is required!' })
  @IsNotEmpty({ message: 'Description cannot be empty!' })
  description: string;

  @IsString({ message: 'ImageUrl must be a string!' })
  @IsDefined({ message: 'ImageUrl is required!' })
  @IsNotEmpty({ message: 'ImageUrl cannot be empty!' })
  imageUrl: string;

  @IsBoolean({ message: 'isPublic must be a boolean!' })
  @IsNotEmpty({ message: 'isPublic cannot be empty!' })
  isPublic: boolean;
}

export class UpdateCommunityDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string!' })
  @IsDefined({ message: 'Name is required!' })
  @MinLength(5, { message: 'Name must be at least 5 characters long!' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string!' })
  @IsDefined({ message: 'Description is required!' })
  @IsNotEmpty({ message: 'Description cannot be empty!' })
  description: string;

  @IsOptional()
  @IsString({ message: 'ImageUrl must be a string!' })
  @IsDefined({ message: 'ImageUrl is required!' })
  @IsNotEmpty({ message: 'ImageUrl cannot be empty!' })
  imageUrl: string;

  @IsOptional()
  @IsBoolean({ message: 'isPublic must be a boolean!' })
  @IsNotEmpty({ message: 'isPublic cannot be empty!' })
  isPublic: boolean;
}