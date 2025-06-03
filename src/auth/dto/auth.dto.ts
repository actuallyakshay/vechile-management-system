import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserDetailsOutput } from 'src/users/dto';

export class SignUpInput {
   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   name: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   password: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   @IsEmail()
   email: string;
}

export class SignUpOutput extends UserDetailsOutput {}

export class SignInInput {
   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   email: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   password: string;
}

export class SignInOutput {
   @ApiProperty()
   @IsString()
   accessToken: string;

   @ApiProperty()
   userId: string;
}
