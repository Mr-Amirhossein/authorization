import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getUsers(): Promise<{
        email: string;
        id: string;
    }[]>;
    getMyUser(id: string, req: Request): Promise<{
        user: {
            id: string;
            email: string;
            hashedPassword: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
