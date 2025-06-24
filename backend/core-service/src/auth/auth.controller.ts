// backend/core-service/src/auth/auth.controller.ts
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminGuard } from './roles/admin.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/login Route
  @Post('login')
  login(@Body() loginDto: any) {
    return this.authService.login(loginDto);
  }

  // NEUE Route für die Registrierung
  @Post('register')
  register(@Body() registerDto: any) {
    return this.authService.register(registerDto);
  }

  // Beispiel für einen Admin-Endpunkt
  @Get('admin')
  @UseGuards(AdminGuard)
  getAdminData() {
    return { message: 'Dies ist ein geschützter Admin-Endpunkt' };
  }

  // Admin-only endpoint to get all users
  @Get('users')
  @UseGuards(AdminGuard)
  getAllUsers() {
    return this.authService.getAllUsers();
  }
}