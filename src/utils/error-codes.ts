import { HttpStatus } from '@nestjs/common';

export enum ErrorCodes {
   UNAUTHORIZED = 'UNAUTHORIZED',
   PASSWORD_MISMATCH = 'PASSWORD_MISMATCH',
   DUPLICATE_VIN = 'DUPLICATE_VIN',
   VEHICLE_NOT_FOUND = 'VEHICLE_NOT_FOUND',
   USER_NOT_FOUND = 'USER_NOT_FOUND',
   SERVICE_IS_IN_PROGRESS = 'SERVICE_IS_IN_PROGRESS',
   OWNER_CONFLICT = 'OWNER_CONFLICT',
   SERVICE_CANNOT_BE_CANCELLED = 'SERVICE_CANNOT_BE_CANCELLED',
   EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
   SERVICE_IS_ALREADY_SCHEDULED = 'SERVICE_IS_ALREADY_SCHEDULED'
}

export const ErrorDetails: Record<
   ErrorCodes,
   {
      code: ErrorCodes;
      message: string;
      statusCode: HttpStatus;
   }
> = {
   UNAUTHORIZED: {
      code: ErrorCodes.UNAUTHORIZED,
      message: 'Unauthorized',
      statusCode: HttpStatus.UNAUTHORIZED
   },
   PASSWORD_MISMATCH: {
      code: ErrorCodes.PASSWORD_MISMATCH,
      message: 'Password mismatch',
      statusCode: HttpStatus.UNAUTHORIZED
   },
   DUPLICATE_VIN: {
      code: ErrorCodes.DUPLICATE_VIN,
      message: 'Vehicle with this VIN already exists',
      statusCode: HttpStatus.BAD_REQUEST
   },
   VEHICLE_NOT_FOUND: {
      code: ErrorCodes.VEHICLE_NOT_FOUND,
      message: 'Vehicle not found',
      statusCode: HttpStatus.NOT_FOUND
   },
   USER_NOT_FOUND: {
      code: ErrorCodes.USER_NOT_FOUND,
      message: 'User not found',
      statusCode: HttpStatus.NOT_FOUND
   },
   SERVICE_IS_IN_PROGRESS: {
      code: ErrorCodes.SERVICE_IS_IN_PROGRESS,
      message: 'Service is already in progress for this vehicle',
      statusCode: HttpStatus.BAD_REQUEST
   },
   OWNER_CONFLICT: {
      code: ErrorCodes.OWNER_CONFLICT,
      message: 'Vehicle already has an owner',
      statusCode: HttpStatus.BAD_REQUEST
   },
   SERVICE_CANNOT_BE_CANCELLED: {
      code: ErrorCodes.SERVICE_CANNOT_BE_CANCELLED,
      message: 'Service cannot be cancelled at this stage',
      statusCode: HttpStatus.BAD_REQUEST
   },
   EMAIL_ALREADY_EXISTS: {
      code: ErrorCodes.EMAIL_ALREADY_EXISTS,
      message: 'Email already exists',
      statusCode: HttpStatus.BAD_REQUEST
   },
   SERVICE_IS_ALREADY_SCHEDULED: {
      code: ErrorCodes.SERVICE_IS_ALREADY_SCHEDULED,
      message: 'Service is already scheduled for this vehicle',
      statusCode: HttpStatus.BAD_REQUEST
   }
};
