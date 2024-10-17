import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './entities/usuarios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios], 'sqlserverConnection')],
  providers: [AuthService],
  controllers: [AuthController],
  exports:[TypeOrmModule]
})
export class AuthModule {}
