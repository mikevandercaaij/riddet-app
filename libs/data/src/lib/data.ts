export interface ICommunity {
  name: string ,
  description: string ,
  creationDate: Date,
  imageUrl: string ,
  isPublic: boolean,
}

export interface IThread {
  title: string;
  content: string;
  publicationDate: Date;
  imageUrl: string;
  externLink: string;
  upvotes: number;
}

export interface IUser {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  dateOfBirth: Date;
  password: string;
  creationDate: Date;
  userImageUrl: string;
  isActive: boolean;
}

export interface IMessage {
  text: string;
  likes: number;
  dislikes: number;
  publicationDate: Date;
}

export interface ICategory {
  name: string;
}