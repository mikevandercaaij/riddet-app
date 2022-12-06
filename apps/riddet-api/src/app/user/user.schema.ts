import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from '@riddet-app/data';
import {
  IsBoolean,
  IsDate, IsDefined, IsEmail, IsString, Matches, MinLength
} from 'class-validator';
import { Document, ObjectId, Types } from 'mongoose';
import { Role } from '../auth/role.enum';
 
export type UserDocument = User & Document;

@Schema()
export class User implements IUser{
  _id : Types.ObjectId

  @IsString({ message: 'Username must be a string!' })
  @IsDefined({ message: 'Username is required!' })
  @MinLength(5, { message: 'Username must be at least 5 characters long!' })
  @Prop()
  username: string;

  @IsString({ message: 'Firstname must be a string!' })
  @IsDefined({ message: 'Firstname is required!' })
  @Prop()
  firstname: string;
  
  @IsString({ message: 'Lastname must be a string!' })
  @IsDefined({ message: 'Lastname is required!' })
  @Prop()
  lastname: string;

  @IsEmail({ message: 'Email must be a valid email!' })
  @IsString({ message: 'Email must be a string!' })
  @IsDefined({ message: 'Email is required!' })
  @Prop()
  email: string;

  @Matches(/^\d{4}[./-]\d{2}[./-]\d{2}$/, { message: 'Date of birth must be a valid date! (YYYY-MM-DD)' })
  @IsDefined({ message: 'Date of birth is required!' })
  @Prop()
  dateOfBirth: Date;

  @IsString({ message: 'Password must be a string!' })
  @IsDefined({ message: 'Password is required!' })
  @MinLength(8, { message: 'Password must be at least 8 characters long!' })
  @Prop()
  password: string;

  @IsString({ message: 'UserImageUrl must be a string!' })
  @IsDefined({ message: 'UserImageUrl is required!' })
  @Prop()
  userImageUrl: string;

  @IsDate({ message: 'Creation date must be a date!' })
  @Prop()
  creationDate: Date;

  @IsBoolean({message: 'isActive must be a boolean!'})
  @Prop()
  isActive: boolean;

  @Prop()
  roles: Role[];

  @Prop({
    default: [],
    ref: 'Community',
  })
  joinedCommunities : [ObjectId]

  @Prop({
    default: [],
    ref: 'Community',
  })
  createdCommunities : [ObjectId]

  @Prop({
    default: [],
    ref: 'User',
  })
  following : [ObjectId]

  @Prop({
    default: [],
    ref: 'User',
  })
  followers : [ObjectId]
}

export const UserSchema = SchemaFactory.createForClass(User);
