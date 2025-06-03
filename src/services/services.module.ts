import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { JwtService } from '@nestjs/jwt';

@Module({
   controllers: [ServicesController],
   providers: [ServicesService, VehiclesService, JwtService]
})
export class ServicesModule {}
