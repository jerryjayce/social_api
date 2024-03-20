import { IsNotEmpty, IsString, Length, IsNumber } from "class-validator";

export default class PostCommentDto {

    @IsString()
    @IsNotEmpty()
    @Length(1, 200)
        comment: string;

    @IsNumber()
        post_id: number;
    constructor(data: Partial<PostCommentDto>) {
        Object.assign(this, data);
    }

}
