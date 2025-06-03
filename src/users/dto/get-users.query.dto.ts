import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { PaginationInputDto } from 'src/data/dto';
import { UserRole } from 'src/data/enum';

export class GetUsersQueryDto extends PaginationInputDto {
   @ApiPropertyOptional({
      enum: UserRole,
      isArray: true
   })
   @IsOptional()
   @Transform(({ value }) => {
      if (typeof value === 'string') {
         return value.split(',').map((role) => role.trim());
      }
      return value;
   })
   roles: string[];

   @ApiPropertyOptional()
   @IsString()
   @IsOptional()
   search?: string;
}
