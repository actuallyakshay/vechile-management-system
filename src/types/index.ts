import { PaginationInputDto } from 'src/data/dto';
import { ServiceStatus, UserRole } from 'src/data/enum';

export interface IPageValues {
   total: number;
   pagination: Partial<PaginationInputDto>;
}

export interface JwtUser {
   id: string;
   role: UserRole;
}

export interface ServiceFilters {
   status?: ServiceStatus;
}
