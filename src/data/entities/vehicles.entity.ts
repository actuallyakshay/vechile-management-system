import {
   Column,
   CreateDateColumn,
   DeleteDateColumn,
   Entity,
   Index,
   JoinColumn,
   ManyToOne,
   OneToMany,
   PrimaryGeneratedColumn,
   Relation,
   Unique,
   UpdateDateColumn
} from 'typeorm';
import { ServicesEntity } from './services.entity';
import { UsersEntity } from './users.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Unique(['VIN'])
@Entity('vehicles')
export class VehiclesEntity {
   @ApiProperty()
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @ApiProperty()
   @Column()
   VIN: string;

   @ApiProperty()
   @Column()
   make: string;

   @ApiProperty()
   @Column()
   model: string;

   @ApiProperty()
   @Column()
   year: number;

   @ApiProperty()
   @CreateDateColumn({ name: 'created_at' })
   createdAt: Date;

   @ApiPropertyOptional()
   @UpdateDateColumn({ name: 'updated_at', nullable: true })
   updatedAt: Date;

   @ApiPropertyOptional()
   @DeleteDateColumn({ name: 'deleted_at', nullable: true })
   deletedAt: Date;

   // relations
   @ApiProperty({ type: () => UsersEntity })
   @ManyToOne(() => UsersEntity, ({ vehicles }) => vehicles, { onDelete: 'CASCADE' })
   @Index()
   @JoinColumn({ name: 'owner_id' })
   owner: Relation<UsersEntity>;

   @OneToMany(() => ServicesEntity, ({ vehicle }) => vehicle)
   services: Relation<ServicesEntity[]>;
}
