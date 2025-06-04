import { Injectable } from '@nestjs/common';
import { PaginationInputDto } from 'src/data/dto';
import { UsersEntity } from 'src/data/entities';
import { UsersRepository } from 'src/data/repositories';
import { GetUsersFilters } from 'src/types';
import { CustomHttpException, ErrorCodes, ErrorDetails, getPageValues, HandleNotFound } from 'src/utils';
import { FindOptionsWhere } from 'typeorm';
import { CreateUserInput, GetAllUsersOutput } from './dto';

@Injectable()
export class UsersService {
   constructor(private readonly usersRepository: UsersRepository) {}

   @HandleNotFound(ErrorCodes.USER_NOT_FOUND)
   public findUser(input: FindOptionsWhere<UsersEntity>): Promise<UsersEntity | null> {
      return this.usersRepository.findOneOrFail({ where: input });
   }

   public async createUser(input: { body: CreateUserInput }): Promise<UsersEntity> {
      const { body } = input;

      const foundUser = await this.usersRepository.findOneBy({ email: body.email });
      if (foundUser) throw new CustomHttpException(ErrorDetails.EMAIL_ALREADY_EXISTS);

      return this.usersRepository.save({ ...body });
   }

   public async getAllUsers(input: { pagination: PaginationInputDto; filters?: GetUsersFilters }): Promise<GetAllUsersOutput> {
      const [data, total] = await this.usersRepository.getAllUsers(input);
      return {
         data,
         pagination: getPageValues({ total, pagination: input.pagination })
      };
   }
}
