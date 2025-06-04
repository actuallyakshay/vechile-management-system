import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtUser } from 'src/types';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/data/enum';
import { GetAllUsersOutput, GetUsersQueryDto } from './dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersEntity } from 'src/data/entities';

@ApiBearerAuth('access-token')
@ApiTags('users-controller')
@UseGuards(JwtAuthGuard)
@Controller({
   path: 'users',
   version: '1'
})
export class UsersController {
   constructor(private readonly usersService: UsersService) {}

   @ApiOkResponse({ type: UsersEntity })
   @Get('me')
   public getUserInfo(@CurrentUser() user: JwtUser) {
      return this.usersService.findUser({ id: user.id });
   }

   @ApiOkResponse({ type: GetAllUsersOutput })
   @UseGuards(RolesGuard)
   @Roles(UserRole.MANAGER)
   @Get('all')
   public getAllUsers(@Query() queryParams: GetUsersQueryDto) {
      const { page, limit, orderBy, order, ...filters } = queryParams;
      return this.usersService.getAllUsers({
         pagination: { page, limit, orderBy, order },
         filters
      });
   }
}
