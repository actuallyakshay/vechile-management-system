import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataEntity } from 'src/data/entities';
import { Repository } from 'typeorm';
import * as xlsx from 'xlsx';

@Injectable()
export class UploadDataService {
   constructor(
      @InjectRepository(DataEntity)
      private readonly uploadDataRepository: Repository<DataEntity>
   ) {}

   getSections(): Promise<DataEntity[]> {
      return this.uploadDataRepository.find();
   }

   flushData() {
      return this.uploadDataRepository.clear();
   }

   async saveExcelData(extractedData: Record<string, any>) {
      const records = Object.entries(extractedData).map(([sectionName, data]) => ({
         sectionName,
         data: data.map((record) => {
            const newRecord = {};
            for (const key in record) {
               newRecord[key.toLowerCase()] = record[key];
            }
            return newRecord;
         })
      }));

      await this.flushData();

      return this.uploadDataRepository.save(records);
   }

   uploadExcel(file: any) {
      const workbook = xlsx.read(file.buffer, { type: 'buffer' });
      const sheetNames = workbook.SheetNames;
      const extractedData = {};

      for (const sheetName of sheetNames) {
         const worksheet = workbook.Sheets[sheetName];
         extractedData[sheetName] = xlsx.utils.sheet_to_json(worksheet);
      }

      return this.saveExcelData(extractedData);
   }
}
