import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { validateConfig } from './config.validator';
import { DataModule } from './data/data.module';
import { UsersModule } from './users/users.module';

import { ServicesModule } from './services/services.module';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
   imports: [
      ConfigModule.forRoot({ isGlobal: true, validate: validateConfig }),
      DataModule,
      AuthModule,
      UsersModule,
      VehiclesModule,
      ServicesModule
   ],
   controllers: [AppController],
   providers: [AppService]
})
export class AppModule {}
