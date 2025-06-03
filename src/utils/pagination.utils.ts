import { IPageValues } from 'src/types';

export const getPageValues = (input: IPageValues) => {
   const { total, pagination } = input;
   const totalPages = Math.ceil(total / pagination.limit);
   const currentPage = pagination.page;
   const next = currentPage < totalPages ? currentPage + 1 : null;
   const prev = currentPage > 1 ? currentPage - 1 : null;

   return { next, prev, totalPages, total };
};
