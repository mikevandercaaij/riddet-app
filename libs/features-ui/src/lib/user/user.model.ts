import { IUser } from "@riddet-app/data";
import { Types } from "mongoose";

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
    token = ''
}