import { Router } from "express";
import { MedicoController } from "../controller/doc.crontroller";
import { UsuariosController } from "../controller/user.controller";
import { cache } from "../utils/cache.utils";
import { authUser } from "../utils/token.utils"

export const route = Router({ caseSensitive: false });

const user = new UsuariosController()
const doc = new MedicoController();

//endpoints referentes ao usuario
route.get("/users", authUser, cache, user.getAllUsers);

route.get("/docs", authUser, cache, doc.getAllDocs);

route.get("/consultas", authUser, cache, user.getAllConsultas)

route.post("/login", cache, user.getUserForLogin);

route.get("/users-page", authUser, cache, user.getAllPaginate);


route.get("/user/:id", authUser, cache, user.getById);

route.post("/users", authUser, cache, user.addUser);

route.put("/user/:id", authUser, cache, user.updateUser);

route.delete("/user/:id", authUser, cache, user.deleteUser);
// endpoints referente ao medico