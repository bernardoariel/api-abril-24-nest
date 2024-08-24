import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProdCostosModule } from './prod-costos/prod-costos.module';
import { CheckDatabaseConnectionMiddleware } from './check-database-connection/check-database-connection.middleware';
import { ProdImageModule } from './prod-image/prod-image.module';
import { ProdStockModule } from './prod-stock/prod-stock.module';
import { ProdSucursalModule } from './prod-sucursal/prod-sucursal.module';
import { ProdMarcaModule } from './prod-marca/prod-marca.module';





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
        synchronize: false,
      }),
    }),
    ProductosModule,
    ProdCostosModule,
    ProdImageModule,
    ProdStockModule,
    ProdSucursalModule,
    ProdMarcaModule,
    ProdMarcaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckDatabaseConnectionMiddleware)
      .forRoutes('*'); // Aplica el middleware a todas las rutas
  }
}
