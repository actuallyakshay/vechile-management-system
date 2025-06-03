import { Injectable, Optional } from '@nestjs/common';
import { EntityManager, EntityTarget, Repository } from 'typeorm';
import { ServicesEntity } from '../entities';

@Injectable()
export class ServicesRepository extends Repository<ServicesEntity> {
   constructor(@Optional() _target: EntityTarget<ServicesEntity>, entityManager: EntityManager) {
      super(ServicesEntity, entityManager);
   }
}
