import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() payload: AuthDto) {
    return this.authService.signUp(payload);
  }

  @Post('signin')
  signIn(@Body() payload: AuthDto, @Req() req, @Res() res) {
    return this.authService.signIn(payload, req, res);
  }

  @Get('signout')
  signOut(@Req() req, @Res() res) {
    return this.authService.signOut(req, res);
  }
}
