import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { JwtService } from '@nestjs/jwt';

@Module({
   controllers: [VehiclesController],
   providers: [VehiclesService, JwtService]
})
export class VehiclesModule {}
