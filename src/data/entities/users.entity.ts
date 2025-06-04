import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
   @ApiProperty()
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @ApiProperty()
   @Column()
   name: string;

   @ApiProperty()
   @Column()
   email: string;

   @ApiProperty()
   @Column()
   password: string;

   @ApiProperty()
   @Column({ default: UserRole.CUSTOMER })
   role: UserRole;

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
   @OneToMany(() => VehiclesEntity, ({ owner }) => owner)
   vehicles: Relation<VehiclesEntity[]>;

   @OneToMany(() => ServicesEntity, ({ mechanic }) => mechanic)
   services: Relation<ServicesEntity[]>;
}
