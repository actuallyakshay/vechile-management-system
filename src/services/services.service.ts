import { Injectable } from '@nestjs/common';
import { JwtUser, ServiceFilters } from 'src/types';
import { GetAllServicesOutput, ScheduleServiceInput, UpdateServiceInput } from './dto';
import { ServicesRepository } from 'src/data/repositories';
import { ServiceStatus } from 'src/data/enum';
import { ServicesEntity } from 'src/data/entities';
import { FindOptionsWhere, In } from 'typeorm';
import { CustomHttpException, ErrorDetails, getPageValues } from 'src/utils';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { PaginationInputDto } from 'src/data/dto';

@Injectable()
export class ServicesService {
   constructor(
      private readonly serviceRepository: ServicesRepository,
      private readonly vehicleService: VehiclesService
   ) {}

   findService(input: FindOptionsWhere<ServicesEntity>): Promise<ServicesEntity | null> {
      return this.serviceRepository.findOneOrFail({ where: input });
   }

   async getVehicleServices(input: {
      customerId?: string;
      pagination: PaginationInputDto;
      filters: ServiceFilters;
      mechanicId?: string;
   }): Promise<GetAllServicesOutput> {
      const [data, total] = await this.serviceRepository.getServices(input);

      return {
         data,
         pagination: getPageValues({ total, pagination: input.pagination })
      };
   }

   async scheduleService(input: { body: ScheduleServiceInput; user: JwtUser }): Promise<ServicesEntity> {
      const {
         body: { vehicleId, mechanicId, ...rest },
         user: { id: userId }
      } = input;

      const [ongoingService] = await Promise.all([
         this.serviceRepository.findOneBy({
            status: In([ServiceStatus.SCHEDULED, ServiceStatus.IN_PROGRESS]),
            vehicle: { id: vehicleId }
         }),
         // if autumatically handle owmer conflict, coz m using findOneOrFail
         this.vehicleService.findVehicle({
            id: vehicleId,
            owner: { id: userId }
         })
      ]);

      if (ongoingService) {
         throw new CustomHttpException(
            ongoingService.status === ServiceStatus.IN_PROGRESS
               ? ErrorDetails.SERVICE_IS_IN_PROGRESS
               : ErrorDetails.SERVICE_IS_ALREADY_SCHEDULED
         );
      }

      return this.serviceRepository.save({
         ...rest,
         vehicle: { id: vehicleId },
         mechanic: { id: mechanicId },
         customer: { id: userId }
      });
   }

   async cancelServiceRequest(input: { serviceId: string; user: JwtUser }): Promise<ServicesEntity> {
      const { serviceId, user } = input;
      // we can ony cancel a service if it is in progress
      const foundSevice = await this.findService({
         id: serviceId,
         customer: { id: user.id }
      });

      if (foundSevice.status !== ServiceStatus.SCHEDULED) {
         throw new CustomHttpException(ErrorDetails.SERVICE_CANNOT_BE_CANCELLED);
      }

      return this.serviceRepository.save({
         ...foundSevice,
         status: ServiceStatus.CANCELLED
      });
   }

   async updateServiceStatus(input: { serviceId: string; mechanicId: string; body: UpdateServiceInput }): Promise<ServicesEntity> {
      const { serviceId, mechanicId, body } = input;

      const foundService = await this.findService({
         id: serviceId,
         mechanic: { id: mechanicId }
      });

      return this.serviceRepository.save({
         ...foundService,
         ...body
      });
   }
}
