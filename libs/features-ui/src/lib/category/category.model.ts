import { ICategory } from "@riddet-app/data";
import { Types } from "mongoose";

export class Category implements ICategory {
    _id = Types.ObjectId;
    name = "";
}