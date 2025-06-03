import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationInputDto } from 'src/data/dto';
import { ServiceStatus } from 'src/data/enum';

export class GetServicesQueryDto extends PaginationInputDto {
   @ApiPropertyOptional({ enum: ServiceStatus, example: ServiceStatus.SCHEDULED })
   @IsOptional()
   @IsEnum(ServiceStatus)
   status?: ServiceStatus;
}
