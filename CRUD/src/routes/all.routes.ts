import { Router } from "express";
import { MedicoController } from "../controller/doc.crontroller";
import { UsuariosController } from "../controller/user.controller";
import { cache } from "../utils/cache.utils";
import { authUser } from "../utils/token.utils";
import { ConsultaController } from './../controller/consulta.controller';

export const route = Router({ caseSensitive: false });

const consult = new ConsultaController();
const user = new UsuariosController()
const doc = new MedicoController();

//endpoints referentes ao usuario
route.get("/users", authUser, cache, user.getAllUsers);

// route.get("/consultas", authUser, cache, user.getAllConsultas)

route.post("/login", cache, user.getUserForLogin);

route.get("/users-page", authUser, cache, user.getAllPaginate);

route.get("/user/:id", authUser, cache, user.getById);

route.post("/users", cache, user.addUser);

route.put("/user/:id", authUser, cache, user.updateUser);

route.delete("/user/:id", authUser, cache, user.deleteUser);


// endpoints referente ao medico
route.get("/docs", authUser, cache, doc.getAllDocs);

route.post("/docs", cache, user.addUser);

route.put("/docs/:id", authUser, cache, doc.updateUser);

route.delete("/docs/:id", authUser, cache, user.deleteUser);

//consultas endpoints
route.get("/consultas", consult.getConsultas);

route.get("/consulta/:id", consult.getById);

route.post("/consultas", consult.postConsulta);

route.put("/consulta/:id", consult.updateConsulta);

route.delete("/consulta/:id", consult.deleteConsulta);


route.get("/", async (req, res) => {
    return res.status(200).send({ message: "Crud is running" })
})
