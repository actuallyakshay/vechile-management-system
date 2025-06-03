import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Module({
   imports: [
      JwtModule.registerAsync({
         useFactory: async (configService: ConfigService) => ({
            secret: configService.get('JWT_SECRET'),
            signOptions: { expiresIn: configService.get('JWT_EXPIRATION_TIME') }
         }),
         inject: [ConfigService]
      })
   ],
   providers: [AuthService, UsersService],
   controllers: [AuthController],
   exports: [AuthService, JwtModule]
})
export class AuthModule {}
