import { Injectable, Optional } from '@nestjs/common';
import { JwtUser } from 'src/types';
import { EntityManager, EntityTarget, Repository } from 'typeorm';
import { PaginationInputDto } from '../dto';
import { VehiclesEntity } from '../entities';

@Injectable()
export class VehiclesRepository extends Repository<VehiclesEntity> {
   constructor(@Optional() _target: EntityTarget<VehiclesEntity>, entityManager: EntityManager) {
      super(VehiclesEntity, entityManager);
   }

   getCustomerVehicles(input: { user: JwtUser; pagination: PaginationInputDto }): Promise<[VehiclesEntity[], number]> {
      const {
         user: { id },
         pagination: { page, limit, orderBy, order }
      } = input;
      const queryBuilder = this.createQueryBuilder('vehicles')
         .leftJoinAndSelect('vehicles.owner', 'owner')
         .where('owner.id = :ownerId', { ownerId: id });

      if (orderBy) queryBuilder.orderBy(`vehicles.${orderBy}`, order || 'ASC');

      queryBuilder.skip((page - 1) * limit).take(limit);

      return queryBuilder.getManyAndCount();
   }
}
