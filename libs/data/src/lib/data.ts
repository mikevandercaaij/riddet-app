export class Community {
  constructor(
    public _id: string,
    public name: string ,
    public description: string ,
    public creationDate: Date,
    public imageUrl: string ,
    public isPublic: boolean,
  ){}
}