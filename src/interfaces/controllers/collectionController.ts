import {Request,Response} from "express"
import { errorResponse } from "../../utils/response"
import { prisma } from "../../infrastructure/prismaClient"

export const createCollection=async(req:Request,res:Response)=>{
    try{
        const {idUsuario,nombre,descripcion}=req.body
        const result=await prisma.coleccion.create({
            data:{
                idUsuario:idUsuario,
                nombre:nombre,
                descripcion:descripcion
            },select:{
                id:true,
                idUsuario:true,
                nombre:true,
                descripcion:true,
                fechaCreacion:true
            
            }

        })
        res.status(200).json({
            message:"Se creo la coleccion exitosamente",
            data:result
        })

    }catch(e:any){
        errorResponse(e,res)
        return
    }
}


export const getCollections=async(req:Request,res:Response)=>{
    try{
        let {page=1,limit=10,idUsuario=""}=req.query
        page=Number(page)
        limit=Number(limit)
        const result=await prisma.coleccion.findMany({
            where:{
                idUsuario:String(idUsuario)
            },
            skip:(page-1)*limit,
            take:limit,
            orderBy:{fechaCreacion:"desc"},
            select:{
                id:true,
                idUsuario:true,
                nombre:true,
                descripcion:true,
                fechaCreacion:true,
                juegos:true

            }

        })
        res.status(200).json({
            message:"collection obtenidas correctamente",
            data:result
        })
        return



    }catch(e:any){
        errorResponse(e,res)
        return
    }
}


export const getCollectionById=async(req:Request,res:Response)=>{
    try{
        const {idUsuario}=req.query
        const {id}=req.params

        
        const result=await prisma.coleccion.findUnique({
            where:{
                id:id,
                idUsuario:String(idUsuario)
            }
        })

        res.status(200).json({
            message:"collecciones obtenidas correctamente",
            data:result

        })
        return

    }catch(e:any){
        errorResponse(e,res)
        return
    }

}

export const addGameToCollection=async(req:Request,res:Response)=>{
    try{
        const {idUsuario,idJuego,idCollection}=req.body
        const [foundCollection,foundGame]=await Promise.all([
        prisma.coleccion.findUnique({
            where:{
                id:idCollection,
                idUsuario:String(idUsuario)
            },
            select:{
                id:true
            }
        }),
        prisma.juegosAdquirido.findUnique({
            where:{
                idJuego:idJuego,
                idUsuario:idUsuario
            }
        })
       ] ) 
        

        if(foundCollection==null|| foundGame==null){
            res.status(401).json({
                message:"La colleccion no existe o no te pertenece"
        })
        }
        const juegoencollection=await prisma.juegosEnColeccion.create({
            data:{
                idColeccion:idCollection,
                idJuego:idJuego

            },
            select:{
                id:true,
                idJuego:true,
                idColeccion:true,
                fechaAdicion:true,
                juegosAdquirido:true
            }
        })

        res.status(200).json({
            message:"Juego agregado correctamente a la collecion",
            data:juegoencollection
        })

        return

    }catch(e:any){

        errorResponse(e,res)
        return
    }

}


export const eliminarJuegosDeCollection=async(req:Request,res:Response)=>{
    try{
        const {idJuegos,idCollection,id,idUsuario}=req.body
        const [foundCollection,foundGame]=await Promise.all([
           prisma.coleccion.findUnique({
            where:{
                id:idCollection,
                idUsuario:idUsuario
            },
            select:{
                id:true
            }
           }),
           prisma.juegosAdquirido.findUnique({
            where:{
                idJuego:idJuegos,
                idUsuario:idUsuario
            }
           })
        ])
        if(foundCollection==null||foundGame==null){
            res.status(401).json({
                message:"La collecion no te pertenece "
            })
            return
        }

        await prisma.juegosEnColeccion.delete({
            where:{
                id:id,
                idJuego:idJuegos
            }
        })
        res.status(200).json({
            message:"Se eliminio correctamente el juego"
        })

    }catch(e:any){
        errorResponse(e,res)
        return 
    }
}



export const deleteCollection=async(req:Request,res:Response)=>{
    try{
        const {idUsuario,idCollection}=req.body
        await prisma.coleccion.delete({
            where:{
                id:idCollection,
                idUsuario:idUsuario
            }
        })
        res.status(200).json({
            message:"La collection fue eliminada correctamente"
        })

    }catch(e:any){
        errorResponse(e,res)
        return
    }
}