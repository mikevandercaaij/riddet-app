import { IsDate, IsDefined, IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString({ message: 'Username must be a string!' })
    @IsDefined({ message: 'Username is required!' })
    @MinLength(5, { message: 'Username must be at least 5 characters long!' })
    username: string;
  
    @IsString({ message: 'Firstname must be a string!' })
    @IsDefined({ message: 'Firstname is required!' })
    firstname: string;
    
    @IsString({ message: 'Firstname must be a string!' })
    @IsDefined({ message: 'Firstname is required!' })
    lastname: string;
  
    @IsEmail({ message: 'Email must be a valid email!' })
    @IsString({ message: 'Email must be a string!' })
    @IsDefined({ message: 'Email is required!' })
    email: string;

    @IsDate({ message: 'Creation date must be a date!' })
    dateOfBirth: Date;
  
    @IsString({ message: 'Password must be a string!' })
    @IsDefined({ message: 'Password is required!' })
    @MinLength(8, { message: 'Password must be at least 8 characters long!' })
    password: string;
  
    @IsString({ message: 'UserImageUrl must be a string!' })
    @IsDefined({ message: 'UserImageUrl is required!' })
    userImageUrl: string;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString({ message: 'Username must be a string!' })
    @IsDefined({ message: 'Username is required!' })
    @MinLength(5, { message: 'Username must be at least 5 characters long!' })
    username: string;
  
    
    @IsOptional()
    @IsString({ message: 'Firstname must be a string!' })
    @IsDefined({ message: 'Firstname is required!' })
    firstname: string;
    
    @IsOptional()
    @IsString({ message: 'Firstname must be a string!' })
    @IsDefined({ message: 'Firstname is required!' })
    lastname: string;
  
    @IsOptional()
    @IsEmail({ message: 'Email must be a valid email!' })
    @IsString({ message: 'Email must be a string!' })
    @IsDefined({ message: 'Email is required!' })
    email: string;

    @IsDate({ message: 'Creation date must be a date!' })
    @IsOptional()
    dateOfBirth: Date;
  
    @IsOptional()
    @IsString({ message: 'Password must be a string!' })
    @IsDefined({ message: 'Password is required!' })
    @MinLength(8, { message: 'Password must be at least 8 characters long!' })
    password: string;
  
    @IsOptional()
    @IsString({ message: 'UserImageUrl must be a string!' })
    @IsDefined({ message: 'UserImageUrl is required!' })
    userImageUrl: string;
}