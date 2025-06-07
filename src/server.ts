import express from 'express';
import cors from "cors"
import { PrismaClient } from '@prisma/client';
import { PrismaJuegosAdquiridosRepository } from './infrastructure/db/repositories/prismaJuegosAdquiridosRepository';
import { PrismaLicenciaRepository } from './infrastructure/db/repositories/prismaLicenciaRepository';
import { PrismaColeccionRepository } from './infrastructure/db/repositories/prismaColeccionRepository';
import { AddJuegoAdquiridoUseCase } from './application/usecases/juegosAdquiridos/addJuegoAdquirido';

import { GetJuegosAdquiridosUseCase } from './application/usecases/juegosAdquiridos/getJuegosAquiridos';
import { UpdateStateUseCase } from './application/usecases/juegosAdquiridos/updateState';
import { ToggleVisibilityUseCase } from './application/usecases/juegosAdquiridos/toggleVisibility';
import { CreateColeccionUseCase } from './application/usecases/colecciones/createColeccion';

import { AddJuegoToColeccionUseCase } from './application/usecases/colecciones/addJuegoTocoleccion';
import { JuegosAdquiridosController } from './infrastructure/controllers/juegosAdquiridosController';
import { ColeccionesController } from './infrastructure/controllers/coleccionesController';
import { juegosAdquiridosRouter } from './infrastructure/api/routes/juegosAdquiridosRoutes';

import { coleccionesRouter } from './infrastructure/api/routes/collecionesRoutes';
import { errorMiddleware } from './infrastructure/api/middlewares/errorHandler';


const prisma = new PrismaClient();


const juegosAdquiridosRepository = new PrismaJuegosAdquiridosRepository(prisma);
const licenciaRepository = new PrismaLicenciaRepository(prisma);
const coleccionRepository = new PrismaColeccionRepository(prisma);


const addJuegoAdquiridoUseCase = new AddJuegoAdquiridoUseCase(
  juegosAdquiridosRepository,
  licenciaRepository
);
const getJuegosAdquiridosUseCase = new GetJuegosAdquiridosUseCase(juegosAdquiridosRepository);
const updateStateUseCase = new UpdateStateUseCase(juegosAdquiridosRepository);
const toggleVisibilityUseCase = new ToggleVisibilityUseCase(juegosAdquiridosRepository);
const createColeccionUseCase = new CreateColeccionUseCase(coleccionRepository);
const addJuegoToColeccionUseCase = new AddJuegoToColeccionUseCase(
  coleccionRepository,
  juegosAdquiridosRepository
);


const juegosAdquiridosController = new JuegosAdquiridosController(
  addJuegoAdquiridoUseCase,
  getJuegosAdquiridosUseCase,
  updateStateUseCase,
  toggleVisibilityUseCase
);

const coleccionesController = new ColeccionesController(
  createColeccionUseCase,
  addJuegoToColeccionUseCase
);
const app = express();
app.use(express.json());
app.use(cors())



app.use('/api/juegos-adquiridos', juegosAdquiridosRouter(juegosAdquiridosController));
app.use('/api/colecciones', coleccionesRouter(coleccionesController));
app.use(errorMiddleware);
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});