import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Default values
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Something went wrong!';
    let errorDetails: any = {};

    // Handle known NestJS HttpException errors
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res: any = exception.getResponse();
      message = res.message || exception.message;
      errorDetails = res.error || {};
    }
    // Handle unknown errors
    else if (exception instanceof Error) {
      message = exception.message;
    }

    // Custom structured response (similar to your Express handler)
    response.status(status).json({
      success: false,
      message,
      path: request.url,
      statusCode: status,
      error: errorDetails,
      timestamp: new Date().toISOString(),
    });
  }
}
