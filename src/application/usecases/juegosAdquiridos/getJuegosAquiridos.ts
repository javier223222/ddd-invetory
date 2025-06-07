import { IJuegosAdquiridosRepository } from "../../../domain/repositories/IJuegosAdquiridosRepository";
import { GetJuegosAdquiridosDto, JuegosAdquiridosResultDto, JuegoAdquiridoResponseDto } from "../../dto/juegosAdquiridosDto";

export class GetJuegosAdquiridosUseCase {
  constructor(
    private juegosAdquiridosRepository: IJuegosAdquiridosRepository
  ) {}

  async execute(dto: GetJuegosAdquiridosDto): Promise<JuegosAdquiridosResultDto> {
    let juegos;
    let total;

    if (dto.coleccionId) {
      [juegos, total] = await this.juegosAdquiridosRepository.findByIdColeccion(
        dto.coleccionId,
        dto.idUsuario,
        dto.page,
        dto.limit
      );
    } else {
      [juegos, total] = await this.juegosAdquiridosRepository.findByIdUsuario(
        dto.idUsuario,
        dto.page,
        dto.limit,
        dto.soloVisibles
      );
    }

    // Mapear entidades de dominio a DTOs
    const juegosResponseDto: JuegoAdquiridoResponseDto[] = juegos.map(juego => ({
      idJuego: juego.idJuego,
      idUsuario: juego.idUsuario,
      nombre: juego.nombre,
      fechaCompra: juego.fechaCompra.toISOString(),
      estado: juego.estado,
      visible: juego.visible,
      licenciaClave: juego.licenciaClave,
      colecciones: juego.colecciones.map(col => ({
        id: col.id,
        nombre: col.nombre
      }))
    }));

    return {
      juegosAdquiridos: juegosResponseDto,
      total,
      totalPages: Math.ceil(total / dto.limit),
      page: dto.page
    };
  }
}