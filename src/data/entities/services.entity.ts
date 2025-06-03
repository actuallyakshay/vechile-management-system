import {
   Column,
   CreateDateColumn,
   DeleteDateColumn,
   Entity,
   Index,
   JoinColumn,
   ManyToOne,
   PrimaryGeneratedColumn,
   Relation,
   UpdateDateColumn
} from 'typeorm';
import { ServiceStatus } from '../enum';
import { UsersEntity } from './users.entity';
import { VehiclesEntity } from './vehicles.entity';

@Entity('services')
export class ServicesEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({ default: ServiceStatus.SCHEDULED })
   status: ServiceStatus;

   @Column({ name: 'scheduled_date' })
   scheduledDate: string;

   // can be 999.80 or something like
   @Column()
   cost: string;

   @Column({ name: 'duration_in_min' })
   durationInMin: number;

   @CreateDateColumn({ name: 'created_at' })
   createdAt: Date;

   @UpdateDateColumn({ name: 'updated_at', nullable: true })
   updatedAt: Date;

   @DeleteDateColumn({ name: 'deleted_at', nullable: true })
   deletedAt: Date;

   //    relations
   @ManyToOne(() => VehiclesEntity, ({ services }) => services, { onDelete: 'CASCADE' })
   @JoinColumn({ name: 'vehicle_id' })
   @Index()
   vehicle: Relation<VehiclesEntity>;

   @ManyToOne(() => UsersEntity, ({ services }) => services, { onDelete: 'CASCADE' })
   @JoinColumn({ name: 'customer_id' })
   @Index()
   customer: Relation<UsersEntity>;

   @ManyToOne(() => UsersEntity, ({ services }) => services, { onDelete: 'CASCADE' })
   @JoinColumn({ name: 'mechanic_id' })
   @Index()
   mechanic: Relation<UsersEntity>;
}
