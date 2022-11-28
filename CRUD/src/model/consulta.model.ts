export class Consulta {

    private id: string = "";
    private nomeUser: string = "";
    private emailUser: string = "";
    private telefoneUser: string = "";
    private nomeMedico: string = "";
    private emailMedico: string = "";
    private agenda: any = "";
    private prioridade: string = ""

    constructor (
        id: string,
        nomeUser: string,
        emailUser: string,
        telefoneUser: string,
        nomeMedico: string,
        emailMedico: string,
        agenda: any,
        prioridade: string) {
        this.id = id;
        this.nomeUser = nomeUser;
        this.emailUser = emailUser
        this.telefoneUser = telefoneUser
        this.nomeMedico = nomeMedico
        this.emailMedico = emailMedico
        this.agenda = agenda,
            this.prioridade = prioridade
    }

    getId() {
        return this.id;
    }
    getnomeUser() {
        return this.nomeUser;
    }
    getEmailUser() {
        return this.emailUser;
    }
    getTelefoneUser() {
        return this.telefoneUser;
    }
    getNomeMedico() {
        return this.nomeMedico;
    }
    getEmailMedico() {
        return this.emailMedico;
    }
    getAgenda() {
        return this.agenda;
    }
    getPrioridade() {
        return this.prioridade
    }

    setId(id: string) {
        this.id = id;
    }
    setnomeUser(nomeUser: string) {
        this.nomeUser = nomeUser;
    }
    setEmailUser(emailUser: string) {
        this.emailUser = emailUser;
    }
    setTelefoneUSer(telefoneUser: string) {
        this.telefoneUser = telefoneUser;
    }
    setNomeMedico(nomeMedico: string) {
        this.nomeMedico = nomeMedico;
    }
    setEmailMedico(emailMedico: string) {
        return this.emailMedico = emailMedico;
    }
    setAgenda(agenda: any) {
        this.agenda = agenda;
    }
    setPrioridade(prioridade: string) {
        this.prioridade = prioridade;
    }
}