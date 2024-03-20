import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class LoginDto {

    @IsString()
    @IsNotEmpty()
        password: string;

    @IsEmail()
        email: string;

    constructor(data: Partial<LoginDto>) {
        Object.assign(this, data);
    }
}
