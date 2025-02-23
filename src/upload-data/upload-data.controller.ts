import { BadRequestException, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadDataService } from './upload-data.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DataEntity } from 'src/data/entities';

@Controller('upload-data')
@ApiTags('upload-data-controller')
export class UploadDataController {
   constructor(private readonly uploadDataService: UploadDataService) {}

   @ApiResponse({ status: 200, type: DataEntity, isArray: true })
   @Get('sections')
   getSections() {
      return this.uploadDataService.getSections();
   }

   @Post('excel')
   @UseInterceptors(FileInterceptor('file'))
   uploadExcel(@UploadedFile() file: any) {
      if (!file) throw new BadRequestException('No file uploaded or invalid file type!');
      return this.uploadDataService.uploadExcel(file);
   }
}
