import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { validateConfig } from './config.validator';
import { ConfigModule } from '@nestjs/config';
import { UploadDataModule } from './upload-data/upload-data.module';
import { QueryModule } from './query/query.module';

@Module({
   imports: [ConfigModule.forRoot({ isGlobal: true, validate: validateConfig }), DataModule, UploadDataModule, QueryModule],
   controllers: [AppController],
   providers: [AppService]
})
export class AppModule {}
