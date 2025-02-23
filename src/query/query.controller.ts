import { Body, Controller, Post } from '@nestjs/common';
import { AddQueryDto } from './dto';
import { QueryService } from './query.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('query')
@ApiTags('query-controller')
export class QueryController {
   constructor(private readonly queryService: QueryService) {}

   @Post()
   addQuery(@Body() body: AddQueryDto) {
      return this.queryService.addQuery(body);
   }
}
