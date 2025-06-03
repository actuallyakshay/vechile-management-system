import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { CustomHttpException, ErrorDetails } from 'src/utils';
import { SignInInput, SignInOutput, SignUpInput, SignUpOutput } from './dto';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/data/enum';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
   constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService
   ) {}

   async signUp(input: { body: SignUpInput }): Promise<SignUpOutput> {
      const { body } = input;

      const hasedPassword = await bcrypt.hash(body.password, SALT_ROUNDS);

      return this.usersService.createUser({
         body: { ...body, password: hasedPassword }
      });
   }

   public async signIn(input: { body: SignInInput }): Promise<SignInOutput> {
      const { email, password } = input.body;

      const foundUser = await this.usersService.findUser({ email });

      const isMatch = await bcrypt.compare(password, foundUser.password);

      if (!isMatch) {
         throw new CustomHttpException(ErrorDetails.PASSWORD_MISMATCH);
      }

      return {
         accessToken: this.generateAccessToken({ id: foundUser.id, role: foundUser.role }),
         userId: foundUser.id
      };
   }

   private generateAccessToken(payload: { id: string; role: UserRole }): string {
      return this.jwtService.sign(payload);
   }
}
