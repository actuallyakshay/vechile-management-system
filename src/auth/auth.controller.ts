import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInInput, SignInOutput, SignUpInput, SignUpOutput } from './dto';

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
}
