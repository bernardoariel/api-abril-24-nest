import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormaPagoPlanes } from './entities/forma-pago-plane.entity';
import { Repository } from 'typeorm';
import { FormaPago } from 'src/forma-pago/entities/forma-pago.entity';


@Injectable()
export class FormaPagoPlanesService {
  
  constructor(
    @InjectRepository(FormaPagoPlanes,'sqlserverConnection')
    private formaPagoPlanesRepository:Repository<FormaPagoPlanes>,
    @InjectRepository(FormaPago, 'sqlserverConnection')
    private formaPagoRepository: Repository<FormaPago>, 
    
  ){}

  /* async findAll(): Promise<FormaPagoPlanes[]> {
    return await this.formaPagoPlanesRepository.find();
  } */
    async findAll(): Promise<any[]> {
      const planes = await this.formaPagoPlanesRepository.find(); // Obtiene todos los planes
  
      // Para cada plan, busca el FormaPago correspondiente y solo devuelve el campo "FormaPago"
      const planesConFormaPago = await Promise.all(
        planes.map(async (plan) => {
          const formaPagoEntity = await this.formaPagoRepository.findOne({
            where: { CodForPago: plan.CodForPago },
          });
  
          return {
            ...plan,
            Nombre: formaPagoEntity?.FormaPago || null, // Solo incluimos el campo "FormaPago"
          };
        }),
      );
  
      return planesConFormaPago;
    }
  }

