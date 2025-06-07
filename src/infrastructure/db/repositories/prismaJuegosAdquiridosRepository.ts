import { PrismaClient } from '@prisma/client';
import { JuegosAdquirido } from '../../../domain/models/juegosAdquirido';
import { IJuegosAdquiridosRepository } from '../../../domain/repositories/IJuegosAdquiridosRepository';
import { EstadoJuego } from '../../../domain/models/valueObjects/estadoJuego';
import { Coleccion } from '../../../domain/models/coleccion';

export class PrismaJuegosAdquiridosRepository implements IJuegosAdquiridosRepository {
  constructor(private prisma: PrismaClient) {}

  async findByIdUsuario(
    idUsuario: string, 
    page: number, 
    limit: number, 
    soloVisibles: boolean = true
  ): Promise<[JuegosAdquirido[], number]> {
    
    const whereClause: any = { idUsuario };
    if (soloVisibles) {
      whereClause.visible = true;
    }
    
    const [juegos, total] = await Promise.all([
      this.prisma.juegosAdquirido.findMany({
        where: whereClause,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          licencia: true,
          colecciones: true
        },
        orderBy: { nombre: 'desc' }
      }),
      this.prisma.juegosAdquirido.count({ where: whereClause })
    ]);
    
    // Mapear a entidades de dominio
    const juegosEntidades = juegos.map(juego => {
      const juegoEntidad = new JuegosAdquirido(
        juego.idJuego,
        juego.idUsuario,
        juego.nombre,
        juego.fechaCompra,
        juego.estado as EstadoJuego,
        juego.licenciaClave,
        juego.visible
      );
      
      // Agregar colecciones si existen
      if (juego.colecciones) {
        juego.colecciones.forEach(col => {
          const coleccion = new Coleccion(col.id, col.nombre, col.idUsuario);
          juegoEntidad.agregarAColeccion(coleccion);
        });
      }
      
      return juegoEntidad;
    });
    
    return [juegosEntidades, total];
  }

  async findByIdColeccion(
    idColeccion: string, 
    idUsuario: string, 
    page: number, 
    limit: number
  ): Promise<[JuegosAdquirido[], number]> {
    
    const [juegos, total] = await Promise.all([
      this.prisma.juegosAdquirido.findMany({
        where: {
          idUsuario,
          colecciones: {
            some: {
              id: idColeccion
            }
          }
        },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          licencia: true,
          colecciones: true
        },
        orderBy: { nombre: 'desc' }
      }),
      this.prisma.juegosAdquirido.count({
        where: {
          idUsuario,
          colecciones: {
            some: {
              id: idColeccion
            }
          }
        }
      })
    ]);
    
    // Mapear a entidades de dominio (similar a findByIdUsuario)
    const juegosEntidades = juegos.map(juego => {
      const juegoEntidad = new JuegosAdquirido(
        juego.idJuego,
        juego.idUsuario,
        juego.nombre,
        juego.fechaCompra,
        juego.estado as EstadoJuego,
        juego.licenciaClave,
        juego.visible
      );
      
      if (juego.colecciones) {
        juego.colecciones.forEach(col => {
          const coleccion = new Coleccion(col.id, col.nombre, col.idUsuario);
          juegoEntidad.agregarAColeccion(coleccion);
        });
      }
      
      return juegoEntidad;
    });
    
    return [juegosEntidades, total];
  }
  
  async findById(idJuego: string): Promise<JuegosAdquirido | null> {
    const juego = await this.prisma.juegosAdquirido.findUnique({
      where: { idJuego },
      include: {
        licencia: true,
        colecciones: true
      }
    });
    
    if (!juego) {
      return null;
    }
    
    const juegoEntidad = new JuegosAdquirido(
      juego.idJuego,
      juego.idUsuario,
      juego.nombre,
      juego.fechaCompra,
      juego.estado as EstadoJuego,
      juego.licenciaClave,
      juego.visible
    );
    
    if (juego.colecciones) {
      juego.colecciones.forEach(col => {
        const coleccion = new Coleccion(col.id, col.nombre, col.idUsuario);
        juegoEntidad.agregarAColeccion(coleccion);
      });
    }
    
    return juegoEntidad;
  }
  
  async findByLicencia(licenciaClave: string, idUsuario: string): Promise<JuegosAdquirido | null> {
    const juego = await this.prisma.juegosAdquirido.findFirst({
      where: {
        licenciaClave,
        idUsuario
      },
      include: {
        licencia: true,
        colecciones: true
      }
    });
    
    if (!juego) {
      return null;
    }
    
    return new JuegosAdquirido(
      juego.idJuego,
      juego.idUsuario,
      juego.nombre,
      juego.fechaCompra,
      juego.estado as EstadoJuego,
      juego.licenciaClave,
      juego.visible
    );
  }
  
  async create(juegoAdquirido: JuegosAdquirido): Promise<JuegosAdquirido> {
    const created = await this.prisma.juegosAdquirido.create({
      data: {
        idUsuario: juegoAdquirido.idUsuario,
        nombre: juegoAdquirido.nombre,
        fechaCompra: juegoAdquirido.fechaCompra,
        estado: juegoAdquirido.estado,
        licenciaClave: juegoAdquirido.licenciaClave,
        visible: juegoAdquirido.visible
      },
      include: {
        licencia: true
      }
    });
    
    return new JuegosAdquirido(
      created.idJuego,
      created.idUsuario,
      created.nombre,
      created.fechaCompra,
      created.estado as EstadoJuego,
      created.licenciaClave,
      created.visible
    );
  }
  
  async update(juegoAdquirido: JuegosAdquirido): Promise<JuegosAdquirido> {
    const updated = await this.prisma.juegosAdquirido.update({
      where: { idJuego: juegoAdquirido.idJuego },
      data: {
        estado: juegoAdquirido.estado,
        visible: juegoAdquirido.visible
      },
      include: {
        licencia: true,
        colecciones: true
      }
    });
    
    return new JuegosAdquirido(
      updated.idJuego,
      updated.idUsuario,
      updated.nombre,
      updated.fechaCompra,
      updated.estado as EstadoJuego,
      updated.licenciaClave,
      updated.visible
    );
  }
  
  async delete(idJuego: string): Promise<void> {
    await this.prisma.juegosAdquirido.delete({
      where: { idJuego }
    });
  }
}