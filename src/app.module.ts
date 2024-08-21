import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Esto hace que ConfigModule esté disponible globalmente
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('DB_HOST_SQLSERVER'),
        port: Number(configService.get<string>('DB_PORT_SQLSERVER')) || 1435,
        username: configService.get<string>('DB_USERNAME_SQLSERVER'),
        password: configService.get<string>('DB_PASSWORD_SQLSERVER'),
        database: configService.get<string>('DB_DATABASE_SQLSERVER'),
        options: {
          encrypt: false,
        },
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    ProductosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
