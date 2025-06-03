import { HttpStatus } from '@nestjs/common';

export enum ErrorCodes {
   UNAUTHORIZED
}

export const ErrorDetails: Record<
   ErrorCodes,
   {
      code: ErrorCodes;
      message: string;
      statusCode: HttpStatus;
   }
> = {
   [ErrorCodes.UNAUTHORIZED]: {
      code: ErrorCodes.UNAUTHORIZED,
      message: 'Unauthorized',
      statusCode: HttpStatus.UNAUTHORIZED
   }
};
