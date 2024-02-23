import { IsEmail , IsNotEmpty, IsString, Length } from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    @Length(4, 20,{message : "password must be between 4 and 20 characters"})
    public password: string;
}