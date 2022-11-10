import { db } from "../config/firebase";
import { Medicos } from "../model/medico.model";
import { Usuarios } from './../model/usuariosmodel.';

const usuariosCollections = db.collection("usuarios")
const medicosCollections = db.collection("medicos")

export class UsuariosController {

    getAllUsers = async (req: any, res: any) => {
        const data = usuariosCollections.orderBy("agenda", "asc")
        const get = await data.get();

        const users: any = []
        try {
            if (!get.empty) {
                get.docs.forEach((it) => {
                    const user = new Usuarios(
                        it.id,
                        it.data().nome,
                        it.data().telefone,
                        it.data().email,
                        it.data().senha,
                        it.data().agenda,
                        it.data().role,
                    )
                    users.push(user)
                })
                return res.send(users)
            }
        } catch (error) {
            console.log(error)
        }
    }


    getAllConsultas = async (req: any, res: any) => {
        const medicos = medicosCollections.orderBy("agenda", "asc");
        const usuarios = usuariosCollections.orderBy("agenda", "asc");

        const medicoGet = await medicos.get();
        const usuarioGet = await usuarios.get();

        if (medicoGet.empty && usuarioGet.empty) {
            return res.status(500).send({ erro: "erro" })
        }
        const usersList:Usuarios[] = [];
        const medicosList:Medicos[] = [];

        usuarioGet.docs.forEach((it) => {
            const user = new Usuarios(
                it.id,
                it.data().nome,
                it.data().telefone,
                it.data().email,
                it.data().senha,
                it.data().agenda,
                it.data().role,
            )
            usersList.push(user)
        });

        medicoGet.docs.forEach((it) => {
            const medico = new Medicos(
                it.id,
                it.data().nome,
                it.data().telefone,
                it.data().email,
                it.data().senha,
                it.data().agenda,
                it.data().role,
                it.data().crm,
                it.data().especialidade
            );
            medicosList.push(medico);
        });

        console.log("🚀 ~ file: user.controller.ts ~ line 79 ~ UsuariosController ~ getAllConsultas= ~ usersList", usersList)
        console.log("🚀 ~ file: user.controller.ts ~ line 80 ~ UsuariosController ~ getAllConsultas= ~ medicosList", medicosList)

    }

}