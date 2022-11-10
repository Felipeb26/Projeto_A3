import { Roles } from "../enum/role.enum";

export class Medicos {

    private id: string;
    private nome: string;
    private telefone: string;
    private email: string;
    private senha: string;
    private agenda: any;
    private role: Roles;
    private crm: string;
    private especialidade: string;

    constructor (id: string, nome: string, telefone: string, email: string, senha: string, agenda: any, role: Roles, crm: string, especialidade: string) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.agenda = agenda;
        this.senha = senha;
        this.role = role;
        this.crm = crm;
        this.especialidade = especialidade;
        this.telefone = telefone;
    }

    getId() {
        return this.id;
    }

    getNome() {
        return this.nome;
    }

    getTelefone() {
        return this.telefone;
    }

    getEmail() {
        return this.email;
    }

    getAgenda() {
        return this.agenda;
    }

    getSenha() {
        return this.senha;
    }

    getRole() {
        return this.role;
    }

    getCrm() {
        return this.crm;
    }

    getEspecialidade() {
        return this.especialidade;
    }


    setId(id: string) {
        this.id = id;
    }

    setNome(nome: string) {
        this.nome = nome;
    }

    setTelefone(telefone: string) {
        this.telefone = telefone
    }

    setEmail(email: string) {
        this.email = email;
    }

    setAgenda(agenda: any) {
        this.agenda = agenda
    }

    setSenha(senha: string) {
        this.senha = senha;
    }

    setRole(role: Roles) {
        this.role = role;
    }

    setCrm(crm: string) {
        this.crm = crm;
    }

    setEspecialidade(especialidade: string) {
        this.especialidade = especialidade;
    }
}