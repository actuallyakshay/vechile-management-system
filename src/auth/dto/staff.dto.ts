import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateStaffInput {
   @ApiProperty()
   @IsString()
   @IsEmail()
   @IsNotEmpty()
   email: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   name: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   password: string;
}
