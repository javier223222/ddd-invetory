import { Router } from "express";
import { createCollection,getCollections,getCollectionById,addGameToCollection,eliminarJuegosDeCollection,deleteCollection } from "../controllers/collectionController";
const router=Router()

router.post("/",createCollection)
router.get("/",getCollections)
router.get("/:id",getCollectionById)
router.post("/game",addGameToCollection)
router.delete("/game",eliminarJuegosDeCollection)
router.delete("/",deleteCollection)

export default router