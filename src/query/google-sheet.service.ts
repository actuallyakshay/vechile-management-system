import { Injectable, Logger } from '@nestjs/common';
import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { AddQueryDto } from './dto';
import * as moment from 'moment';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleSheetService {
   private logger = new Logger('GoogleSheetService');
   private googleSheet: GoogleSpreadsheet;
   constructor(private readonly configService: ConfigService) {
      const serviceAccountAuth = new JWT({
         email: this.configService.get('GOOGLE_SERVICE_ACCOUNT_EMAIL'),
         key: this.configService.get('GOOGLE_PRIVATE_KEY').replace(/\\n/g, '\n'),
         scopes: ['https://www.googleapis.com/auth/spreadsheets']
      });

      this.googleSheet = new GoogleSpreadsheet('1iVrW0nOaxGtMWozTzUffIZW31NGArw5IVW2qN1YuJ-g', serviceAccountAuth);
   }

   async addRow(data: AddQueryDto) {
      try {
         await this.googleSheet.loadInfo();
         const sheet = this.googleSheet.sheetsByIndex[0];
         await sheet.addRow({
            Name: data.name,
            Email: data.email,
            Phone: `'${data.phoneNumber}`,
            Quantity: data.quantity,
            Message: data.message,
            Purpose: data.purposeOfQuery,
            Date: moment().format('YYYY-MM-DD'),
            Time: moment().format('HH:mm A')
         });
         this.logger.log('Row added successfully');
      } catch (error) {
         this.logger.error(error);
      }
   }
}
