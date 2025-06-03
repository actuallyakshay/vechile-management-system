import { Injectable, Optional } from '@nestjs/common';
import { EntityManager, EntityTarget, Repository } from 'typeorm';
import { ServicesEntity } from '../entities';
import { PaginationInputDto } from '../dto';
import { ServiceFilters } from 'src/types';

@Injectable()
export class ServicesRepository extends Repository<ServicesEntity> {
   constructor(@Optional() _target: EntityTarget<ServicesEntity>, entityManager: EntityManager) {
      super(ServicesEntity, entityManager);
   }

   getServices(input: {
      customerId?: string;
      pagination: PaginationInputDto;
      filters: ServiceFilters;
      mechanicId?: string;
   }): Promise<[ServicesEntity[], number]> {
      const {
         pagination: { page, order, limit, orderBy },
         filters: { status },
         mechanicId,
         customerId
      } = input;

      const queryBuilder = this.createQueryBuilder('service')
         .leftJoinAndSelect('service.vehicle', 'vehicle')
         .leftJoinAndSelect('service.customer', 'customer')
         .leftJoinAndSelect('service.mechanic', 'mechanic');

      if (customerId) queryBuilder.where('customer.id = :customerId', { customerId });

      if (mechanicId) queryBuilder.andWhere('mechanic.id = :mechanicId', { mechanicId });

      if (status) queryBuilder.andWhere('service.status = :status', { status });

      if (orderBy) queryBuilder.orderBy(`service.${orderBy}`, order || 'ASC');

      queryBuilder.skip((page - 1) * limit).take(limit);

      return queryBuilder.getManyAndCount();
   }
}
