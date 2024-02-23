/// <reference types="express" />
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(payload: AuthDto): Promise<{
        massage: string;
    }>;
    signIn(payload: AuthDto, req: any, res: any): Promise<import("express").Response<any, Record<string, any>>>;
    signOut(req: any, res: any): Promise<import("express").Response<any, Record<string, any>>>;
}
