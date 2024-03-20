import { IsNotEmpty, IsString, Length } from "class-validator";

export default class CreatePostDto {

    @IsString()
    @IsNotEmpty()
    @Length(1, 200)
        post: string;

    constructor(data: Partial<CreatePostDto>) {
        Object.assign(this, data);
    }

}
