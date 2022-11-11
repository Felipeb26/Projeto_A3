import { db } from "../config/firebase";
import { Medicos } from "../model/medico.model";
import { generateToken } from "../utils/token.utils";
import { Usuarios } from './../model/usuariosmodel.';

const usuariosCollections = db.collection("usuarios")
const medicosCollections = db.collection("medicos")

export class UsuariosController {

    getUserForLogin = async (req: any, res: any) => {
        try {
            const userList: Usuarios[] = [];
            const doctorsList: Medicos[] = []
            let { senha, email } = req.body;

            await usuariosCollections
                .where("senha", "==", senha)
                .get()
                .then((snap) => {
                    snap.forEach((doc) => {
                        const user = new Usuarios(
                            doc.id,
                            doc.data().nome,
                            doc.data().telefone,
                            doc.data().email,
                            doc.data().senha,
                            doc.data().agenda,
                            doc.data().role,
                        );
                        userList.push(user);
                    });
                })
                .catch((err) => res.send({ message: err.message }));

            await medicosCollections.where("senha", "==", senha).get()
                .then((snap) => {
                    snap.forEach((it) => {
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
                        doctorsList.push(medico)
                    });
                })

            const all = [...userList, ...doctorsList]
            const index = all.find(it => it.getEmail() === email);
            
            if (index?.getId() == undefined || null) {
                return res
                    .status(404)
                    .send({ erro: `usuario nao encontrado ${email}` });
            }

            const user: any = index;
            const tk = {
                id: "id",
                nome: "nome",
                email: "email",
                senha: "senha",
                telefone: "telefone",
                crm: "crm"
            };

            if (user instanceof Usuarios) {
                (tk.id = user.getId());
                (tk.nome = user.getNome());
                (tk.email = user.getEmail());
                (tk.senha = user.getSenha());
                (tk.telefone = user.getTelefone())
            }
            else if (user instanceof Medicos) {
                (tk.id = user.getId());
                (tk.nome = user.getNome());
                (tk.email = user.getEmail());
                (tk.senha = user.getSenha());
                (tk.telefone = user.getTelefone());
                (tk.crm = user.getCrm())
            }

            res.send({
                token: `${generateToken(user)}`,
                tokenType: "Bearer",
                TokenTime: "15 min",
            });
        } catch (error: any) {
            res.status(400).send({ message: error.message });
        }
    };

    getAllPaginate = async (req: any, res: any, next: any) => {
        try {
            let limit = req.query.limit || 10;
            let after = req.query.after;
            let before = req.query.before;
            let view = req.query.view || "agenda";
            limit = parseInt(limit);

            let data = usuariosCollections.orderBy(view, "asc");

            if (after) {
                data = data.startAfter(after).limit(limit);
            } else if (before) {
                data = data.endBefore(before).limit(limit);
            } else {
                data = data.limit(limit);
            }

            const snapshots = await data.get();
            const userList: Usuarios[] = [];

            if (snapshots.empty) {
                res.send(400).send({ message: "sem usuarios cadastrados" });
            } else {
                snapshots.forEach((it) => {
                    const user = new Usuarios(
                        it.id,
                        it.data().nome,
                        it.data().telefone,
                        it.data().email,
                        it.data().senha,
                        it.data().agenda,
                        it.data().role,
                    )
                    userList.push(user);
                });
            }

            const content = {
                users: userList,
                pagination: {
                    prev:
                        userList.length > 0 && (after || before)
                            ? userList[0].getAgenda()
                            : null,
                    next:
                        userList.length == limit
                            ? userList[userList.length - 1].getAgenda()
                            : null,
                    totalElements: userList.length,
                },
            };

            return res.status(200).send(content);
        } catch (error: any) {
            return res.status(400).send({ message: error.message });
        }
    };

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
        } catch (error: any) {
            return res.status(400).send({ message: error.message });
        }
    }

    getAllConsultas = async (req: any, res: any) => {
        const medicos = medicosCollections.orderBy("agenda", "asc");
        const usuarios = usuariosCollections.orderBy("agenda", "asc");

        const medicoGet = await medicos.get();
        const usuarioGet = await usuarios.get();
        try {
            if (medicoGet.empty && usuarioGet.empty) {
                return res.status(500).send({ erro: "erro" })
            }
            const usersList: Usuarios[] = [];
            const medicosList: Medicos[] = [];

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

            const dates: Array<string> = []
            const doctors: Medicos[] = []
            usersList.forEach(it => dates.push(it.getAgenda()))

            for (let i = 0; i < dates.length; i++) {
                const doc = medicosList.filter(it => it.getAgenda() == dates[i])
                for (let m = 0; m < doc.length; m++) {
                    doctors.push(doc[i]);
                }
            }
            return res.status(200).send(doctors);
        } catch (erro: any) {
            return res.status(400).send({ message: erro.message });
        }

    }

    getById = async (req: any, res: any) => {
        try {
            const id = req.params.id;
            const user = await usuariosCollections.doc(id).get();
            if (!user.exists) {
                res.status(404).send({ message: "usuarios não existe" });
            } else {
                res.send(user.data());
            }
        } catch (error: any) {
            res.status(400).send({ message: error.message });
        }
    };

    updateUser = async (req: any, res: any) => {
        try {
            const id = req.params.id;
            const data = req.body;

            if (data == null) {
                return res
                    .status(400)
                    .send({ erro: "sem dados para alterar usuario" });
            }
            await usuariosCollections.doc(id).update(data);

            const user = await usuariosCollections.doc(id).get();
            return res.send(user.data());
        } catch (error: any) {
            return res.status(400).send({ message: error.message });
        }
    };

    deleteUser = async (req: any, res: any) => {
        try {
            const id = req.params.id;
            await usuariosCollections.doc(id).delete();
            res.send({ message: "Usuario deletado com sucesso!!" });
        } catch (error: any) {
            res.status(400).send({ message: error.message });
        }
    };
}