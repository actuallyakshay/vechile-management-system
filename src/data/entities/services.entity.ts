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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('services')
export class ServicesEntity {
   @ApiProperty()
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @ApiProperty()
   @Column({ default: ServiceStatus.SCHEDULED })
   status: ServiceStatus;

   @ApiProperty()
   @Column({ name: 'scheduled_date' })
   scheduledDate: string;

   // can be 999.80 or something like
   @ApiProperty()
   @Column()
   cost: string;

   @ApiProperty()
   @Column({ name: 'duration_in_min' })
   durationInMin: number;

   @ApiProperty()
   @CreateDateColumn({ name: 'created_at' })
   createdAt: Date;

   @ApiPropertyOptional()
   @UpdateDateColumn({ name: 'updated_at', nullable: true })
   updatedAt: Date;

   @ApiPropertyOptional()
   @DeleteDateColumn({ name: 'deleted_at', nullable: true })
   deletedAt: Date;

   //    relations
   @ApiProperty({ type: () => VehiclesEntity })
   @ManyToOne(() => VehiclesEntity, ({ services }) => services, { onDelete: 'CASCADE' })
   @JoinColumn({ name: 'vehicle_id' })
   @Index()
   vehicle: Relation<VehiclesEntity>;

   @ApiProperty({ type: () => UsersEntity })
   @ManyToOne(() => UsersEntity, ({ services }) => services, { onDelete: 'CASCADE' })
   @JoinColumn({ name: 'customer_id' })
   @Index()
   customer: Relation<UsersEntity>;

   @ApiProperty({ type: () => UsersEntity })
   @ManyToOne(() => UsersEntity, ({ services }) => services, { onDelete: 'CASCADE' })
   @JoinColumn({ name: 'mechanic_id' })
   @Index()
   mechanic: Relation<UsersEntity>;
}
