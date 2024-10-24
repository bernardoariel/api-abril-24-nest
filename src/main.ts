import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
 /*  const httpsOptions = {
    key: readFileSync(join(__dirname, '../certificates/server.key')),
    cert: readFileSync(join(__dirname, '../certificates/server.crt')),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions }); */
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });
  const config = new DocumentBuilder()
  .setTitle('ABRIL')
  .setDescription('ENDPOINTS de Abril Amoblamientos')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}
bootstrap();
