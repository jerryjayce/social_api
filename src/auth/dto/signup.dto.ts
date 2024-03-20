import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsString, Length } from "class-validator";

export default class SignUpDto {

    @IsString()
    @IsNotEmpty()
        full_name: string;

    @IsNumber()
    @IsNotEmpty()
        age: string;

    @IsEmail()
        email: string;

    @IsString()
    @IsNotEmpty()
        password: string;

    @Length(11, 11)
    @IsNumberString()
    @IsNotEmpty()
        phone: string;


    constructor(data: Partial<SignUpDto>) {
        Object.assign(this, data);
    }

}
