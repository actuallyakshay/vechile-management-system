import { applyDecorators, InternalServerErrorException, UseFilters } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { CustomHttpException, GlobalExceptionFilter } from './global-exception-filter';
import { ErrorDetails } from './error-codes';

export function HandleNotFound(errorDetail: string) {
   return applyDecorators(UseFilters(new GlobalExceptionFilter()), (target: any, key: string, descriptor: PropertyDescriptor) => {
      const originalMethod = descriptor.value;

      descriptor.value = async function (...args: any[]) {
         try {
            return await originalMethod.apply(this, args);
         } catch (error) {
            console.log('error', error);
            if (error instanceof EntityNotFoundError) {
               throw new CustomHttpException(ErrorDetails[errorDetail]);
            }
            throw new InternalServerErrorException('An unexpected error occurred');
         }
      };
   });
}
