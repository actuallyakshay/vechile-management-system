import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/data/enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
   constructor(private reflector: Reflector) {}

   canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

      console.log({
         requiredRoles
      });

      if (!requiredRoles) return true;

      const { user } = context.switchToHttp().getRequest();

      console.log({ user });

      if (!user.role) return false;

      return requiredRoles.includes(user.role);
   }
}
