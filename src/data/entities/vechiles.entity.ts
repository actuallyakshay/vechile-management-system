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

@Unique(['VIN'])
@Entity('vehicles')
export class VechilesEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   VIN: string;

   @Column()
   make: string;

   @Column()
   model: string;

   @Column()
   year: number;

   @CreateDateColumn({ name: 'created_at' })
   createdAt: Date;

   @UpdateDateColumn({ name: 'updated_at', nullable: true })
   updatedAt: Date;

   @DeleteDateColumn({ name: 'deleted_at', nullable: true })
   deletedAt: Date;

   // relations
   @ManyToOne(() => UsersEntity, ({ vechicles }) => vechicles, { onDelete: 'CASCADE' })
   @Index()
   @JoinColumn({ name: 'owner_id' })
   owner: Relation<UsersEntity>;

   @OneToMany(() => ServicesEntity, ({ vechile }) => vechile)
   services: Relation<ServicesEntity[]>;
}
