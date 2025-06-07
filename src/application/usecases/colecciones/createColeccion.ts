import { Coleccion } from "../../../domain/models/coleccion";
import { IColeccionRepository } from "../../../domain/repositories/IColeccionRepository";
import { CreateColeccionDto, ColeccionResponseDto } from "../../dto/coleccionDto";

export class CreateColeccionUseCase {
  constructor(
    private coleccionRepository: IColeccionRepository
  ) {}

  async execute(dto: CreateColeccionDto): Promise<ColeccionResponseDto> {

    const id = `col-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
   
    const coleccion = new Coleccion(id, dto.nombre, dto.idUsuario);

    const coleccionCreada = await this.coleccionRepository.create(coleccion);
    
    
    return {
      id: coleccionCreada.id,
      nombre: coleccionCreada.nombre,
      idUsuario: coleccionCreada.idUsuario
    };
  }
}