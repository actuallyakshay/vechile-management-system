import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { UserRole } from 'src/data/enum';
import { CreateVehicleInput, GetAllVehiclesOutput, GetVehicleQueryDto, UpdateVehicleInput } from './dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtUser } from 'src/types';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { VehiclesEntity } from 'src/data/entities';

@ApiBearerAuth('access-token')
@ApiTags('vehicles-controller')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({
   path: 'vehicles',
   version: '1'
})
export class VehiclesController {
   constructor(private readonly vehiclesService: VehiclesService) {}

   @ApiOkResponse({ type: GetAllVehiclesOutput })
   @Roles(UserRole.CUSTOMER)
   @Get('my')
   getCustomerVechiles(@Query() queryParams: GetVehicleQueryDto, @CurrentUser() user: JwtUser) {
      return this.vehiclesService.getCustomerVehicles({ user, pagination: queryParams });
   }

   @ApiOkResponse({ type: VehiclesEntity })
   @Roles(UserRole.CUSTOMER)
   @Post('create')
   createVehcile(@Body() body: CreateVehicleInput, @CurrentUser() user: JwtUser) {
      return this.vehiclesService.createVehicle({ user, body });
   }

   @ApiOkResponse({ type: VehiclesEntity })
   @Roles(UserRole.CUSTOMER)
   @Patch('update/:id')
   updateVehicle(@Body() body: UpdateVehicleInput, @Param('id') id: string) {
      return this.vehiclesService.updateVehicle({ id, body });
   }
}
