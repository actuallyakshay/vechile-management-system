import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateStaffInput, SignInInput, SignInOutput, SignUpInput, SignUpOutput } from './dto';
import { JwtAuthGuard, RolesGuard } from './guards';
import { UserRole } from 'src/data/enum';
import { Roles } from './decorators/roles.decorator';

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

   @UseGuards(JwtAuthGuard, RolesGuard)
   @Roles(UserRole.MANAGER)
   @Post('create-staff')
   createStaff(@Body() body: CreateStaffInput) {
      return this.authService.createStaff({ body });
   }
}
