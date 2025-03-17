/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../shared/jwt/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: { username: string; password: string }) {
    return this.authService.signup(body.username, body.password);
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body.username, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  async protectedRoute() {
    return { message: 'You have accessed a protected route!' };
  }

  // New endpoint to verify tokens
  @Post('verify-token')
  async verifyToken(@Body() body: { token: string }) {
    try {
      const decoded = this.authService.verifyToken(body.token);
      return { valid: true, decoded };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }
}
