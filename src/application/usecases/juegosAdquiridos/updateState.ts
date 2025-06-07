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
    
    // Utilizar el servicio de dominio para validar la transición
    if (!JuegosAdquiridosDomainService.validarTransicionEstado(juego.estado, dto.estado)) {
      throw new Error(`No se puede cambiar de ${juego.estado} a ${dto.estado}`);
    }
    
    // Aplicar el cambio de estado usando el método de la entidad
    juego.cambiarEstado(dto.estado);
    
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
}