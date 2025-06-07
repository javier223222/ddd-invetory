import { IJuegosAdquiridosRepository } from "../../../domain/repositories/IJuegosAdquiridosRepository";
import { UpdateEstadoDto, JuegoAdquiridoResponseDto } from "../../dto/juegosAdquiridosDto";
import { JuegosAdquiridosDomainService } from "../../../domain/services/juegosAdquiridosDomainService";

export class UpdateStateUseCase {
  constructor(
    private juegosAdquiridosRepository: IJuegosAdquiridosRepository
  ) {}

  async execute(dto: UpdateEstadoDto): Promise<JuegoAdquiridoResponseDto> {
    const juego = await this.juegosAdquiridosRepository.findById(dto.idJuego);
    
    if (!juego) {
      throw new Error("Juego no encontrado");
    }
    

    if (!JuegosAdquiridosDomainService.validarTransicionEstado(juego.estado, dto.estado)) {
      throw new Error(`No se puede cambiar de ${juego.estado} a ${dto.estado}`);
    }
    

    juego.cambiarEstado(dto.estado);
    
   
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
}