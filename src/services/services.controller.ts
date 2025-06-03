import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { UserRole } from 'src/data/enum';
import { JwtUser } from 'src/types';
import { GetServicesQueryDto, ScheduleServiceInput, UpdateServiceInput } from './dto';
import { ServicesService } from './services.service';

@ApiBearerAuth('access-token')
@ApiTags('services-controller')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({
   path: 'services',
   version: '1'
})
export class ServicesController {
   constructor(private readonly servicesService: ServicesService) {}

   @Roles(UserRole.MANAGER)
   @Get('all')
   @ApiOperation({ description: 'Get all vehicle services (ONLY-MANAGER)' })
   getAllServices(@Query() queryParams: GetServicesQueryDto) {
      const { page, limit, orderBy, order, ...filters } = queryParams;
      return this.servicesService.getVehicleServices({
         pagination: { page, limit, orderBy, order },
         filters
      });
   }

   @Roles(UserRole.MECHANIC)
   @Get('mechanic/my')
   @ApiOperation({ description: 'Get all vehicle services assigned to the mechanic (ONLY-MECHANIC)' })
   getAssignedServices(@CurrentUser() user: JwtUser, @Query() queryParams: GetServicesQueryDto) {
      const { page, limit, orderBy, order, ...filters } = queryParams;
      return this.servicesService.getVehicleServices({
         mechanicId: user.id,
         pagination: { page, limit, orderBy, order },
         filters
      });
   }

   @Roles(UserRole.CUSTOMER)
   @Get('customer/my')
   @ApiOperation({ description: 'Get all vehicle services requested by the customer (ONLY-CUSTOMER)' })
   getMyVehicleServices(@Query() queryParams: GetServicesQueryDto, @CurrentUser() user: JwtUser) {
      const { page, limit, orderBy, order, ...filters } = queryParams;
      return this.servicesService.getVehicleServices({
         customerId: user.id,
         pagination: { page, limit, orderBy, order },
         filters
      });
   }

   @Roles(UserRole.CUSTOMER)
   @Post('schedule')
   scheduleService(@Body() body: ScheduleServiceInput, @CurrentUser() user: JwtUser) {
      return this.servicesService.scheduleService({ body, user });
   }

   @Roles(UserRole.CUSTOMER)
   @Patch('cancel/:serviceId')
   cancelServiceRequest(@CurrentUser() user: JwtUser, @Param('serviceId') serviceId: string) {
      return this.servicesService.cancelServiceRequest({ user, serviceId });
   }

   @Roles(UserRole.MECHANIC)
   @Patch('update-status/:serviceId')
   updateServiceStatus(@Param('serviceId') serviceId: string, @CurrentUser() user: JwtUser, @Body() body: UpdateServiceInput) {
      return this.servicesService.updateServiceStatus({ serviceId, mechanicId: user.id, body });
   }
}
