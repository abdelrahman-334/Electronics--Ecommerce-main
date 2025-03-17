import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ApiGatewayService } from './api-gateway/api-gateway.service';
import { ApiGatewayController } from './api-gateway/api-gateway.controller';
import { ApiGatewayModule } from './api-gateway/api-gateway.module';
  
@Module({
  imports: [ConfigModule.forRoot(), HttpModule, ApiGatewayModule],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class AppModule {}