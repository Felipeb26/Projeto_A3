import { db } from "../config/firebase";
import { Medicos } from './../model/medico.model';
const medicosTable = db.collection("medicos")

export class MedicoController {

    getAllDocs = async (req: any, res: any) => {
        const data = await medicosTable.get();
        const medicos: any = [];

        try {
            data.docs.forEach((it) => {
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
                medicos.push(medico);
            });
            return res.send(medicos);
        } catch (error) {
            console.log(error)
        }

    }

}