import {
   Column,
   CreateDateColumn,
   DeleteDateColumn,
   Entity,
   OneToMany,
   PrimaryGeneratedColumn,
   Relation,
   Unique,
   UpdateDateColumn
} from 'typeorm';
import { UserRole } from '../enum';
import { ServicesEntity } from './services.entity';
import { VehiclesEntity } from './vehicles.entity';

@Entity('users')
@Unique(['email'])
export class UsersEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   name: string;

   @Column()
   email: string;

   @Column()
   password: string;

   @Column({ default: UserRole.CUSTOMER })
   role: UserRole;

   @CreateDateColumn({ name: 'created_at' })
   createdAt: Date;

   @UpdateDateColumn({ name: 'updated_at', nullable: true })
   updatedAt: Date;

   @DeleteDateColumn({ name: 'deleted_at', nullable: true })
   deletedAt: Date;

   // relations
   @OneToMany(() => VehiclesEntity, ({ owner }) => owner)
   vehicles: Relation<VehiclesEntity[]>;

   @OneToMany(() => ServicesEntity, ({ mechanic }) => mechanic)
   services: Relation<ServicesEntity[]>;
}
