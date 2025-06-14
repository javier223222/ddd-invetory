import { JuegosAdquirido } from "../../../domain/models/juegosAdquirido";
import { Licencia } from "../../../domain/models/licencia";
import { IJuegosAdquiridosRepository } from "../../../domain/repositories/IJuegosAdquiridosRepository";
import { ILicenciaRepository } from "../../../domain/repositories/ILincenciaRepository";
import { CreateJuegoAdquiridoDto, JuegoAdquiridoResponseDto } from "../../dto/juegosAdquiridosDto";
import { TipoLicencia } from "../../../domain/models/valueObjects/tipoLicencia";

export class AddJuegoAdquiridoUseCase {
  constructor(
    private juegosAdquiridosRepository: IJuegosAdquiridosRepository,
    private licenciaRepository: ILicenciaRepository
  ) {}

  async execute(dto: CreateJuegoAdquiridoDto): Promise<JuegoAdquiridoResponseDto> {
  
    let licencia = await this.licenciaRepository.findByClave(dto.clave);
    
    
    if (!licencia) {
      licencia = new Licencia(
        dto.clave,
        dto.tipo as TipoLicencia,
        new Date(dto.validez)
      );
      await this.licenciaRepository.create(licencia);
    } else {

      const juegoExistente = await this.juegosAdquiridosRepository.findByLicencia(dto.clave, dto.idUsuario);
      
      if (juegoExistente) {
        throw new Error("Esta licencia ya ha sido activada por este usuario");
      }
    }
    

    const juegoAdquirido = new JuegosAdquirido(
      "", 
      dto.idUsuario,
      dto.nombre,
      new Date(dto.fechaCompra),
      dto.estado,
      dto.clave,
      true 
    );
    
    const juegoCreado = await this.juegosAdquiridosRepository.create(juegoAdquirido);
    
    
    return {
      idJuego: juegoCreado.idJuego,
      idUsuario: juegoCreado.idUsuario,
      nombre: juegoCreado.nombre,
      fechaCompra: juegoCreado.fechaCompra.toISOString(),
      estado: juegoCreado.estado,
      visible: juegoCreado.visible,
      licenciaClave: juegoCreado.licenciaClave,
      licencia: {
        clave: licencia.clave,
        tipo: licencia.tipo,
        validez: licencia.validez.toISOString()
      }
    };
  }
}