import { Router } from "express";

import { getJuegosAdquiridos,getJuegoAdquiridoBYId,updateState,deleteJuego,addJuegosAdquirido } from "../controllers/juegosAdquiridosController";
const router=Router()
router.get("/",getJuegosAdquiridos)
router.get("/:id",getJuegoAdquiridoBYId)
router.post("/",addJuegosAdquirido)
router.delete("/:id",deleteJuego)
router.put("/:id",updateState)

export default router

