import { Injectable } from '@nestjs/common';
import { SignUpInput } from 'src/auth/dto';
import { UsersEntity } from 'src/data/entities';
import { UsersRepository } from 'src/data/repositories';
import { FindOptionsWhere } from 'typeorm';
import { UserDetailsOutput } from './dto';
import { ErrorCodes, HandleNotFound } from 'src/utils';

@Injectable()
export class UsersService {
   constructor(private readonly usersRepository: UsersRepository) {}

   @HandleNotFound(ErrorCodes.USER_NOT_FOUND)
   public findUser(input: FindOptionsWhere<UsersEntity>): Promise<UserDetailsOutput | null> {
      return this.usersRepository.findOneOrFail({ where: input });
   }

   public createUser(input: { body: SignUpInput }): Promise<UsersEntity> {
      const { body } = input;
      return this.usersRepository.save({ ...body });
   }
}
