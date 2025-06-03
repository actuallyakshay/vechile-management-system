import { PaginationInputDto } from 'src/data/dto';

export interface IPageValues {
   total: number;
   pagination: Partial<PaginationInputDto>;
}
