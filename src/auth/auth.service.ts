import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from 'src/utils/constants';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signUp(payload: AuthDto) {
    const { email, password } = payload;

    const foundUser = await this.prisma.user.findUnique({ where: { email } });

    if (foundUser) {
      throw new BadRequestException('email already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    await this.prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    return { massage: 'signUp was successful' };
  }

  async signIn(payload: AuthDto, req: Request, res: Response) {
    const { email, password } = payload;

    const foundUser = await this.prisma.user.findUnique({ where: { email } });

    if (!foundUser) {
      throw new BadRequestException("email doesn't exists");
    }

    const isMatch = await this.comparePasswords(
      password,
      foundUser.hashedPassword,
    );
    if (!isMatch) {
      throw new BadRequestException('invalid password');
    }

    // sign jwt and return to the user
    const token = await this.signToken({
      id: foundUser.id,
      email: foundUser.email,
    });

    if (!token) {
      throw new ForbiddenException('invalid token');
    }

    res.cookie('token', token, { httpOnly: true });
    return res.send({ massage: 'logged in was successful' });
  }

  async signOut(req: Request, res: Response) {
    res.clearCookie('token');
    return res.send({ massage: 'logged out was successful' });
  }
  //   hashPassword
  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  //   comparePasswords
  async comparePasswords(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
  //   signToken
  async signToken(args: { id: string; email: string }) {
    const payloade = args;
    return this.jwt.signAsync(payloade, { secret: jwtSecret });
  }
}
