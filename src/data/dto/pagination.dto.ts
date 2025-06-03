import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum SortOrder {
   ASC = 'ASC',
   DESC = 'DESC'
}

// this is for global pagination
export class PaginationInputDto {
   @ApiPropertyOptional({ description: 'Page', example: 1, default: 1 })
   @IsNumber()
   @IsOptional()
   @Type(() => Number)
   @Transform(({ value }) => value || 1, { toClassOnly: true })
   page: number = 1;

   @ApiPropertyOptional({ description: 'Limit', example: 10, default: 10 })
   @IsOptional()
   @IsNumber()
   @Type(() => Number)
   @Transform(({ value }) => Math.min(50, value || 20), { toClassOnly: true })
   limit: number = 20;

   @ApiPropertyOptional({ description: 'Order by field', example: 'createdAt' })
   @IsString()
   @IsOptional()
   orderBy?: string;

   @ApiPropertyOptional({ description: 'Sort order', example: 'ASC', enum: ['ASC', 'DESC'] })
   @IsEnum(SortOrder)
   @IsOptional()
   order?: SortOrder;
}

export interface IPaginationOutputDto {
   total: number;
   totalPages: number;
   next: number | null;
   prev: number | null;
}

export class PaginationPropertiesDto {
   @ApiProperty()
   total: number;

   @ApiProperty()
   totalPages: number;

   @ApiProperty()
   next: number | null;

   @ApiProperty()
   prev: number | null;
}

export class PaginationOutputDto {
   @ApiProperty({ type: PaginationPropertiesDto })
   pagination: PaginationPropertiesDto;
}
