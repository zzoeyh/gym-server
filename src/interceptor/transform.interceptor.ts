import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((result) => {
        if (result && result.__code) {
          return {
            code: result.__code,
            message: result.__message,
            data: null,
          };
        }
        return {
          code: 200,
          message: 'success',
          data: result,
        };
      }),
    );
  }
}
