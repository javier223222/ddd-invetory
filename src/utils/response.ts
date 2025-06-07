import {Response} from "express"
export const errorResponse=(err:any,res:Response)=>{
    res.status(500).json({message:'Internal server error',error: err instanceof Error ? err.message : 'Unknown error'}); 
    

}

