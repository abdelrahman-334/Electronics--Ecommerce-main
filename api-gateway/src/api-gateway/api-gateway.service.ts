import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ApiGatewayService {
  constructor(private readonly httpService: HttpService) {}

  async forwardRequest(url: string, method: string, body?: any, headers?: any) {
    const response = await lastValueFrom(
      this.httpService.request({
        url,
        method,
        data: body,
        headers,
        httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),
      }),
    );
    return response.data;
  }
}