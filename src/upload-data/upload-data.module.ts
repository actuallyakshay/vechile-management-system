import { Module } from '@nestjs/common';
import { UploadDataService } from './upload-data.service';
import { UploadDataController } from './upload-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataEntity } from 'src/data/entities';

@Module({
   imports: [TypeOrmModule.forFeature([DataEntity])],
   providers: [UploadDataService],
   controllers: [UploadDataController]
})
export class UploadDataModule {}
