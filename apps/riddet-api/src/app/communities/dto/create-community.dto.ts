import { IsDefined, IsNotEmpty, IsString, MinLength } from "class-validator";

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
  
}