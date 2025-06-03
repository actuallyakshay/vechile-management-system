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
import { UsersEntity } from './users.entity';
import { VechilesEntity } from './vechiles.entity';
import { ServiceStatus } from '../enum';

@Entity('services')
export class ServicesEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   status: ServiceStatus;

   @Column({ name: 'scheduled_date' })
   scheduledDate: string;

   @Column()
   cost: number;

   @Column({ name: 'duration_in_min' })
   durationInMin: number;

   @CreateDateColumn({ name: 'created_at' })
   createdAt: Date;

   @UpdateDateColumn({ name: 'updated_at', nullable: true })
   updatedAt: Date;

   @DeleteDateColumn({ name: 'deleted_at', nullable: true })
   deletedAt: Date;

   //    relations

   @ManyToOne(() => VechilesEntity, ({ services }) => services, { onDelete: 'CASCADE' })
   @JoinColumn({ name: 'vehicle_id' })
   @Index()
   vechile: string;

   @ManyToOne(() => UsersEntity, ({ services }) => services, { onDelete: 'CASCADE' })
   @JoinColumn({ name: 'mechanic_id' })
   @Index()
   mechanic: Relation<UsersEntity>;
}
