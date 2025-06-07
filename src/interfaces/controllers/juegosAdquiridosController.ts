import {Request,Response} from "express";
import { prisma } from "../../infrastructure/prismaClient";
import { errorResponse } from "../../utils/response";

export const getJuegosAdquiridos=async(req:Request,res:Response)=>{

    try{
        let {page=1,limit=10,idusuario="ss"}=req.query
        page=Number(page)
        limit=Number(limit)
        const[juegosAdquiridos,total]=await Promise.all([
            prisma.juegosAdquirido.findMany({
                where:{idUsuario:String(idusuario)},
                skip:(page-1) *limit,
                take:limit,
                select:{
                    idJuego:true,
                    idUsuario:true,
                    nombre:true,
                    fechaCompra:true,
                    estado:true,
                    licenciaClave:true,
                    licencia:true

                },
                orderBy:{ nombre: 'desc' }
            }),
            prisma.juegosAdquirido.count()
        ])
        res.status(200).json({
              message: 'Projects retrieved successfully',
            data: {
                juegosAdquiridos,
                total,
                totalPages: Math.ceil(total / limit),
                page: page,
            }
        })


        return 




        
    }catch(err:any){
        console.error(err);
    errorResponse(err,res)   
        return;
    }
}
export const addJuegosAdquirido=async(req:Request,res:Response)=>{
    try{
        const {idUsuario,nombre,fechaCompra,estado,clave,tipo,validez}=req.body
        const idLicencia=await prisma.licencia.create({
            data:{
                clave:clave,
                tipo:tipo,
                validez:new Date(validez)
            },
            select:{
                clave:true
            }
        })
        const juegosAdquirido=await prisma.juegosAdquirido.create({
            data:{
                idUsuario:idUsuario,
                nombre:nombre,
                fechaCompra:new Date(fechaCompra),
                estado:estado,
                licenciaClave:idLicencia.clave

            },
            select:{
                  idJuego:true,
                    idUsuario:true,
                    nombre:true,
                    fechaCompra:true,
                    estado:true,
                    licenciaClave:true,
                    licencia:true
            }
        })

        res.status(201).json({message:"Juego agregado a la libreria",data:juegosAdquirido})
        return
    }catch(err:any){
        console.error(err);
        errorResponse(err,res)  
        return;
    }

}



export const getJuegoAdquiridoBYId=async(req:Request,res:Response)=>{
    try{
        const {idUsuario=""}=req.query
        const {id}=req.params
        const juegosAdquirido=await prisma.juegosAdquirido.findUnique({
            where:{
                idJuego:String(id),
                idUsuario:String(idUsuario)
            }
        }) 
        if(juegosAdquirido==null){
             res.status(400).json({
            message:"El juegos no existe"

    })
    }
        res.status(200).json({
            message:"Juegos con el id "+id+" Obtenido correctamente",
            data:juegosAdquirido

    })
    return

        

    }catch(err:any){
        console.error(err);
        errorResponse(err,res)   
        return;
    }
}


export const deleteJuego=async(req:Request,res:Response)=>{
    try{
        const {idUsuario}=req.query
        let  {id}=req.params
        const find= await prisma.juegosAdquirido.findFirst({
            where:{
                idJuego:id ,
                idUsuario:String(idUsuario)
            },
            select:{
                idJuego:true
            }
        })
        if(find==null){
           res.status(401).json({
            message:"El juegos nb existe  o no le pertenece o no existe"
           })
           return

        }
        await prisma.juegosAdquirido.delete({
            where:{
                idJuego:id
            }
        })
        res.status(200).json({
            message:"El juegos con el id "+id+" fue eliminado correctamente"
        })
        return







    }catch(e:any){
        errorResponse(e,res)
        return

    }
}


export const updateState=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params
        const {idUsuario,state}=req.body
        const foundGame=await prisma.juegosAdquirido.findUnique({
            where:{
                idUsuario:idUsuario,
                idJuego:id

            },
            select:{
                idJuego:true
            }
        })
        if(foundGame==null){
            res.status(400).json({
                message:"El juego no existe o no le pertenence"
            })
            return
        }

     const updatedGame=await prisma.juegosAdquirido.update({
        where:{
            idJuego:id,
            idUsuario:idUsuario
        },
        data:{
            estado:state
        }
     })

     res.status(200).json({
        message:"Estao del juego actualizado correctamennte",
        data:updatedGame
     })
     return

        
        
    }catch(e:any){
        errorResponse(e,res)
        return
    }
}
