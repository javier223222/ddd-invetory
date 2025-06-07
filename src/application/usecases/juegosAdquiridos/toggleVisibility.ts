import { IJuegosAdquiridosRepository } from "../../../domain/repositories/IJuegosAdquiridosRepository";
import { ToggleVisibilityDto, JuegoAdquiridoResponseDto } from "../../dto/juegosAdquiridosDto";

export class ToggleVisibilityUseCase {
  constructor(
    private juegosAdquiridosRepository: IJuegosAdquiridosRepository
  ) {}

  async execute(dto: ToggleVisibilityDto): Promise<JuegoAdquiridoResponseDto> {
    const juego = await this.juegosAdquiridosRepository.findById(dto.idJuego);
    
    if (!juego) {
      throw new Error("Juego no encontrado");
    }
    
    // Aplicar el cambio de visibilidad usando el método de la entidad
    if (dto.visible) {
      juego.mostrarJuego();
    } else {
      juego.ocultarJuego();
    }
    
    // Guardar los cambios
    const juegoActualizado = await this.juegosAdquiridosRepository.update(juego);
    
    // Mapear a DTO
    return {
      idJuego: juegoActualizado.idJuego,
      idUsuario: juegoActualizado.idUsuario,
      nombre: juegoActualizado.nombre,
      fechaCompra: juegoActualizado.fechaCompra.toISOString(),
      estado: juegoActualizado.estado,
      visible: juegoActualizado.visible,
      licenciaClave: juegoActualizado.licenciaClave
    };
  }
}import { Coleccion } from "../../../domain/models/coleccion";
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