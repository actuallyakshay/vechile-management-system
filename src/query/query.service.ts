import { Injectable } from '@nestjs/common';
import { GoogleSheetService } from './google-sheet.service';
import { Repository } from 'typeorm';
import { QueryEntity } from 'src/data/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { AddQueryDto } from './dto';

@Injectable()
export class QueryService {
   constructor(
      private readonly googleSheetService: GoogleSheetService,
      @InjectRepository(QueryEntity)
      private readonly queryRepository: Repository<QueryEntity>
   ) {}

   async addQuery(data: AddQueryDto) {
      await this.googleSheetService.addRow(data);
      return this.queryRepository.save(data);
   }
}
