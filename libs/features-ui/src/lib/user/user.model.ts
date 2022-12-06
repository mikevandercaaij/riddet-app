import { IUser } from "@riddet-app/data";
import { Types } from "mongoose";
import { Role } from "./user.roles.enum";

export class User implements IUser {
    _id = new Types.ObjectId;
    username = '';
    firstname = '';
    lastname = '';
    email = '';
    dateOfBirth = new Date();
    password = '';
    creationDate = new Date();
    userImageUrl = '';
    isActive = true;
    roles: Role[] = [];
    following: Types.ObjectId[] = [];
    followers: Types.ObjectId[] = [];
    createdCommunities: Types.ObjectId[] = [];
    joinedCommunities: Types.ObjectId[] = [];
    access_token = ''
}