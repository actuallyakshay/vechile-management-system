import { Injectable, Optional } from '@nestjs/common';
import { EntityManager, EntityTarget, Repository } from 'typeorm';
import { VechilesEntity } from '../entities';

@Injectable()
export class VechilesRepository extends Repository<VechilesEntity> {
   constructor(@Optional() _target: EntityTarget<VechilesEntity>, entityManager: EntityManager) {
      super(VechilesEntity, entityManager);
   }
}
