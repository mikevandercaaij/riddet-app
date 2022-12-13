import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from '@riddet-app/data';
import {
  IsBoolean,
  IsDate, IsDefined, isEmail, IsEmail, IsString, Matches, MinLength
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
  @Prop({
    required: true,
    unique: true,
  })
  username: string;

  @IsString({ message: 'Firstname must be a string!' })
  @IsDefined({ message: 'Firstname is required!' })
  @Prop({
    required: true,
  })
  firstname: string;
  
  @IsString({ message: 'Lastname must be a string!' })
  @IsDefined({ message: 'Lastname is required!' })
  @Prop({
    required: true,
  })
  lastname: string;

  @IsEmail({ message: 'Email must be a valid email!' })
  @IsString({ message: 'Email must be a string!' })
  @IsDefined({ message: 'Email is required!' })
  @Prop({    required: true, unique: true,
    validate: {
      validator: isEmail,
      message: 'Email address is invalid',
    }})
  email: string;

  @Matches(/^\d{4}[./-]\d{2}[./-]\d{2}$/, { message: 'Date of birth must be a valid date! (YYYY-MM-DD)' })
  @IsDefined({ message: 'Date of birth is required!' })
  @Prop({required: true,
    validate: {
      validator: IsDate,
      message: 'Email address is invalid',
    }})
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
  @Prop({
    required: true,
    default: true,
  })
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
