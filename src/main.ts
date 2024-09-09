import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const httpsOptions = {
    key: readFileSync(join(__dirname, '../certificates/server.key')),
    cert: readFileSync(join(__dirname, '../certificates/server.crt')),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD', 
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('ABRIL')
    .setDescription('Estas son los endpoint de abril amoblamientos')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
