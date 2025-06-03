import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ErrorDetails } from './error-codes';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
   private logger = new Logger('GlobalExceptionFilter');
   catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();

      const status = this.getStatus(exception);
      const errorResponse = this.buildErrorResponse(exception, request.url, status);

      response.status(status).json(errorResponse);
   }

   private buildErrorResponse(exception: any, path: string, status: number) {
      return {
         statusCode: status,
         message: this.getErrorMessage(exception),
         code: this.getErrorCode(exception),
         timestamp: new Date().toISOString(),
         path
      };
   }

   private getErrorMessage(exception: any): string[] {
      console.log({ exception });
      const response = this.getHttpResponse(exception);
      return response?.message ? (Array.isArray(response.message) ? response.message : [response.message]) : ['Internal server error'];
   }

   private getErrorCode(exception: any): string {
      const response = this.getHttpResponse(exception);
      return response?.code || 'INTERNAL_SERVER_ERROR';
   }

   private getStatus(exception: any): number {
      const response = this.getHttpResponse(exception);

      return (response?.code && ErrorDetails[response.code]?.statusCode) || HttpStatus.INTERNAL_SERVER_ERROR;
   }

   private getHttpResponse(exception: any): any {
      console.log(exception);
      this.logger.error(exception);
      return exception instanceof HttpException ? exception.getResponse() : null;
   }
}

export class CustomHttpException extends HttpException {
   constructor(errorDetail: (typeof ErrorDetails)[keyof typeof ErrorDetails], customMessage?: string) {
      super(
         {
            message: [customMessage || errorDetail.message],
            code: errorDetail.code
         },
         errorDetail.statusCode
      );
   }
}
