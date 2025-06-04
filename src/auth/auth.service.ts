import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { CustomHttpException, ErrorDetails } from 'src/utils';
import { CreateStaffInput, SignInInput, SignInOutput, SignUpInput, SignUpOutput } from './dto';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/data/enum';
import { ConfigService } from '@nestjs/config';
import { UsersEntity } from 'src/data/entities';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
   constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService,
      private readonly configService: ConfigService
   ) {}

   // async onModuleInit() {
   //    await this.usersService.createUser({
   //       body: {
   //          email: 'akshay.rajput1197@gmail.com',
   //          name: 'Akshay Rajput',
   //          password: await bcrypt.hash('password', SALT_ROUNDS),
   //          role: UserRole.MANAGER
   //       }
   //    });
   // }

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

   /*
   
   INFO::
   The actual flow in real world is:
   Manager creates staff, satff get and tokenised email,
   after clicking on the link, staff is redirected to a page
   where they can set their password.


   Disclaimer::: I don't have paid plan to send the emails, sorry for that.
   So, I am just creating staff with password.
   */

   // only manager can create staff
   public async createStaff(input: { body: CreateStaffInput }): Promise<UsersEntity> {
      const { body } = input;
      const hasedPassword = await bcrypt.hash(body.password, SALT_ROUNDS);
      return this.usersService.createUser({
         body: { ...body, password: hasedPassword, role: UserRole.MECHANIC }
      });
   }

   private generateAccessToken(payload: { id: string; role: UserRole }): string {
      return this.jwtService.sign(payload, {
         secret: this.configService.get('JWT_SECRET'),
         expiresIn: this.configService.get('JWT_EXPIRATION_TIME')
      });
   }
}
