import { Coleccion } from "../../../domain/models/coleccion";
import { IColeccionRepository } from "../../../domain/repositories/IColeccionRepository";
import { CreateColeccionDto, ColeccionResponseDto } from "../../dto/coleccionDto";

export class CreateColeccionUseCase {
  constructor(
    private coleccionRepository: IColeccionRepository
  ) {}

  async execute(dto: CreateColeccionDto): Promise<ColeccionResponseDto> {
    // En un caso real, podrías validar si el usuario ya tiene demasiadas colecciones, etc.
    
    // Generar un ID único para la colección (en producción, esto lo haría la base de datos)
    const id = `col-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Crear entidad de dominio
    const coleccion = new Coleccion(id, dto.nombre, dto.idUsuario);
    
    // Persistir
    const coleccionCreada = await this.coleccionRepository.create(coleccion);
    
    // Mapear a DTO
    return {
      id: coleccionCreada.id,
      nombre: coleccionCreada.nombre,
      idUsuario: coleccionCreada.idUsuario
    };
  }
}