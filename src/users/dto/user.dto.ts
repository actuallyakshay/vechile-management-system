import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from 'src/data/enum';

export class UserDetailsOutput {
   @ApiProperty()
   id: string;

   @ApiProperty()
   name: string;

   @ApiProperty()
   email: string;

   @ApiProperty()
   password: string;

   @ApiProperty({ enum: UserRole })
   role: UserRole;

   @ApiProperty()
   createdAt: Date;

   @ApiPropertyOptional()
   updatedAt?: Date;

   @ApiPropertyOptional()
   deletedAt?: Date;
}

export class CreateUserInput {
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

   @IsEnum(UserRole)
   @IsString()
   @IsOptional()
   role?: UserRole;
}
