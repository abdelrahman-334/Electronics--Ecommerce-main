import { Controller, All, Req, Res, HttpStatus } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { Request, Response } from 'express';

@Controller('api-gateway')
export class ApiGatewayController {
  constructor(private readonly gatewayService: ApiGatewayService) {}

  @All('*')
  async handleAllRoutes(@Req() req: Request, @Res() res: Response) {
    const { method, originalUrl, body, headers } = req;

    let targetUrl = '';

    const trimmedUrl = originalUrl.replace('/api-gateway', '');

    console.log("originalURL is: ", originalUrl)
    console.log("trimmedURl is: ", trimmedUrl)
    console.log("body is: ", body)

    if (trimmedUrl.startsWith('/auth')) {
      targetUrl = `http://localhost:3001${trimmedUrl}`;
    } else if (trimmedUrl.startsWith('/inventory')) {
      targetUrl = `http://localhost:3002${trimmedUrl}`;
    } else if (trimmedUrl.startsWith('/orders')) {
      targetUrl = `http://localhost:3003${trimmedUrl}`;
    } else if (trimmedUrl.startsWith('/payments')) { 
      targetUrl = `http://localhost:3004${trimmedUrl}`;
    } else if (trimmedUrl.startsWith('/products')) {
      targetUrl = `http://localhost:3005${trimmedUrl}`;
    }

    if (!targetUrl) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'Route not found in API Gateway' });
    }

    console.log("calling api: ", targetUrl)

    try {
      const response = await this.gatewayService.forwardRequest(
        targetUrl,
        method,
        body,
        headers,
      );
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      console.error('Error forwarding request:', error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Failed to process request in API Gateway',
        error: error.message,
      });
    }
   }
}