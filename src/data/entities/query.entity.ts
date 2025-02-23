import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export type TEPurposeOfQuery = 'BUY' | 'SELL';

@Entity({ name: 'queries' })
export class QueryEntity {
   @ApiProperty()
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @ApiProperty()
   @Column({ name: 'name' })
   name: string;

   @ApiProperty()
   @Column({ name: 'email' })
   email: string;

   @ApiProperty()
   @Column({ name: 'phone_number' })
   phoneNumber: string;

   @ApiProperty()
   @Column({ name: 'quantity' })
   quantity: number;

   @ApiProperty()
   @Column({ name: 'purpose_of_query' })
   purposeOfQuery: string;

   @ApiProperty()
   @Column({ name: 'message' })
   message: string;

   @ApiPropertyOptional()
   @DeleteDateColumn({ name: 'deleted_at', nullable: true })
   deletedAt: Date;

   @ApiPropertyOptional()
   @UpdateDateColumn({ name: 'updated_at', nullable: true })
   updatedAt: Date;

   @ApiProperty()
   @CreateDateColumn({ name: 'created_at' })
   createdAt: Date;
}
