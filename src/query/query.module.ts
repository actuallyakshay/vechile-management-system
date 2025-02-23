import { Module } from '@nestjs/common';
import { QueryController } from './query.controller';
import { QueryService } from './query.service';
import { GoogleSheetService } from './google-sheet.service';
import { QueryEntity } from 'src/data/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
   imports: [TypeOrmModule.forFeature([QueryEntity])],
   controllers: [QueryController],
   providers: [QueryService, GoogleSheetService]
})
export class QueryModule {}
