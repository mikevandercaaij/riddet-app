import { IsDefined, IsString } from "class-validator";

export class MessageDto {
    @IsString({ message: 'Text must be a string!' })
    @IsDefined({ message: 'Text is required!' })
    text: string;
}