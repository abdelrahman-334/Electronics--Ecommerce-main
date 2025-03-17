/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  createToken(payload: any): string {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  }

  validateToken(token: string): any {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
