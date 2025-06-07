import { IColeccionRepository } from "../../../domain/repositories/IColeccionRepository";
import { IJuegosAdquiridosRepository } from "../../../domain/repositories/IJuegosAdquiridosRepository";
import { AddJuegoToColeccionDto } from "../../dto/coleccionDto";

export class AddJuegoToColeccionUseCase {
  constructor(
    private coleccionRepository: IColeccionRepository,
    private juegosAdquiridosRepository: IJuegosAdquiridosRepository
  ) {}

  async execute(dto: AddJuegoToColeccionDto): Promise<void> {
    // Verificar que la colección existe
    const coleccion = await this.coleccionRepository.findById(dto.idColeccion);
    if (!coleccion) {
      throw new Error("Colección no encontrada");
    }
    
    // Verificar que el juego existe
    const juego = await this.juegosAdquiridosRepository.findById(dto.idJuego);
    if (!juego) {
      throw new Error("Juego no encontrado");
    }
    
    // Verificar que el juego pertenece al mismo usuario que la colección
    if (juego.idUsuario !== coleccion.idUsuario) {
      throw new Error("El juego no pertenece al mismo usuario que la colección");
    }
    
    // Agregar el juego a la colección
    await this.coleccionRepository.addJuegoToColeccion(dto.idColeccion, dto.idJuego);
  }
}