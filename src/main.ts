import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración personalizada de CORS
  app.enableCors({
    origin: '*', // Permitir solicitudes solo desde este origen
    methods: 'GET,HEAD', // Métodos HTTP permitidos
    credentials: true, // Permitir que las cookies se incluyan en las solicitudes
  });

  await app.listen(3000);
}
bootstrap();
