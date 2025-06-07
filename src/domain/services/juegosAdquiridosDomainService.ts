import { JuegosAdquirido } from "../models/juegosAdquirido";
import { EstadoJuego } from "../models/valueObjects/estadoJuego";
export class JuegosAdquiridosDomainService{
  static validarTransicionEstado(estadoActual: EstadoJuego, nuevoEstado: EstadoJuego): boolean {

    if (estadoActual === EstadoJuego.NO_INSTALADO && nuevoEstado === EstadoJuego.INSTALANDO) return true;
    if (estadoActual === EstadoJuego.INSTALANDO && nuevoEstado === EstadoJuego.INSTALADO) return true;
    if (estadoActual === EstadoJuego.INSTALADO && nuevoEstado === EstadoJuego.JUGANDO) return true;
    if (estadoActual === EstadoJuego.INSTALADO && nuevoEstado === EstadoJuego.DESINSTALANDO) return true;
    if (estadoActual === EstadoJuego.DESINSTALANDO && nuevoEstado === EstadoJuego.NO_INSTALADO) return true;
    return false;
  }
  
  static calcularEstadisticasBiblioteca(juegos: JuegosAdquirido[]): { total: number, instalados: number, noInstalados: number } {
    const instalados = juegos.filter(j => j.estado === EstadoJuego.INSTALADO || j.estado === EstadoJuego.JUGANDO).length;
    const noInstalados = juegos.filter(j => j.estado === EstadoJuego.NO_INSTALADO).length;
    
    return {
      total: juegos.length,
      instalados,
      noInstalados
    };
  }

}