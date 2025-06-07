import { PrismaClient } from '@prisma/client';
import { Licencia } from '../../../domain/models/licencia';
import { ILicenciaRepository } from '../../../domain/repositories/ILincenciaRepository';
import { TipoLicencia } from '../../../domain/models/valueObjects/tipoLicencia';

export class PrismaLicenciaRepository implements ILicenciaRepository {
  constructor(private prisma: PrismaClient) {}
  
  async findByClave(clave: string): Promise<Licencia | null> {
    const licencia = await this.prisma.licencia.findUnique({
      where: { clave }
    });
    
    if (!licencia) {
      return null;
    }
    
    return new Licencia(
      licencia.clave,
      licencia.tipo as TipoLicencia,
      licencia.validez
    );
  }
  
  async create(licencia: Licencia): Promise<Licencia> {
    const created = await this.prisma.licencia.create({
      data: {
        clave: licencia.clave,
        tipo: licencia.tipo,
        validez: licencia.validez
      }
    });
    
    return new Licencia(
      created.clave,
      created.tipo as TipoLicencia,
      created.validez
    );
  }
  
  async update(licencia: Licencia): Promise<Licencia> {
    const updated = await this.prisma.licencia.update({
      where: { clave: licencia.clave },
      data: {
        tipo: licencia.tipo,
        validez: licencia.validez
      }
    });
    
    return new Licencia(
      updated.clave,
      updated.tipo as TipoLicencia,
      updated.validez
    );
  }
  
  async delete(clave: string): Promise<void> {
    await this.prisma.licencia.delete({
      where: { clave }
    });
  }
}