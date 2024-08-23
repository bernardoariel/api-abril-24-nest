import { HttpException, HttpStatus, Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { DataSource } from 'typeorm';

@Injectable()
export class CheckDatabaseConnectionMiddleware implements NestMiddleware {
  private readonly logger = new Logger(CheckDatabaseConnectionMiddleware.name);
  constructor(@Inject(DataSource) private dataSource: DataSource) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      await this.dataSource.query('SELECT 1'); // Consulta simple para verificar la conexión
      next();
    } catch (error) {
      this.logger.error('Database connection failed', error);
      throw new HttpException('Service Unavailable', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}
