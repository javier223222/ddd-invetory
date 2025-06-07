import { PrismaClient } from '@prisma/client';
import { Coleccion } from '../../../domain/models/coleccion';
import { IColeccionRepository } from '../../../domain/repositories/IColeccionRepository';

export class PrismaColeccionRepository implements IColeccionRepository {
  constructor(private prisma: PrismaClient) {}
  
  async findById(id: string): Promise<Coleccion | null> {
    const coleccion = await this.prisma.coleccion.findUnique({
      where: { id }
    });
    
    if (!coleccion) {
      return null;
    }
    
    return new Coleccion(
      coleccion.id,
      coleccion.nombre,
      coleccion.idUsuario
    );
  }
  
  async findByIdUsuario(idUsuario: string): Promise<Coleccion[]> {
    const colecciones = await this.prisma.coleccion.findMany({
      where: { idUsuario }
    });
    
    return colecciones.map(col => 
      new Coleccion(col.id, col.nombre, col.idUsuario)
    );
  }
  
  async create(coleccion: Coleccion): Promise<Coleccion> {
    const created = await this.prisma.coleccion.create({
      data: {
        id: coleccion.id,
        nombre: coleccion.nombre,
        idUsuario: coleccion.idUsuario
      }
    });
    
    return new Coleccion(
      created.id,
      created.nombre,
      created.idUsuario
    );
  }
  
  async update(coleccion: Coleccion): Promise<Coleccion> {
    const updated = await this.prisma.coleccion.update({
      where: { id: coleccion.id },
      data: {
        nombre: coleccion.nombre
      }
    });
    
    return new Coleccion(
      updated.id,
      updated.nombre,
      updated.idUsuario
    );
  }
  
  async delete(id: string): Promise<void> {
    await this.prisma.coleccion.delete({
      where: { id }
    });
  }
  
  async addJuegoToColeccion(idColeccion: string, idJuego: string): Promise<void> {
    await this.prisma.juegosColeccion.create({
      data: {
        coleccionId: idColeccion,
        juegoId: idJuego
      }
    });
  }
  
  async removeJuegoFromColeccion(idColeccion: string, idJuego: string): Promise<void> {
    await this.prisma.juegosColeccion.delete({
      where: {
        coleccionId_juegoId: {
          coleccionId: idColeccion,
          juegoId: idJuego
        }
      }
    });
  }
}