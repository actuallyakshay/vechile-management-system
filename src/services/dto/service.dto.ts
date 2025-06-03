import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { ServiceStatus } from 'src/data/enum';

export class ScheduleServiceInput {
   // can be 999.80 or something like
   @ApiProperty({
      description: 'Cost of the service in a string format, e.g., "999.80"'
   })
   @IsString()
   @IsNotEmpty()
   cost: string;

   @ApiProperty({
      description: 'Duration of the service in minutes, e.g., 60'
   })
   @IsNumber()
   @IsNotEmpty()
   durationInMin: number;

   @ApiProperty()
   @IsUUID('all')
   @IsString()
   @IsNotEmpty()
   vehicleId: string;

   @ApiProperty()
   @IsUUID('all')
   @IsString()
   @IsNotEmpty()
   mechanicId: string;

   @ApiProperty({
      description: 'Scheduled date for the service in ISO 8601 format, e.g., "2023-10-01T12:00:00Z"',
      example: '2023-10-01T12:00:00Z'
   })
   @IsString()
   @IsNotEmpty()
   scheduledDate: string;
}

export class UpdateServiceInput {
   @ApiProperty({ enum: ServiceStatus })
   @IsEnum(ServiceStatus)
   @IsNotEmpty()
   @IsString()
   status: ServiceStatus;
}
