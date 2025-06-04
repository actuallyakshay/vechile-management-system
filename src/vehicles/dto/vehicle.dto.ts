import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PaginationOutputDto } from 'src/data/dto';
import { VehiclesEntity } from 'src/data/entities';

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

export class GetAllVehiclesOutput extends PaginationOutputDto {
   @ApiProperty({ type: [VehiclesEntity] })
   data: VehiclesEntity[];
}
