import { Logro } from "../models/logro";

export interface ILogoRepository{
    findByIdJuego(idJuego:string):Promise<Logro[]>
    findByIdUsuarioAndIdJuego(idUsuario:string,idJuego:string):Promise<Logro[]>
    desbloquearLogro(idLogro:string,idUsuario:string):Promise<Logro>
    
}