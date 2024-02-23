import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<{
        email: string;
        id: string;
    }[]>;
    getMyUser(id: string, req: any): Promise<{
        user: {
            id: string;
            email: string;
            hashedPassword: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
