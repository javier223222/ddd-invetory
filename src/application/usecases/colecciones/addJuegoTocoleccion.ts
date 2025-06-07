import { IColeccionRepository } from "../../../domain/repositories/IColeccionRepository";
import { IJuegosAdquiridosRepository } from "../../../domain/repositories/IJuegosAdquiridosRepository";
import { AddJuegoToColeccionDto } from "../../dto/coleccionDto";

export class AddJuegoToColeccionUseCase {
  constructor(
    private coleccionRepository: IColeccionRepository,
    private juegosAdquiridosRepository: IJuegosAdquiridosRepository
  ) {}

  async execute(dto: AddJuegoToColeccionDto): Promise<void> {

    const coleccion = await this.coleccionRepository.findById(dto.idColeccion);
    if (!coleccion) {
      throw new Error("Colección no encontrada");
    }
    

    const juego = await this.juegosAdquiridosRepository.findById(dto.idJuego);
    if (!juego) {
      throw new Error("Juego no encontrado");
    }
    

    if (juego.idUsuario !== coleccion.idUsuario) {
      throw new Error("El juego no pertenece al mismo usuario que la colección");
    }
    
   
    await this.coleccionRepository.addJuegoToColeccion(dto.idColeccion, dto.idJuego);
  }
}