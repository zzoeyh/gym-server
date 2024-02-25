import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;

    // 配置 异常返回值
    const exceptionResponse: any = exception.getResponse();
    let validatorMessage = exceptionResponse;
    console.log(
      '🚀 ~ file: http-execption.filter.ts ~ line 22 ~ HttpExceptionFilter ~ validatorMessage',
      validatorMessage,
    );
    if (typeof validatorMessage == 'object') {
      validatorMessage = validatorMessage.message;
    }

    response.status(status).json({
      code: status,
      message: validatorMessage || message,
    });
  }
}
