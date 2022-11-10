import { Router } from "express";
import { MedicoController } from "../controller/doc.crontroller";
import { UsuariosController } from "../controller/user.controller";
import { cache } from "../utils/cache.utils";

export const route = Router({ caseSensitive: false });

const user = new UsuariosController()
const doc = new MedicoController();

route.get("/users", cache, user.getAllUsers);

route.get("/docs", cache, doc.getAllDocs);

route.get("/consultas", cache, user.getAllConsultas)