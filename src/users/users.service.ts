import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.user.findMany({
      select: { id: true, email: true },
    });
  }

  async getMyUser(id: string, req: Request) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const deCodedUser = req.user as { id: string; email: string };

    if (user.id !== deCodedUser.id) {
      throw new ForbiddenException();
    }
    delete user.hashedPassword;
    return { user };
  }
}
