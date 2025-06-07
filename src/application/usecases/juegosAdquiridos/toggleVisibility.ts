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
    

    if (dto.visible) {
      juego.mostrarJuego();
    } else {
      juego.ocultarJuego();
    }
    
    
    const juegoActualizado = await this.juegosAdquiridosRepository.update(juego);
    
   
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