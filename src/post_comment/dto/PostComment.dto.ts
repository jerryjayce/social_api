import { IsNotEmpty, IsString, Length } from "class-validator";

export default class PostCommentDto {

    @IsString()
    @IsNotEmpty()
    @Length(1, 200)
        comment: string;

    constructor(data: Partial<PostCommentDto>) {
        Object.assign(this, data);
    }

}
