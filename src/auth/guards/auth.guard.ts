import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtUser } from 'src/types';

@Injectable()
export class JwtAuthGuard implements CanActivate {
   constructor(
      private readonly jwtService: JwtService,
      private readonly configService: ConfigService
   ) {}

   async canActivate(ctx: ExecutionContext): Promise<boolean> {
      const request = ctx.switchToHttp().getRequest();

      const token = request.headers.authorization?.split('Bearer ')[1];

      if (!token) return false;

      try {
         const payload = await this.jwtService.verifyAsync(token, {
            secret: this.configService.get('JWT_SECRET')
         });

         request['user'] = payload as JwtUser;
         return true;
      } catch (error) {
         throw new UnauthorizedException('Invalid Token');
      }
   }
}
