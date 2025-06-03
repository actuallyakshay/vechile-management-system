import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
   const logger = new Logger('main');
   const app = await NestFactory.create(AppModule);
   const configService = app.get(ConfigService);
   app.useGlobalPipes(new ValidationPipe({ transform: true }));
   app.setGlobalPrefix('api');
   app.enableVersioning();
   app.enableCors({ origin: '*' });

   const config = new DocumentBuilder()
      .setTitle('Vechile-Management-System API')
      .setDescription('API documentation for the Vechile Management System')
      .setVersion('1.0')
      .addTag('tags')
      .addServer(configService.get('VMS_API_BASE_URL'), 'VMS API Base URL')
      .build();

   const document = SwaggerModule.createDocument(app, config, {
      operationIdFactory: (_controllerKey, methodKey) => {
         return methodKey;
      }
   });

   SwaggerModule.setup('api-docs', app, document, {
      jsonDocumentUrl: 'api-docs/vms'
   });

   const port: number = configService.get<number>('PORT') || 8080;

   await app.listen(port);

   logger.log(`VMS-Server: listening on port ${port}`);
}
bootstrap();
