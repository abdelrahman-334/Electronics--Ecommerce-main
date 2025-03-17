/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from './jwt.service';
import { JwtAuthGuard } from './jwt.guard';

@Module({
  imports: [PassportModule],
  providers: [JwtStrategy, JwtService, JwtAuthGuard],
  exports: [PassportModule, JwtService, JwtAuthGuard], // Export JwtAuthGuard
})
export class JwtModule {}
