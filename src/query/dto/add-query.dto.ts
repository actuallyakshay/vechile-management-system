import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

enum EPurposeOfQuery {
   BUY = 'Buy',
   SELL = 'Sell'
}

export class AddQueryDto {
   @ApiProperty({
      description: 'Name of the user'
   })
   @IsString()
   @IsNotEmpty()
   name: string;

   @ApiProperty({
      description: 'Email of the user'
   })
   @IsEmail()
   @IsNotEmpty()
   email: string;

   @ApiProperty({
      description: 'Phone number of the user'
   })
   @IsString()
   @IsNotEmpty()
   phoneNumber: string;

   @ApiProperty({
      description: 'Quantity of the product'
   })
   @IsNumber()
   @IsNotEmpty()
   quantity: number;

   @ApiProperty({
      description: 'Buy or Sell'
   })
   @IsNotEmpty()
   @IsString()
   message: string;

   @ApiProperty({
      description: 'Purpose of the query'
   })
   @IsString()
   @IsEnum(EPurposeOfQuery)
   @IsNotEmpty()
   purposeOfQuery: EPurposeOfQuery;
}
