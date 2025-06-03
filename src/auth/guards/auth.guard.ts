import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtGuard implements CanActivate {
   constructor(private jwt: JwtService) {}

   async canActivate(ctx: ExecutionContext): Promise<boolean> {
      const req = ctx.switchToHttp().getRequest<Request>();
      const auth = req.headers['authorization'];
      if (!auth || !auth.startsWith('Bearer ')) {
         throw new UnauthorizedException();
      }

      try {
         const token = auth.split(' ')[1];
         const payload = await this.jwt.verifyAsync(token);
         req['user'] = payload;
         return true;
      } catch {
         throw new UnauthorizedException('Invalid Token');
      }
   }
}
