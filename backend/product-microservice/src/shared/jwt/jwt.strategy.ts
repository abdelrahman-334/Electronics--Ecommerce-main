/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, // Ensure this matches auth-service0
    });
  }

  async validate(payload: any) {
    console.log('Validating Token Payload:', payload); // Log the token payload
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }
    return { userId: payload.id, username: payload.username };
  }  
}
