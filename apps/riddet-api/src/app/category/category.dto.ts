import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class CategoryDto {
    @IsString({ message: 'Name must be a string!' })
    @IsDefined({ message: 'Name is required!' })
    @IsNotEmpty({ message: 'Name cannot be empty!' })
    name: string;
  }