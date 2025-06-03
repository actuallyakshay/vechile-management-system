import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVehicleInput {
   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   VIN: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   make: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   model: string;

   @ApiProperty()
   @IsNumber()
   @IsNotEmpty()
   year: number;
}

export class UpdateVehicleInput extends PartialType(OmitType(CreateVehicleInput, ['VIN'])) {}
