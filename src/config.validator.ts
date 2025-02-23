import { plainToClass } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

enum EnvironmentType {
   DEV = 'development',
   PROD = 'production'
}

class EnvironmentVariables {
   @IsNotEmpty()
   @IsEnum(EnvironmentType)
   NODE_ENV: EnvironmentType;

   @IsNumber()
   PORT: number;

   @IsString()
   @IsNotEmpty()
   DB_HOST: string;

   @IsNumber()
   @IsNotEmpty()
   DB_PORT: number;

   @IsString()
   @IsNotEmpty()
   DB_USERNAME: string;

   @IsString()
   @IsNotEmpty()
   DB_PASSWORD: string;

   @IsString()
   @IsNotEmpty()
   DB_DATABASE: string;

   @IsString()
   @IsNotEmpty()
   GOOGLE_SERVICE_ACCOUNT_EMAIL: string;

   @IsString()
   @IsNotEmpty()
   GOOGLE_PRIVATE_KEY: string;
}

export function validateConfig(configuration: Record<string, unknown>) {
   const finalConfig = plainToClass(EnvironmentVariables, configuration, {
      enableImplicitConversion: true
   });

   const errors = validateSync(finalConfig, { skipMissingProperties: false });

   if (errors.length > 0) {
      throw new Error(errors.toString());
   }

   return finalConfig;
}
