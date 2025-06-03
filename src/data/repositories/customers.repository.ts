import { Injectable, Optional } from '@nestjs/common';
import { EntityManager, EntityTarget, Repository } from 'typeorm';
import { UsersEntity } from '../entities';
import { GetUsersFilters } from 'src/types';
import { PaginationInputDto } from '../dto';

@Injectable()
export class UsersRepository extends Repository<UsersEntity> {
   constructor(@Optional() _target: EntityTarget<UsersEntity>, entityManager: EntityManager) {
      super(UsersEntity, entityManager);
   }

   getAllUsers(input: { pagination: PaginationInputDto; filters?: GetUsersFilters }): Promise<[UsersEntity[], number]> {
      const {
         pagination: { page, limit, orderBy, order },
         filters: { roles, search }
      } = input;

      const queryBuilder = this.createQueryBuilder('user');

      if (!!roles.length) {
         queryBuilder.andWhere('user.role IN (:...roles)', { roles });
      }

      if (search) {
         queryBuilder.andWhere('(user.name ILIKE :search OR user.email ILIKE :search)', { search: `%${search}%` });
      }

      if (orderBy) queryBuilder.orderBy(`user.${orderBy}`, order || 'ASC');

      queryBuilder.skip((page - 1) * limit).take(limit);

      return queryBuilder.getManyAndCount();
   }
}
