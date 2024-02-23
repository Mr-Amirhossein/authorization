import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    signUp(payload: AuthDto): Promise<{
        massage: string;
    }>;
    signIn(payload: AuthDto, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    signOut(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    hashPassword(password: string): Promise<string>;
    comparePasswords(password: string, hashedPassword: string): Promise<boolean>;
    signToken(args: {
        id: string;
        email: string;
    }): Promise<string>;
}
