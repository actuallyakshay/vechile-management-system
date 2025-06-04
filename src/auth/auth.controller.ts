import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersEntity } from 'src/data/entities';
import { UserRole } from 'src/data/enum';
import { AuthService } from './auth.service';
import { Roles } from './decorators/roles.decorator';
import { CreateStaffInput, SignInInput, SignInOutput, SignUpInput, SignUpOutput } from './dto';
import { JwtAuthGuard, RolesGuard } from './guards';

@ApiTags('auth-controller')
@Controller({
   path: 'auth',
   version: '1'
})
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @ApiOkResponse({ type: SignUpOutput })
   @Post('sign-up')
   signUp(@Body() body: SignUpInput) {
      return this.authService.signUp({ body });
   }

   @ApiOkResponse({ type: SignInOutput })
   @Post('sign-in')
   signIn(@Body() body: SignInInput) {
      return this.authService.signIn({ body });
   }

   @ApiOkResponse({ type: UsersEntity })
   @UseGuards(JwtAuthGuard, RolesGuard)
   @Roles(UserRole.MANAGER)
   @Post('create-staff')
   createStaff(@Body() body: CreateStaffInput) {
      return this.authService.createStaff({ body });
   }
}
