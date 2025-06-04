import { Injectable } from '@nestjs/common';
import { PaginationInputDto } from 'src/data/dto';
import { VehiclesEntity } from 'src/data/entities';
import { VehiclesRepository } from 'src/data/repositories';
import { JwtUser } from 'src/types';
import { CustomHttpException, ErrorCodes, ErrorDetails, getPageValues, HandleNotFound } from 'src/utils';
import { FindOptionsWhere } from 'typeorm';
import { CreateVehicleInput, GetAllVehiclesOutput, UpdateVehicleInput } from './dto';

@Injectable()
export class VehiclesService {
   constructor(private readonly vehiclesRepository: VehiclesRepository) {}

   @HandleNotFound(ErrorCodes.VEHICLE_NOT_FOUND)
   public findVehicle(input: FindOptionsWhere<VehiclesEntity>): Promise<VehiclesEntity | null> {
      return this.vehiclesRepository.findOneOrFail({ where: input });
   }

   async getCustomerVehicles(input: { user: JwtUser; pagination: PaginationInputDto }): Promise<GetAllVehiclesOutput> {
      const [data, total] = await this.vehiclesRepository.getCustomerVehicles(input);

      return {
         data,
         pagination: getPageValues({ total, pagination: input.pagination })
      };
   }

   async createVehicle(input: { user: JwtUser; body: CreateVehicleInput }): Promise<VehiclesEntity> {
      const {
         user: { id },
         body
      } = input;

      const foundVehicle = await this.vehiclesRepository.findOneBy({ VIN: body.VIN });

      if (foundVehicle) throw new CustomHttpException(ErrorDetails.DUPLICATE_VIN);

      return this.vehiclesRepository.save({
         ...body,
         owner: { id }
      });
   }

   async updateVehicle(input: { body: UpdateVehicleInput; id: string }): Promise<VehiclesEntity> {
      const { body, id } = input;
      const foundVehicle = await this.findVehicle({ id });

      return this.vehiclesRepository.save({
         ...foundVehicle,
         ...body
      });
   }
}
