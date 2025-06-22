// backend/core-service/src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/login Route
  @Post('login')
  login(@Body() loginDto: any) {
    return this.authService.login(loginDto);
  }
}